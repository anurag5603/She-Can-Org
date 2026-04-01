import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
    Scale,
    Droplets,
    Flame,
    Ruler,
    Plus,
    TrendingDown,
    TrendingUp,
    Minus,
    CheckCircle,
    Calendar,
    Target,
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface ProgressLog {
    id: string;
    date: string;
    weight: number | null;
    water_intake: number;
    waist: number | null;
    chest: number | null;
    hips: number | null;
}

interface TodayForm {
    weight: string;
    water_intake: number;
    waist: string;
    chest: string;
    hips: string;
}

const WATER_GOAL = 8;

export const ProgressTracker: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { user, session } = useAuth();
    const [logs, setLogs] = useState<ProgressLog[]>([]);
    const [todayLog, setTodayLog] = useState<ProgressLog | null>(null);
    const [form, setForm] = useState<TodayForm>({
        weight: '',
        water_intake: 0,
        waist: '',
        chest: '',
        hips: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<'log' | 'history'>('log');

    const today = new Date().toISOString().split('T')[0];

    const fetchLogs = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('progress_logs')
            .select('*')
            .eq('user_id', user.id)
            .order('date', { ascending: false })
            .limit(30);

        if (!error && data) {
            setLogs(data);
            const todayEntry = data.find(l => l.date === today);
            if (todayEntry) {
                setTodayLog(todayEntry);
                setForm({
                    weight: todayEntry.weight?.toString() || '',
                    water_intake: todayEntry.water_intake || 0,
                    waist: todayEntry.waist?.toString() || '',
                    chest: todayEntry.chest?.toString() || '',
                    hips: todayEntry.hips?.toString() || '',
                });
            }
        }
        setLoading(false);
    }, [user, today]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const saveLog = async () => {
        if (!user) return;
        setSaving(true);
        const payload = {
            user_id: user.id,
            date: today,
            weight: form.weight ? parseFloat(form.weight) : null,
            water_intake: form.water_intake,
            waist: form.waist ? parseFloat(form.waist) : null,
            chest: form.chest ? parseFloat(form.chest) : null,
            hips: form.hips ? parseFloat(form.hips) : null,
        };

        const { error } = await supabase
            .from('progress_logs')
            .upsert(payload, { onConflict: 'user_id,date' });

        if (!error) {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            fetchLogs();
            setForm({
                weight: '',
                water_intake: 0,
                waist: '',
                chest: '',
                hips: '',
            });
        }
        setSaving(false);
    };

    // Streak calculation
    const calculateStreak = () => {
        if (logs.length === 0) return 0;
        let streak = 0;
        const sortedDates = logs.map(l => l.date).sort((a, b) => b.localeCompare(a));
        let expected = today;
        for (const date of sortedDates) {
            if (date === expected) {
                streak++;
                const d = new Date(expected);
                d.setDate(d.getDate() - 1);
                expected = d.toISOString().split('T')[0];
            } else break;
        }
        return streak;
    };

    const streak = calculateStreak();

    // Weight chart data
    const weightData = logs
        .filter(l => l.weight !== null)
        .slice(0, 14)
        .reverse()
        .map(l => ({
            date: new Date(l.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
            weight: l.weight,
        }));

    // Latest vs previous weight
    const latestWeight = logs.find(l => l.weight !== null)?.weight;
    const prevWeight = logs.filter(l => l.weight !== null)[1]?.weight;
    const weightDiff = latestWeight && prevWeight ? latestWeight - prevWeight : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-5 flex items-center">
                    <button onClick={onBack} className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
                        ← Back
                    </button>
                    <div className="w-11 h-11 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <TrendingDown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Progress Tracker</h1>
                        <p className="text-sm text-gray-500">Track your daily health metrics</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6">

                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {/* Streak */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col items-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-2">
                            <Flame className="w-5 h-5 text-orange-500" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{streak}</p>
                        <p className="text-xs text-gray-500 text-center">Day Streak</p>
                    </div>

                    {/* Latest Weight */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                            <Scale className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{latestWeight ?? '—'}</p>
                        <p className="text-xs text-gray-500">kg (latest)</p>
                        {weightDiff !== null && (
                            <span className={`text-xs font-semibold mt-1 ${weightDiff < 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {weightDiff < 0 ? '▼' : '▲'} {Math.abs(weightDiff).toFixed(1)} kg
                            </span>
                        )}
                    </div>

                    {/* Today Water */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col items-center">
                        <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center mb-2">
                            <Droplets className="w-5 h-5 text-cyan-500" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{form.water_intake}/{WATER_GOAL}</p>
                        <p className="text-xs text-gray-500">Glasses today</p>
                    </div>

                    {/* Total logs */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                            <Calendar className="w-5 h-5 text-purple-500" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
                        <p className="text-xs text-gray-500">Days Logged</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        onClick={() => setActiveTab('log')}
                        className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all -mb-px ${activeTab === 'log' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Today's Log
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all -mb-px ${activeTab === 'history' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        History & Charts
                    </button>
                </div>

                {activeTab === 'log' ? (
                    <div className="space-y-6">
                        {/* Weight */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                                    <Scale className="w-5 h-5 text-blue-500" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Weight</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder="e.g. 72.5"
                                    value={form.weight}
                                    onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-lg font-semibold"
                                />
                                <span className="text-gray-500 font-medium">kg</span>
                            </div>
                        </div>

                        {/* Water Intake */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-9 h-9 bg-cyan-100 rounded-xl flex items-center justify-center mr-3">
                                    <Droplets className="w-5 h-5 text-cyan-500" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Water Intake</h2>
                                <span className="ml-auto text-sm text-gray-500">Goal: {WATER_GOAL} glasses</span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
                                <div
                                    className="bg-cyan-400 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min((form.water_intake / WATER_GOAL) * 100, 100)}%` }}
                                />
                            </div>

                            {/* Glass buttons */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {Array.from({ length: WATER_GOAL }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setForm(f => ({ ...f, water_intake: i + 1 }))}
                                        className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${i < form.water_intake
                                            ? 'bg-cyan-400 border-cyan-400 text-white'
                                            : 'bg-gray-50 border-gray-200 text-gray-400'
                                            }`}
                                    >
                                        <Droplets className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setForm(f => ({ ...f, water_intake: Math.max(0, f.water_intake - 1) }))}
                                    className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-2xl font-bold text-gray-900 w-16 text-center">{form.water_intake}</span>
                                <button
                                    onClick={() => setForm(f => ({ ...f, water_intake: Math.min(WATER_GOAL, f.water_intake + 1) }))}
                                    className="p-2 bg-cyan-100 rounded-xl hover:bg-cyan-200 transition-all"
                                >
                                    <Plus className="w-4 h-4 text-cyan-600" />
                                </button>
                                <span className="text-gray-500">glasses</span>
                            </div>
                        </div>

                        {/* Body Measurements */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                                    <Ruler className="w-5 h-5 text-purple-500" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Body Measurements</h2>
                                <span className="ml-auto text-xs text-gray-400">in cm</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {(['waist', 'chest', 'hips'] as const).map(field => (
                                    <div key={field}>
                                        <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{field}</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="cm"
                                            value={form[field]}
                                            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-center font-semibold"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={saveLog}
                            disabled={saving}
                            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-lg font-bold rounded-2xl hover:from-emerald-600 hover:to-blue-600 transition-all hover:scale-105 shadow-lg disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                            {saved ? (
                                <><CheckCircle className="w-5 h-5" /> Saved!</>
                            ) : saving ? (
                                'Saving...'
                            ) : (
                                <><Plus className="w-5 h-5" /> Save Today's Log</>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Weight Chart */}
                        {weightData.length > 1 ? (
                            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Scale className="w-5 h-5 text-blue-500" /> Weight Trend
                                </h2>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={weightData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                                        <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                                <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">Log weight for at least 2 days to see the chart</p>
                            </div>
                        )}

                        {/* Log History Table */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900">Log History</h2>
                            </div>
                            {logs.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">No logs yet. Start tracking today!</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100">
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Weight</th>
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Water</th>
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Waist</th>
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Chest</th>
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Hips</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {logs.map(log => (
                                                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                        {new Date(log.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">{log.weight ? `${log.weight} kg` : '—'}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">{log.water_intake}/{WATER_GOAL} 💧</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">{log.waist ? `${log.waist} cm` : '—'}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">{log.chest ? `${log.chest} cm` : '—'}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">{log.hips ? `${log.hips} cm` : '—'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};