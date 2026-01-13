import React, { useState } from 'react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';

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
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Schedule Optimization</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
                <div>
                    <Card title="Preferences">
                        <form onSubmit={handleOptimize} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                    type="checkbox"
                                    id="morningClasses"
                                    checked={preferences.morningClasses}
                                    onChange={e => setPreferences({ ...preferences, morningClasses: e.target.checked })}
                                />
                                <label htmlFor="morningClasses">Avoid Morning Classes (Before 9 AM)</label>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                    type="checkbox"
                                    id="noFridays"
                                    checked={preferences.noFridays}
                                    onChange={e => setPreferences({ ...preferences, noFridays: e.target.checked })}
                                />
                                <label htmlFor="noFridays">Keep Fridays Free</label>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Max Gap (Hours)</label>
                                <select
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                                    value={preferences.maxGap}
                                    onChange={e => setPreferences({ ...preferences, maxGap: e.target.value })}
                                >
                                    <option value="1">1 Hour</option>
                                    <option value="2">2 Hours</option>
                                    <option value="3">3 Hours</option>
                                    <option value="any">Any</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Generate Option</button>
                        </form>
                    </Card>
                </div>

                <div>
                    <Card title="Optimized Schedule">
                        {!optimizedSchedule ? (
                            <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem' }}>
                                Enter preferences and click Generate to see a schedule.
                            </p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span><strong>Total Credits:</strong> 15</span>
                                    <Badge status="info">Balanced Load</Badge>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(5, 1fr)', gap: '1px', backgroundColor: 'var(--color-border)', border: '1px solid var(--color-border)' }}>
                                    {/* Header */}
                                    <div style={{ padding: '0.5rem', background: '#f9f9f9', fontWeight: 'bold' }}>Time</div>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => (
                                        <div key={d} style={{ padding: '0.5rem', background: '#f9f9f9', fontWeight: 'bold', textAlign: 'center' }}>{d}</div>
                                    ))}

                                    {/* Mock Time Slots */}
                                    {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map(time => (
                                        <React.Fragment key={time}>
                                            <div style={{ padding: '0.5rem', background: 'white', color: '#666' }}>{time}</div>
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => {
                                                const cls = optimizedSchedule.find(c => c.day === day && c.time.startsWith(time));
                                                return (
                                                    <div key={`${day}-${time}`} style={{ padding: '0.5rem', background: cls ? '#e3f2fd' : 'white', minHeight: '50px', fontSize: '0.75rem' }}>
                                                        {cls && (
                                                            <div>
                                                                <strong>{cls.course}</strong><br />
                                                                {cls.room}
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
