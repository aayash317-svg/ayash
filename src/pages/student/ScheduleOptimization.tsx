import React, { useState } from 'react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { Settings, RefreshCw, Calendar as CalendarIcon, Clock } from 'lucide-react';

const ScheduleOptimization: React.FC = () => {
    const [preferences, setPreferences] = useState({
        morningClasses: false,
        noFridays: false,
        maxGap: '1'
    });

    const [optimizedSchedule, setOptimizedSchedule] = useState<any[] | null>(null);

    const handleOptimize = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock optimization logic
        setOptimizedSchedule([
            { day: 'Mon', time: '09:00 - 10:30', course: 'CS101', room: 'A-101' },
            { day: 'Mon', time: '11:00 - 12:30', course: 'MA101', room: 'B-202' },
            { day: 'Wed', time: '09:00 - 10:30', course: 'CS101', room: 'A-101' },
            { day: 'Wed', time: '14:00 - 15:30', course: 'CS102', room: 'Lab-1' },
            { day: 'Thu', time: '11:00 - 12:30', course: 'MA101', room: 'B-202' },
        ]);
    };

    return (
        <div className="container" style={{ padding: '2rem 0', maxWidth: '1280px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="text-h1" style={{ marginBottom: '0.5rem' }}>Schedule Optimization</h1>
                <p className="text-muted">AI-powered course scheduling according to your preferences.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 3fr', gap: '2rem' }}>
                <div>
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--gray-100)', paddingBottom: '1rem' }}>
                            <Settings size={20} color="var(--gray-600)" />
                            <h3 className="text-h3" style={{ fontSize: '1.125rem' }}>Preferences</h3>
                        </div>
                        <form onSubmit={handleOptimize} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <input
                                    type="checkbox"
                                    id="morningClasses"
                                    checked={preferences.morningClasses}
                                    onChange={e => setPreferences({ ...preferences, morningClasses: e.target.checked })}
                                    style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--color-primary)' }}
                                />
                                <label htmlFor="morningClasses" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-700)' }}>Avoid Early Morning (8-9 AM)</label>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <input
                                    type="checkbox"
                                    id="noFridays"
                                    checked={preferences.noFridays}
                                    onChange={e => setPreferences({ ...preferences, noFridays: e.target.checked })}
                                    style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--color-primary)' }}
                                />
                                <label htmlFor="noFridays" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-700)' }}>Keep Fridays Free</label>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-700)' }}>Max Gap Between Classes</label>
                                <select
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-300)', backgroundColor: 'var(--color-surface)' }}
                                    value={preferences.maxGap}
                                    onChange={e => setPreferences({ ...preferences, maxGap: e.target.value })}
                                >
                                    <option value="1">1 Hour</option>
                                    <option value="2">2 Hours</option>
                                    <option value="3">3 Hours</option>
                                    <option value="any">Any</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }}>
                                <RefreshCw size={18} /> Generate Schedules
                            </button>
                        </form>
                    </Card>
                </div>

                <div>
                    <Card style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <CalendarIcon size={20} color="var(--color-primary)" />
                                <h3 className="text-h3" style={{ fontSize: '1.125rem' }}>Proposed Schedule</h3>
                            </div>
                            {optimizedSchedule && <Badge status="success">Optimization Complete</Badge>}
                        </div>

                        {!optimizedSchedule ? (
                            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                <Clock size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                <p style={{ fontSize: '1.125rem' }}>Define your preferences and generate a schedule to preview it here.</p>
                            </div>
                        ) : (
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--primary-50)', borderRadius: 'var(--radius-md)' }}>
                                    <div>
                                        <span style={{ fontSize: '0.875rem', color: 'var(--primary-700)', fontWeight: 600, display: 'block' }}>Total Credits</span>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>15.0</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontSize: '0.875rem', color: 'var(--primary-700)', fontWeight: 600, display: 'block' }}>Weekly Hours</span>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>18.5</span>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '80px repeat(5, 1fr)',
                                    gap: '1px',
                                    backgroundColor: 'var(--gray-200)',
                                    border: '1px solid var(--gray-200)',
                                    borderRadius: 'var(--radius-md)',
                                    overflow: 'hidden'
                                }}>
                                    {/* Header */}
                                    <div style={{ padding: '0.75rem', background: 'var(--gray-50)', fontWeight: 600, fontSize: '0.75rem', color: 'var(--gray-500)', textAlign: 'center' }}>Time</div>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => (
                                        <div key={d} style={{ padding: '0.75rem', background: 'var(--gray-50)', fontWeight: 600, fontSize: '0.875rem', textAlign: 'center', color: 'var(--gray-700)' }}>{d}</div>
                                    ))}

                                    {/* Time Slots */}
                                    {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'].map(time => (
                                        <React.Fragment key={time}>
                                            <div style={{ padding: '0.75rem', background: 'white', color: 'var(--gray-500)', fontSize: '0.75rem', textAlign: 'center', borderRight: '1px solid var(--gray-100)' }}>{time}</div>
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => {
                                                const cls = optimizedSchedule.find(c => c.day === day && c.time.startsWith(time));
                                                return (
                                                    <div key={`${day}-${time}`} style={{ padding: '0.5rem', background: cls ? 'var(--primary-50)' : 'white', minHeight: '60px', fontSize: '0.75rem', position: 'relative' }}>
                                                        {cls && (
                                                            <div style={{ borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem', height: '100%' }}>
                                                                <strong style={{ color: 'var(--color-primary)', display: 'block', fontSize: '0.85rem' }}>{cls.course}</strong>
                                                                <span style={{ color: 'var(--gray-600)' }}>{cls.room}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ScheduleOptimization;
