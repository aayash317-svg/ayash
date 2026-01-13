import React, { useState } from 'react';
import Card from '../../components/Card';
import { Send, Bot, User, HelpCircle } from 'lucide-react';

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
            text: 'Hello! I am your Academic Assistant. I can help with Degree Audits, Schedule Optimization, and general inquiries. What would you like to know today?',
            options: ['Start Degree Audit', 'Check Prerequisites', 'Recommend Courses']
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

            if (text.includes('Audit') || text.includes('Credits')) {
                botResponse = {
                    id: Date.now() + 1, sender: 'bot',
                    text: '<strong>Degree Status:</strong> You have 56 credits remaining.<br/>• 20 Core Credits<br/>• 16 Elective Credits<br/>• 20 GenEd Credits'
                };
            } else if (text.includes('Prerequisite')) {
                botResponse = {
                    id: Date.now() + 1, sender: 'bot',
                    text: '<strong>Prerequisite Check:</strong><br/>CS201 requires CS102 (Completed).<br/>MA201 requires MA101 (Completed).<br/>You are eligible for these courses.'
                };
            } else if (text.includes('Recommend')) {
                botResponse = {
                    id: Date.now() + 1, sender: 'bot',
                    text: 'Based on your path, I recommend taking: <strong>CS202</strong> (Databases), <strong>CS203</strong> (OS), and <strong>HS101</strong> (Psychology) next semester.'
                };
            }

            setMessages(prev => [...prev, botResponse]);
        }, 600);
    };

    return (
        <div className="container" style={{ padding: '2rem 0', maxWidth: '900px', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', backgroundColor: 'var(--primary-100)', borderRadius: '50%', color: 'var(--primary-700)' }}>
                    <HelpCircle size={28} />
                </div>
                <div>
                    <h1 className="text-h2" style={{ marginBottom: 0 }}>Student Support</h1>
                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>AI-powered academic assistance</p>
                </div>
            </div>

            <Card style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-lg)' }}>
                {/* Chat Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'var(--gray-50)' }}>
                    {messages.map(msg => (
                        <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                                <div style={{
                                    width: '2rem',
                                    height: '2rem',
                                    borderRadius: '50%',
                                    backgroundColor: msg.sender === 'user' ? 'var(--primary-600)' : 'var(--accent-teal)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    flexShrink: 0
                                }}>
                                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                                </div>
                                <div>
                                    <div style={{
                                        padding: '1rem 1.25rem',
                                        borderRadius: msg.sender === 'user' ? '1rem 0 1rem 1rem' : '0 1rem 1rem 1rem',
                                        backgroundColor: msg.sender === 'user' ? 'var(--primary-600)' : 'white',
                                        color: msg.sender === 'user' ? 'white' : 'var(--gray-800)',
                                        boxShadow: msg.sender === 'bot' ? 'var(--shadow-sm)' : 'none',
                                        fontSize: '0.9375rem',
                                        lineHeight: 1.5
                                    }} dangerouslySetInnerHTML={{ __html: msg.text }} />

                                    {msg.options && (
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                                            {msg.options.map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => handleSend(opt)}
                                                    className="btn"
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: 'var(--radius-full)',
                                                        border: '1px solid var(--primary-200)',
                                                        backgroundColor: 'white',
                                                        color: 'var(--primary-700)',
                                                        fontSize: '0.8125rem',
                                                        transition: 'var(--transition-base)'
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-50)'}
                                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div style={{ padding: '1.5rem', backgroundColor: 'white', borderTop: '1px solid var(--gray-200)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: 'var(--gray-50)', padding: '0.5rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--gray-200)' }}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={e => setInputText(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                            placeholder="Type your question here..."
                            style={{
                                flex: 1,
                                padding: '0.75rem 1rem',
                                border: 'none',
                                background: 'transparent',
                                outline: 'none',
                                fontSize: '0.9375rem'
                            }}
                        />
                        <button
                            onClick={() => handleSend()}
                            className="btn btn-primary"
                            style={{ borderRadius: '50%', width: '3rem', height: '3rem', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            disabled={!inputText.trim()}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Chat;
