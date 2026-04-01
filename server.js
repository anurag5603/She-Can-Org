import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MESSAGES_FILE = path.join(__dirname, 'messages.json');
const USERS_FILE = path.join(__dirname, 'users.json');

const app = express();
app.use(express.json());

// Allow requests from your Vite dev server
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
}));

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'contact.manager5603@gmail.com').toLowerCase();
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!GROQ_API_KEY) {
  console.error('ERROR: GROQ_API_KEY is not set in your .env file');
  process.exit(1);
}

// Initialize Supabase admin client (service role for token verification)
let supabaseAdmin = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  console.log('✅ Supabase admin client initialized');
} else {
  console.warn('⚠️ Supabase credentials not set. Auth endpoints will not work.');
}

// ── HELPERS: Read/Write JSON files ──
function readJSON(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return [];
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function readMessages() { return readJSON(MESSAGES_FILE); }
function writeMessages(messages) { writeJSON(MESSAGES_FILE, messages); }
function readUsers() { return readJSON(USERS_FILE); }
function writeUsers(users) { writeJSON(USERS_FILE, users); }

// ── AUTH MIDDLEWARE ──
async function requireAuth(req, res, next) {
  if (!supabaseAdmin) {
    return res.status(503).json({ error: 'Auth service not configured' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth verification error:', err);
    return res.status(401).json({ error: 'Token verification failed' });
  }
}

async function requireAdmin(req, res, next) {
  // Run requireAuth first
  await requireAuth(req, res, () => {
    if (!req.user || (req.user.email || '').toLowerCase() !== ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
}

// ── AUTH ENDPOINTS ──

// Register/update user on login
app.post('/api/auth/register', requireAuth, (req, res) => {
  const { id, email, name, avatarUrl } = req.body;
  const users = readUsers();
  const existing = users.find(u => u.id === id);

  if (existing) {
    existing.name = name || existing.name;
    existing.avatarUrl = avatarUrl || existing.avatarUrl;
    existing.lastLogin = new Date().toISOString();
  } else {
    users.push({
      id,
      email,
      name,
      avatarUrl,
      registeredAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    });
  }

  writeUsers(users);
  console.log(`👤 User ${existing ? 'updated' : 'registered'}: ${name} (${email})`);
  return res.json({ success: true });
});

// ── ADMIN ENDPOINTS ──

// Get all registered users (admin only)
app.get('/api/admin/users', requireAdmin, (req, res) => {
  const users = readUsers();
  return res.json({ total: users.length, users });
});

// ── CONTACT FORM (public) ──
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
    read: false,
  };

  try {
    const messages = readMessages();
    messages.unshift(newMessage);
    writeMessages(messages);
    console.log(`📩 New contact message from ${name} (${email}): ${subject}`);
    return res.json({ success: true, message: 'Message received successfully' });
  } catch (err) {
    console.error('Error saving message:', err);
    return res.status(500).json({ error: 'Failed to save message' });
  }
});

// ── MESSAGE MANAGEMENT (admin only) ──
app.get('/api/messages', requireAdmin, (req, res) => {
  const messages = readMessages();
  return res.json({ total: messages.length, messages });
});

app.patch('/api/messages/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const messages = readMessages();
  const msg = messages.find(m => m.id === id);
  if (!msg) return res.status(404).json({ error: 'Message not found' });
  msg.read = true;
  writeMessages(messages);
  return res.json({ success: true });
});

app.delete('/api/messages/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  let messages = readMessages();
  const index = messages.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: 'Message not found' });
  messages.splice(index, 1);
  writeMessages(messages);
  return res.json({ success: true });
});

// ── GROQ API PROXY ──
app.post('/api/generate-plan', async (req, res) => {
  const { messages, model, temperature, max_tokens } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: model || 'llama-3.3-70b-versatile',
        messages,
        temperature: temperature ?? 0.7,
        max_tokens: max_tokens ?? 4000,
      }),
    });

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      console.error('Groq API error:', errorData);
      return res.status(groqResponse.status).json({ error: errorData });
    }

    const data = await groqResponse.json();
    return res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend proxy running on http://localhost:${PORT}`);
  console.log(`👑 Admin email: ${ADMIN_EMAIL}`);
});