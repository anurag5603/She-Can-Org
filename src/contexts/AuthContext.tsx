import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import API_BASE from '../config';

const ADMIN_EMAIL = 'contact.manager5603@gmail.com';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInDemo: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function mapUser(supaUser: User): AuthUser {
  const meta = supaUser.user_metadata || {};
  return {
    id: supaUser.id,
    email: supaUser.email || '',
    name: meta.full_name || meta.name || supaUser.email?.split('@')[0] || 'User',
    avatarUrl: meta.avatar_url || meta.picture || '',
    isAdmin: (supaUser.email || '').toLowerCase() === ADMIN_EMAIL.toLowerCase(),
  };
}

async function registerUserOnServer(user: AuthUser, token: string) {
  try {
    await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      }),
    });
  } catch (err) {
    console.error('Failed to register user on server:', err);
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSession = useCallback(async (session: Session | null) => {
    setSession(session);
    if (session?.user) {
      const mapped = mapUser(session.user);
      setUser(mapped);
      registerUserOnServer(mapped, session.access_token);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Check if there is a saved demo session first
    const savedDemo = localStorage.getItem('demo_session');
    if (savedDemo) {
      try {
        const { mockSession, mockUser } = JSON.parse(savedDemo);
        setSession(mockSession);
        setUser(mockUser);
        setIsLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('demo_session');
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      // Only set session if we aren't in a demo state
      if (!localStorage.getItem('demo_session')) {
        handleSession(session);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!localStorage.getItem('demo_session')) {
          handleSession(session);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const signInDemo = async () => {
    setIsLoading(true);
    const mockUser: AuthUser = {
      id: 'demo-admin-id',
      email: ADMIN_EMAIL,
      name: 'Demo Admin',
      avatarUrl: '',
      isAdmin: true,
    };

    const mockSession: Session = {
      access_token: 'demo-admin-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'demo-refresh-token',
      user: {
        id: 'demo-admin-id',
        aud: 'authenticated',
        role: 'authenticated',
        email: ADMIN_EMAIL,
        user_metadata: {
          full_name: 'Demo Admin',
        },
        app_metadata: {},
        created_at: new Date().toISOString(),
      } as any,
    };

    setSession(mockSession);
    setUser(mockUser);

    // Register on the server
    await registerUserOnServer(mockUser, 'demo-admin-token');

    // Save locally
    localStorage.setItem('demo_session', JSON.stringify({ mockSession, mockUser }));
    setIsLoading(false);
  };

  const signOut = async () => {
    localStorage.removeItem('demo_session');
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // Ignore if supabase is not initialized
    }
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signInWithGoogle, signInDemo, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};