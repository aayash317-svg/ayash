import React, { useState } from 'react';
import Card from '../../components/Card';

interface Message {
    id: number;
    sender: 'user' | 'bot';
    text: string;
    options?: string[];
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: 'bot',
            text: 'Hello. I can assist with Degree Audits and Schedule Optimization. What would you like to know?',
            options: ['Check Missing Credits', 'Prerequisite Status', 'Next Semester Recommendations']
        }
    ]);
    const [inputText, setInputText] = useState('');

    const handleSend = (text: string = inputText) => {
        if (!text.trim()) return;

        const userMsg: Message = { id: Date.now(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');

        // Mock response logic
        setTimeout(() => {
            let botResponse: Message = {
                id: Date.now() + 1,
                sender: 'bot',
                text: 'I cannot answer open-ended questions. Please select a valid query related to your academic status.'
            };

            if (text.includes('Missing Credits')) {
                botResponse = {
                    id: Date.now() + 1, sender: 'bot',
                    text: 'You have 56 credits remaining: 20 Core, 16 Elective, 20 General Education.'
                };
            } else if (text.includes('Prerequisite')) {
                botResponse = {
                    id: Date.now() + 1, sender: 'bot',
                    text: 'Warning: CS201 requires CS102 (Completed). MA201 requires MA101 (Completed). You are compliant.'
                };
            } else if (text.includes('Recommendations')) {
                botResponse = {
                    id: Date.now() + 1, sender: 'bot',
                    text: 'Based on your audit, consider taking: CS202, CS203, HS101.'
                };
            }

            setMessages(prev => [...prev, botResponse]);
        }, 500);
    };

    return (
        <div className="container" style={{ padding: '2rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Student Support Chat</h1>

            <Card style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {messages.map(msg => (
                        <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                backgroundColor: msg.sender === 'user' ? 'var(--color-primary)' : '#f0f0f0',
                                color: msg.sender === 'user' ? 'white' : 'var(--color-text)'
                            }}>
                                {msg.text}
                            </div>
                            {msg.options && (
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                    {msg.options.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => handleSend(opt)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: '1rem',
                                                border: '1px solid var(--color-primary)',
                                                background: 'white',
                                                color: 'var(--color-primary)',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', padding: '1rem', display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about degree audit or schedule..."
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                    />
                    <button onClick={() => handleSend()} className="btn btn-primary">Send</button>
                </div>
            </Card>
        </div>
    );
};

export default Chat;
