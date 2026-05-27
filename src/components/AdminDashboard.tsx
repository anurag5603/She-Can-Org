import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import API_BASE from '../config';
import {
  Inbox,
  Users as UsersIcon,
  Mail,
  MailOpen,
  Trash2,
  RefreshCw,
  Clock,
  User,
  ArrowLeft,
  CheckCheck,
  AlertCircle,
  Search,
  Filter,
  Shield,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface RegisteredUser {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  registeredAt: string;
  lastLogin: string;
}

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'messages'>('messages');

  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState('');
  const [userSearch, setUserSearch] = useState('');

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messagesError, setMessagesError] = useState('');
  const [msgSearch, setMsgSearch] = useState('');
  const [msgFilter, setMsgFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const authHeaders = useCallback((): Record<string, string> => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session?.access_token || ''}`,
  }), [session]);

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    setUsersError('');
    try {
      const res = await fetch(`${API_BASE}/api/admin/users`, { headers: authHeaders() });
      if (res.status === 401 || res.status === 403) throw new Error('Unauthorized');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err: any) {
      setUsersError(err.message);
    } finally {
      setUsersLoading(false);
    }
  }, [authHeaders]);

  const fetchMessages = useCallback(async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    else setMessagesLoading(true);
    setMessagesError('');
    try {
      const res = await fetch(`${API_BASE}/api/messages`, { headers: authHeaders() });
      if (res.status === 401 || res.status === 403) throw new Error('Unauthorized');
      if (!res.ok) throw new Error('Failed to fetch submissions');
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err: any) {
      setMessagesError(err.message);
    } finally {
      setMessagesLoading(false);
      setIsRefreshing(false);
    }
  }, [authHeaders]);

  useEffect(() => {
    fetchUsers();
    fetchMessages();
  }, [fetchUsers, fetchMessages]);

  const markAsRead = async (id: number) => {
    try {
      await fetch(`${API_BASE}/api/messages/${id}`, { method: 'PATCH', headers: authHeaders() });
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
      if (selectedMessage?.id === id) setSelectedMessage(prev => prev ? { ...prev, read: true } : null);
    } catch { }
  };

  const deleteMessage = async (id: number) => {
    try {
      await fetch(`${API_BASE}/api/messages/${id}`, { method: 'DELETE', headers: authHeaders() });
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
      setDeleteConfirm(null);
    } catch { }
  };

  const handleSelectMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.read) markAsRead(msg.id);
  };

  const formatDate = (ts: string) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hrs < 24) return `${hrs}h ago`;
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  };

  const formatFullDate = (ts: string) =>
    new Date(ts).toLocaleString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const filteredUsers = users.filter(u =>
    userSearch === '' ||
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredMessages = messages.filter(msg => {
    const matchSearch = msgSearch === '' ||
      msg.name.toLowerCase().includes(msgSearch.toLowerCase()) ||
      msg.email.toLowerCase().includes(msgSearch.toLowerCase()) ||
      msg.subject.toLowerCase().includes(msgSearch.toLowerCase()) ||
      msg.message.toLowerCase().includes(msgSearch.toLowerCase());
    const matchFilter = msgFilter === 'all' || (msgFilter === 'unread' && !msg.read) || (msgFilter === 'read' && msg.read);
    return matchSearch && matchFilter;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  const getSubjectColor = (subject: string) => {
    const c: Record<string, string> = {
      'General Inquiry': 'bg-blue-100 text-blue-700 border-blue-200',
      'Volunteering': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Mentorship': 'bg-orange-100 text-[#fe521e] border-orange-200',
      'Scholarship / Grant': 'bg-orange-50 text-orange-600 border-orange-200',
      Other: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return c[subject] || c['Other'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-rose-50/10 to-orange-100/20 pt-28">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <button onClick={onBack} className="mr-4 p-2 text-gray-500 hover:text-[#fe521e] hover:bg-orange-50 rounded-xl transition-all" title="Back">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-11 h-11 bg-gradient-to-br from-[#fe521e] via-[#ff6a3b] to-[#fd4610] rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-orange-100">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">She Can Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Manage submissions and registered accounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
              <UsersIcon className="w-6 h-6 text-[#fe521e]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-500">Registered Admins</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center shadow-sm">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mr-4">
              <MessageSquare className="w-6 h-6 text-[#fe521e]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
              <p className="text-sm text-gray-500">Total Submissions</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center shadow-sm">
            <div className="w-12 h-12 bg-orange-100/50 rounded-xl flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-[#fe521e]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              <p className="text-sm text-gray-500">Unread Submissions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center px-6 py-3 font-semibold text-sm border-b-2 transition-all -mb-px ${activeTab === 'messages' ? 'border-[#fe521e] text-[#fe521e]' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            <Inbox className="w-4 h-4 mr-2" />
            Form Submissions ({messages.length})
            {unreadCount > 0 && (
              <span className="ml-2 bg-[#fe521e] text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center px-6 py-3 font-semibold text-sm border-b-2 transition-all -mb-px ${activeTab === 'users' ? 'border-[#fe521e] text-[#fe521e]' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            <UsersIcon className="w-4 h-4 mr-2" />
            Registered Admins ({users.length})
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'users' ? (
          <div>
            <div className="mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  placeholder="Search admin accounts..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#fe521e] focus:border-[#fe521e] transition-all outline-none text-sm"
                />
              </div>
            </div>

            {usersLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-orange-200 border-t-[#fe521e] rounded-full animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading users...</p>
              </div>
            ) : usersError ? (
              <div className="flex flex-col items-center justify-center py-20">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <p className="text-gray-700 font-bold mb-2">Failed to load users</p>
                <p className="text-gray-500 text-sm mb-4">{usersError}</p>
                <button onClick={fetchUsers} className="px-6 py-2 bg-[#fe521e] text-white rounded-xl text-sm font-medium hover:bg-[#fd4610] transition-all">Retry</button>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <UsersIcon className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-700 font-bold mb-1">{users.length === 0 ? 'No Users Yet' : 'No Matching Users'}</p>
                <p className="text-gray-500 text-sm">{users.length === 0 ? 'Users will appear here after they sign in.' : 'Try a different search term.'}</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Login</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredUsers.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {u.avatarUrl ? (
                                <img src={u.avatarUrl} alt={u.name} className="w-9 h-9 rounded-full mr-3 border border-gray-200" />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                                  <User className="w-4 h-4 text-[#fe521e]" />
                                </div>
                              )}
                              <span className="font-semibold text-gray-900 text-sm">{u.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{formatDate(u.registeredAt)}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{formatDate(u.lastLogin)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={msgSearch}
                  onChange={e => setMsgSearch(e.target.value)}
                  placeholder="Search submissions..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#fe521e] focus:border-[#fe521e] transition-all outline-none text-sm shadow-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <Filter className="w-4 h-4 text-gray-400 ml-3" />
                  {(['all', 'unread', 'read'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setMsgFilter(s)}
                      className={`px-4 py-2.5 text-sm font-medium transition-all capitalize ${msgFilter === s ? 'bg-[#fe521e] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >{s}</button>
                  ))}
                </div>
                <button
                  onClick={() => fetchMessages(true)}
                  disabled={isRefreshing}
                  className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 shadow-sm"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {messagesLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-orange-200 border-t-[#fe521e] rounded-full animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading submissions...</p>
              </div>
            ) : messagesError ? (
              <div className="flex flex-col items-center justify-center py-20">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <p className="text-gray-700 font-bold mb-2">Failed to load submissions</p>
                <p className="text-gray-500 text-sm mb-4">{messagesError}</p>
                <button onClick={() => fetchMessages()} className="px-6 py-2 bg-[#fe521e] text-white rounded-xl text-sm font-medium hover:bg-[#fd4610] transition-all">Retry</button>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Inbox className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-700 font-bold mb-1">{messages.length === 0 ? 'No Submissions Yet' : 'No Matching Submissions'}</p>
                <p className="text-gray-500 text-sm">{messages.length === 0 ? 'Submissions from the involvement form will appear here.' : 'Try adjusting your search or filter.'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 space-y-2 max-h-[600px] overflow-y-auto pr-2 animate-none">
                  {filteredMessages.map(msg => (
                    <button
                      key={msg.id}
                      onClick={() => handleSelectMessage(msg)}
                      className={`w-full text-left p-4 rounded-xl border transition-all hover:shadow-md ${selectedMessage?.id === msg.id
                        ? 'bg-orange-50/50 border-orange-300 shadow-md animate-none'
                        : msg.read
                          ? 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                          : 'bg-white border-l-4 border-l-[#fe521e] border-gray-200 hover:border-gray-300 shadow-md'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          {msg.read ? <MailOpen className="w-4 h-4 text-gray-400 mr-2" /> : <Mail className="w-4 h-4 text-[#fe521e] mr-2" />}
                          <span className={`font-semibold text-sm truncate ${msg.read ? 'text-gray-700' : 'text-gray-900'}`}>{msg.name}</span>
                        </div>
                        <span className="text-xs text-gray-400 ml-2">{formatDate(msg.timestamp)}</span>
                      </div>
                      <div className="ml-6">
                        <span className={`inline-block text-xs px-2 py-0.5 rounded-full border font-semibold mb-1.5 ${getSubjectColor(msg.subject)}`}>{msg.subject}</span>
                        <p className="text-sm text-gray-500 line-clamp-2">{msg.message}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-3">
                  {selectedMessage ? (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50/10 to-white">
                        <div className="flex items-start justify-between mb-4">
                          <span className={`text-xs px-3 py-1 rounded-full border font-bold ${getSubjectColor(selectedMessage.subject)}`}>{selectedMessage.subject}</span>
                          <div className="flex items-center gap-2">
                            {selectedMessage.read && (
                              <span className="flex items-center text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full"><CheckCheck className="w-3 h-3 mr-1" /> Read</span>
                            )}
                            {deleteConfirm === selectedMessage.id ? (
                              <div className="flex items-center gap-1">
                                <button onClick={() => deleteMessage(selectedMessage.id)} className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm">Confirm</button>
                                <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-all shadow-sm">Cancel</button>
                              </div>
                            ) : (
                              <button onClick={() => setDeleteConfirm(selectedMessage.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                            )}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#fe521e] to-[#ff7d54] rounded-full flex items-center justify-center mr-3 shadow-sm">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{selectedMessage.name}</p>
                              <a href={`mailto:${selectedMessage.email}`} className="text-sm text-[#fe521e] hover:text-[#fd4610] transition-colors font-medium">{selectedMessage.email}</a>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 font-medium">
                            <Clock className="w-4 h-4 mr-2" />
                            {formatFullDate(selectedMessage.timestamp)}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                      <div className="px-6 pb-6">
                        <a href={`mailto:${selectedMessage.email}?subject=Re: She Can - ${selectedMessage.subject}`} className="inline-flex items-center px-6 py-3 bg-gradient-to-br from-[#fe521e] via-[#ff6a3b] to-[#fd4610] text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-md shadow-orange-100">
                          <Mail className="w-4 h-4 mr-2" />
                          Reply via Email
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center py-24 shadow-sm">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-4">
                        <Mail className="w-8 h-8 text-[#fe521e]" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Select a Submission</h3>
                      <p className="text-gray-500 text-sm">Click on a submission to view details</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};