import { useState, useRef, useEffect } from 'react';
import { FaCommentDots, FaTimes, FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

const quickReplies = ['🌾 Crop tips', '🐛 Pest control', '🌧️ Weather', '🏛️ Schemes', '📊 Prices'];

const botResponses = {
  'crop tips': '🌾 Based on the current Rabi season:\n• Wheat — ideal for North India\n• Mustard — low water, good returns\n• Chickpea — improves soil health\n\nWant detailed growing tips?',
  'pest control': '🐛 Common organic methods:\n• Neem oil spray for aphids\n• Yellow sticky traps for whiteflies\n• Baking soda for fungal diseases\n• Pheromone traps for bollworm\n\nWhich crop pest are you facing?',
  'weather': '🌤️ Current advisory:\n• Temperature: 28°C (suitable for sowing)\n• Rain expected mid-week\n• Avoid heavy irrigation before rain\n\nCheck our Weather Dashboard for details!',
  'schemes': '🏛️ Top schemes for you:\n1. PM-KISAN — ₹6,000/year\n2. PM Fasal Bima — Crop insurance\n3. KCC — Farm credit at 4%\n4. PM-KUSUM — Solar pump subsidy\n\nVisit our Schemes page for links!',
  'prices': '📊 Today\'s mandi prices:\n• Wheat: ₹2,275/Q (↑)\n• Rice: ₹4,150/Q (↑)\n• Cotton: ₹6,650/Q (↓)\n• Mustard: ₹5,100/Q (↑)\n\nSet alerts on our Market page!',
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! 👋 I\'m AgriBot, your smart farming assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { sender: 'user', text: msg }]);
    setInput('');

    setTimeout(() => {
      const lower = msg.toLowerCase();
      let response = `I understand you're asking about "${msg}". I can help with crop tips, pest control, weather, schemes, and prices. What would you like to know? 🌱`;

      for (const [key, val] of Object.entries(botResponses)) {
        if (lower.includes(key)) { response = val; break; }
      }
      if (lower.match(/hello|hi|hey/)) response = 'Hello! 👋 Welcome to AgriBot. Ask me anything about farming!';
      if (lower.match(/thank/)) response = 'You\'re welcome! Happy farming! 🌾 Feel free to ask anything else.';

      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
    }, 800);
  };

  return (
    <>
      <button className="chatbot-trigger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaCommentDots />}
        {!isOpen && <span className="chatbot-badge">1</span>}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              🤖
            </div>
            <div>
              <h4>AgriBot</h4>
              <div className="chatbot-status"><span className="status-dot" /> Online</div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: 18, cursor: 'pointer' }}>
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'bot' ? <FaRobot /> : <FaUser />}
                </div>
                <div className="message-content">
                  <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                  {msg.sender === 'bot' && i === messages.length - 1 && (
                    <div className="quick-replies">
                      {quickReplies.map(qr => (
                        <button key={qr} className="quick-reply" onClick={() => sendMessage(qr)}>
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEnd} />
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type your question..."
            />
            <button className="chatbot-send" onClick={() => sendMessage()}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
