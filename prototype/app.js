// ===== Preloader =====
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 2000);
    initFireflies();
    initCustomCursor();
    initClickRipple();
    initCardTilt();
    initButtonRipple();
    animateStats();
});

// ===== Custom Cursor =====
function initCustomCursor() {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
        dot.style.transform = 'translate(-50%, -50%)';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverables = 'a, button, .btn, .feature-card, .forecast-card, .guide-card, .scheme-card, .filter-btn, .quick-reply, .social-link, select, input, textarea';
    document.querySelectorAll(hoverables).forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    // Re-attach for dynamically created elements
    const bodyObserver = new MutationObserver(() => {
        document.querySelectorAll(hoverables).forEach(el => {
            if (!el.dataset.cursorBound) {
                el.dataset.cursorBound = 'true';
                el.addEventListener('mouseenter', () => ring.classList.add('hover'));
                el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
            }
        });
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
}

// ===== Click Ripple Effect =====
function initClickRipple() {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
}

// ===== Button Light Follow =====
function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            btn.style.setProperty('--ripple-x', x + '%');
            btn.style.setProperty('--ripple-y', y + '%');
        });
    });
}

// ===== 3D Card Tilt + Glow Follow =====
function initCardTilt() {
    const cards = document.querySelectorAll('.feature-card, .scheme-card, .guide-card, .forecast-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            card.style.setProperty('--glow-x', (x / rect.width * 100) + '%');
            card.style.setProperty('--glow-y', (y / rect.height * 100) + '%');
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            setTimeout(() => card.style.transition = '', 500);
        });
    });
}

// ===== Firefly Particles =====
function initFireflies() {
    const container = document.createElement('div');
    container.className = 'fireflies';
    document.body.appendChild(container);

    for (let i = 0; i < 25; i++) {
        const ff = document.createElement('div');
        ff.className = 'firefly';
        const size = Math.random() * 4 + 2;
        ff.style.width = size + 'px';
        ff.style.height = size + 'px';
        ff.style.left = Math.random() * 100 + '%';
        ff.style.animationDuration = (Math.random() * 25 + 20) + 's';
        ff.style.animationDelay = (Math.random() * 15) + 's';
        container.appendChild(ff);
    }
}

// ===== Navbar =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
}

// ===== Scroll Animations (Staggered) =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || 0);
            setTimeout(() => entry.target.classList.add('visible'), delay);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ===== Stats Counter =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, parseInt(entry.target.dataset.count));
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(num => statsObserver.observe(num));
}

function animateCounter(el, target) {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); }
        else el.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// ===== Crop Recommendation Engine =====
const cropDatabase = {
    alluvial: {
        kharif: [
            { name: 'Rice', match: 'High', season: 'Kharif', water: 'High', temp: '25-35°C' },
            { name: 'Sugarcane', match: 'High', season: 'Annual', water: 'High', temp: '20-30°C' },
            { name: 'Maize', match: 'Medium', season: 'Kharif', water: 'Medium', temp: '21-27°C' }
        ],
        rabi: [
            { name: 'Wheat', match: 'High', season: 'Rabi', water: 'Medium', temp: '20-25°C' },
            { name: 'Mustard', match: 'High', season: 'Rabi', water: 'Low', temp: '15-25°C' },
            { name: 'Potato', match: 'Medium', season: 'Rabi', water: 'Medium', temp: '15-20°C' }
        ],
        zaid: [
            { name: 'Watermelon', match: 'High', season: 'Zaid', water: 'Medium', temp: '25-35°C' },
            { name: 'Cucumber', match: 'High', season: 'Zaid', water: 'Medium', temp: '20-30°C' },
            { name: 'Moong Dal', match: 'Medium', season: 'Zaid', water: 'Low', temp: '25-35°C' }
        ]
    },
    black: {
        kharif: [
            { name: 'Cotton', match: 'High', season: 'Kharif', water: 'Medium', temp: '25-35°C' },
            { name: 'Soybean', match: 'High', season: 'Kharif', water: 'Medium', temp: '20-30°C' },
            { name: 'Sorghum', match: 'Medium', season: 'Kharif', water: 'Low', temp: '25-32°C' }
        ],
        rabi: [
            { name: 'Wheat', match: 'High', season: 'Rabi', water: 'Medium', temp: '20-25°C' },
            { name: 'Chickpea', match: 'High', season: 'Rabi', water: 'Low', temp: '15-25°C' },
            { name: 'Linseed', match: 'Medium', season: 'Rabi', water: 'Low', temp: '15-20°C' }
        ],
        zaid: [
            { name: 'Groundnut', match: 'High', season: 'Zaid', water: 'Medium', temp: '25-30°C' },
            { name: 'Sunflower', match: 'Medium', season: 'Zaid', water: 'Medium', temp: '20-25°C' }
        ]
    },
    red: {
        kharif: [
            { name: 'Groundnut', match: 'High', season: 'Kharif', water: 'Medium', temp: '25-30°C' },
            { name: 'Millets', match: 'High', season: 'Kharif', water: 'Low', temp: '25-35°C' },
            { name: 'Pulses', match: 'Medium', season: 'Kharif', water: 'Low', temp: '20-30°C' }
        ],
        rabi: [
            { name: 'Potato', match: 'High', season: 'Rabi', water: 'Medium', temp: '15-20°C' },
            { name: 'Wheat', match: 'Medium', season: 'Rabi', water: 'Medium', temp: '20-25°C' }
        ],
        zaid: [{ name: 'Vegetables', match: 'High', season: 'Zaid', water: 'Medium', temp: '20-30°C' }]
    }
};

const defaultCrops = {
    kharif: [{ name: 'Rice', match: 'Medium', season: 'Kharif', water: 'High', temp: '25-35°C' }, { name: 'Maize', match: 'Medium', season: 'Kharif', water: 'Medium', temp: '21-27°C' }],
    rabi: [{ name: 'Wheat', match: 'Medium', season: 'Rabi', water: 'Medium', temp: '20-25°C' }, { name: 'Mustard', match: 'Medium', season: 'Rabi', water: 'Low', temp: '15-25°C' }],
    zaid: [{ name: 'Watermelon', match: 'Medium', season: 'Zaid', water: 'Medium', temp: '25-35°C' }]
};

document.getElementById('crop-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const soil = document.getElementById('soil-type').value;
    const season = document.getElementById('season').value;
    if (!soil || !season) { showToast('Please select both soil type and season', 'error'); return; }

    const results = (cropDatabase[soil]?.[season]) || defaultCrops[season] || [];
    const container = document.getElementById('crop-results');

    if (!results.length) {
        container.innerHTML = '<div class="results-placeholder"><h3>No results found</h3><p>Try different parameters</p></div>';
        return;
    }

    container.innerHTML = '<h3 style="margin-bottom:24px;width:100%;"><i class="fas fa-check-circle" style="color:var(--primary);filter:drop-shadow(0 0 6px var(--primary-glow))"></i> Recommended Crops</h3>';
    container.style.justifyContent = 'flex-start';
    container.style.alignItems = 'stretch';

    results.forEach((crop, i) => {
        const card = document.createElement('div');
        card.className = 'crop-result-card';
        card.style.animationDelay = `${i * 0.15}s`;
        card.innerHTML = `
            <div class="crop-result-header">
                <span class="crop-result-name">🌾 ${crop.name}</span>
                <span class="crop-match ${crop.match === 'High' ? 'match-high' : 'match-medium'}">${crop.match} Match</span>
            </div>
            <div class="crop-result-details">
                <span><i class="fas fa-calendar"></i> ${crop.season}</span>
                <span><i class="fas fa-tint"></i> Water: ${crop.water}</span>
                <span><i class="fas fa-thermometer-half"></i> ${crop.temp}</span>
            </div>`;
        container.appendChild(card);
    });
    showToast('Crop recommendations generated! 🌱', 'success');
    initCardTilt(); // Reinit tilt for new cards
});

// ===== Government Schemes Filter =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.scheme-card').forEach((card, i) => {
            const show = filter === 'all' || card.dataset.category === filter;
            card.style.display = show ? '' : 'none';
            if (show) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = '0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, i * 80);
            }
        });
    });
});

// ===== Market Data =====
const marketData = [
    { crop: 'Wheat', market: 'Azadpur, Delhi', min: 2100, max: 2450, modal: 2275, trend: 'up', demand: 'High' },
    { crop: 'Rice (Basmati)', market: 'Karnal, Haryana', min: 3800, max: 4500, modal: 4150, trend: 'up', demand: 'High' },
    { crop: 'Cotton', market: 'Rajkot, Gujarat', min: 6200, max: 7100, modal: 6650, trend: 'down', demand: 'Medium' },
    { crop: 'Soybean', market: 'Indore, MP', min: 4100, max: 4600, modal: 4350, trend: 'up', demand: 'High' },
    { crop: 'Mustard', market: 'Jaipur, Rajasthan', min: 4800, max: 5400, modal: 5100, trend: 'up', demand: 'Medium' },
    { crop: 'Onion', market: 'Nashik, Maharashtra', min: 800, max: 1500, modal: 1150, trend: 'down', demand: 'High' },
    { crop: 'Tomato', market: 'Kolar, Karnataka', min: 600, max: 1200, modal: 900, trend: 'down', demand: 'Medium' },
    { crop: 'Potato', market: 'Agra, UP', min: 500, max: 900, modal: 700, trend: 'up', demand: 'High' },
    { crop: 'Sugarcane', market: 'Lucknow, UP', min: 3100, max: 3500, modal: 3300, trend: 'up', demand: 'Medium' },
    { crop: 'Maize', market: 'Davangere, Karnataka', min: 1800, max: 2200, modal: 2000, trend: 'down', demand: 'Low' },
];

function renderMarketTable(data) {
    document.getElementById('market-tbody').innerHTML = data.map((item, i) => `
        <tr style="animation: slideUp 0.4s ${i * 0.05}s ease both;">
            <td><strong>${item.crop}</strong></td>
            <td>${item.market}</td>
            <td>₹${item.min.toLocaleString()}</td>
            <td>₹${item.max.toLocaleString()}</td>
            <td><strong>₹${item.modal.toLocaleString()}</strong></td>
            <td class="trend-${item.trend}"><i class="fas fa-arrow-${item.trend}"></i> ${item.trend === 'up' ? 'Rising' : 'Falling'}</td>
            <td class="demand-${item.demand.toLowerCase()}">${item.demand}</td>
        </tr>`).join('');
}
renderMarketTable(marketData);

document.getElementById('market-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    renderMarketTable(marketData.filter(item => item.crop.toLowerCase().includes(q) || item.market.toLowerCase().includes(q)));
});

// ===== Animated Price Chart =====
function drawChart() {
    const canvas = document.getElementById('price-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const wrapper = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = wrapper.offsetWidth * dpr;
    canvas.height = 300 * dpr;
    canvas.style.width = wrapper.offsetWidth + 'px';
    canvas.style.height = '300px';
    ctx.scale(dpr, dpr);

    const W = wrapper.offsetWidth, H = 300;
    const pad = { top: 30, right: 30, bottom: 40, left: 65 };
    const cW = W - pad.left - pad.right, cH = H - pad.top - pad.bottom;

    const prices = [2100,2150,2200,2180,2220,2280,2250,2300,2320,2280,2350,2380,2340,2400,2420,2380,2450,2430,2480,2500,2520,2480,2510,2550,2530,2570,2600,2580,2620,2650];
    const minP = Math.min(...prices) - 100, maxP = Math.max(...prices) + 100;

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    for (let i = 0; i <= 5; i++) {
        const y = pad.top + (cH / 5) * i;
        ctx.strokeStyle = 'rgba(148,163,184,0.06)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
        ctx.fillStyle = '#5a7184'; ctx.font = '11px Inter';
        ctx.fillText('₹' + Math.round(maxP - ((maxP - minP) / 5) * i), 4, y + 4);
    }

    // Gradient fill
    const grad = ctx.createLinearGradient(0, pad.top, 0, H - pad.bottom);
    grad.addColorStop(0, 'rgba(34,197,94,0.25)');
    grad.addColorStop(0.5, 'rgba(34,197,94,0.08)');
    grad.addColorStop(1, 'rgba(34,197,94,0)');

    const getX = i => pad.left + (cW / (prices.length - 1)) * i;
    const getY = p => pad.top + cH - ((p - minP) / (maxP - minP)) * cH;

    // Smooth curve helper
    function drawSmoothLine(pts) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
            const prev = pts[i - 1], cur = pts[i];
            const cpx = (prev.x + cur.x) / 2;
            ctx.bezierCurveTo(cpx, prev.y, cpx, cur.y, cur.x, cur.y);
        }
    }

    const pts = prices.map((p, i) => ({ x: getX(i), y: getY(p) }));

    // Fill area
    ctx.save();
    drawSmoothLine(pts);
    ctx.lineTo(pts[pts.length - 1].x, H - pad.bottom);
    ctx.lineTo(pts[0].x, H - pad.bottom);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // Line with glow
    ctx.save();
    ctx.shadowColor = 'rgba(34,197,94,0.4)';
    ctx.shadowBlur = 12;
    drawSmoothLine(pts);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.restore();

    // Dots
    prices.forEach((p, i) => {
        if (i % 5 === 0 || i === prices.length - 1) {
            const x = getX(i), y = getY(p);
            ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#22c55e'; ctx.fill();
            ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(34,197,94,0.25)'; ctx.lineWidth = 2; ctx.stroke();
        }
    });

    ctx.fillStyle = '#94a3b8'; ctx.font = '12px Inter';
    ctx.fillText('Wheat Price Trend (₹ per Quintal)', pad.left, 18);
}
drawChart();
window.addEventListener('resize', drawChart);

// ===== Chatbot =====
function toggleChatbot() {
    const win = document.getElementById('chatbot-window');
    const trigger = document.getElementById('chatbot-trigger');
    win.classList.toggle('open');
    if (win.classList.contains('open')) trigger.querySelector('.chatbot-badge').style.display = 'none';
}

const chatResponses = {
    'crop recommendations': 'Based on the current season, I recommend focusing on Rabi crops like Wheat, Mustard, and Chickpea. Would you like specific growing tips for any of these? 🌾',
    'pest control methods': '🌿 Common organic pest control:\n• Neem oil spray for aphids & whiteflies\n• Introduce ladybugs for natural control\n• Baking soda solution for fungal diseases\n• Proper drainage to prevent root rot\n\nWant to know about a specific pest?',
    'weather advisory': '🌧️ Current advisory: Light rain expected mid-week.\n\n✅ Ideal time for sowing Rabi crops\n⚠️ Avoid heavy irrigation before rain\n📋 Apply mulching to conserve moisture\n\nWould you like a detailed forecast?',
    'government schemes': '🏛️ Top schemes for farmers:\n\n1. PM-KISAN - ₹6,000/year direct benefit\n2. PM Fasal Bima Yojana - Crop insurance\n3. Kisan Credit Card - Easy farm loans\n4. PM-KUSUM - Solar pump subsidy\n\nWant details on any specific scheme?',
};

function sendMessage() {
    const input = document.getElementById('chatbot-input-field');
    const text = input.value.trim();
    if (!text) return;
    addChatMessage(text, 'user');
    input.value = '';

    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'chat-message bot';
    typing.innerHTML = `<div class="message-avatar"><i class="fas fa-robot"></i></div><div class="message-content"><p style="opacity:0.5">Typing...</p></div>`;
    document.getElementById('chatbot-messages').appendChild(typing);

    setTimeout(() => {
        typing.remove();
        const lower = text.toLowerCase();
        let response = `I understand you're asking about "${text}". I can help with crop recommendations, pest control, weather advisory, and government schemes. How can I assist? 🌱`;

        for (const [key, val] of Object.entries(chatResponses)) {
            if (lower.includes(key) || key.includes(lower)) { response = val; break; }
        }
        if (lower.match(/hello|hi|hey/)) response = 'Hello! 👋 Welcome to AgriBot. I\'m here to help with all your farming needs!';
        if (lower.match(/price|market/)) response = '📊 Current prices:\n• Wheat: ₹2,275/Q (↑ Rising)\n• Rice Basmati: ₹4,150/Q (↑ Rising)\n• Cotton: ₹6,650/Q (↓ Falling)\n\nCheck our Market section for live updates!';
        if (lower.match(/soil/)) response = '🔬 For soil analysis, you\'ll need:\n• pH Level (ideal: 6.0-7.5)\n• NPK levels\n• Organic carbon content\n\nUse our Crop Recommendation tool!';

        addChatMessage(response, 'bot');
    }, 1000);
}

function sendQuickReply(text) {
    document.getElementById('chatbot-input-field').value = text;
    sendMessage();
}

function addChatMessage(text, sender) {
    const container = document.getElementById('chatbot-messages');
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    const icon = sender === 'bot' ? 'fa-robot' : 'fa-user';
    msg.innerHTML = `<div class="message-avatar"><i class="fas ${icon}"></i></div><div class="message-content"><p>${text.replace(/\n/g, '<br>')}</p></div>`;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}

function handleChatKeypress(e) { if (e.key === 'Enter') sendMessage(); }

// ===== Guide Modal =====
const cropGuides = {
    wheat: { icon: 'fa-wheat-awn', color: '#f6d365', title: 'Wheat Growing Guide', content: `<h4>🌾 Season</h4><p>Rabi (Oct-Dec sowing, Mar-Apr harvest)</p><h4>🌡️ Temp</h4><p>20-25°C ideal. Cool growth, warm ripening.</p><h4>🏔️ Soil</h4><p>Well-drained loamy, pH 6.0-7.5. Alluvial best.</p><h4>💧 Water</h4><p>4-6 irrigations. Critical at crown root, tillering, flowering.</p><h4>📋 Steps</h4><ol><li>Prepare field with 2-3 ploughings</li><li>Treat seeds with fungicide</li><li>Sow at 20cm row spacing, 5cm depth</li><li>First irrigation 20-25 days after sowing</li><li>Apply weedicide after 30-35 days</li><li>Harvest at 12-14% grain moisture</li></ol>` },
    rice: { icon: 'fa-leaf', color: '#56ab2f', title: 'Rice Growing Guide', content: `<h4>🌾 Season</h4><p>Kharif (Jun-Jul transplanting, Oct-Nov harvest)</p><h4>🌡️ Temp</h4><p>25-35°C. Warm and humid.</p><h4>🏔️ Soil</h4><p>Clay/clay-loam, pH 5.5-6.5.</p><h4>💧 Water</h4><p>Standing water (5cm) throughout.</p><h4>📋 Steps</h4><ol><li>Prepare nursery, sow seeds</li><li>Transplant at 20-25 days</li><li>Maintain 5cm water level</li><li>Apply nitrogen in 3 splits</li><li>Monitor for blast disease</li><li>Drain 15 days before harvest</li></ol>` },
    cotton: { icon: 'fa-cloud', color: '#f5576c', title: 'Cotton Growing Guide', content: `<h4>🌾 Season</h4><p>Kharif (Apr-May sowing, Oct-Jan picking)</p><h4>🌡️ Temp</h4><p>25-35°C. Frost-free 200+ days.</p><h4>🏔️ Soil</h4><p>Black cotton soil, pH 6.0-8.0.</p><h4>📋 Steps</h4><ol><li>Deep ploughing in summer</li><li>Seed treatment with Imidacloprid</li><li>Sow 90×60cm spacing</li><li>First irrigation 3 weeks after sowing</li><li>Use pheromone traps for bollworm</li><li>Pick when bolls open fully</li></ol>` },
    sugarcane: { icon: 'fa-grip-lines-vertical', color: '#00f2fe', title: 'Sugarcane Growing Guide', content: `<h4>🌾 Season</h4><p>Annual. Plant Feb-Mar or Oct. 10-12 months.</p><h4>🌡️ Temp</h4><p>20-30°C. Hot and humid preferred.</p><h4>🏔️ Soil</h4><p>Deep rich loamy, pH 6.5-7.5.</p><h4>📋 Steps</h4><ol><li>Deep ploughing and ridge prep</li><li>Plant 2-3 budded setts</li><li>Apply FYM at 25 t/ha</li><li>Earthing up at 90 and 120 days</li><li>Trash mulching between rows</li><li>Harvest at Brix > 20</li></ol>` },
    mustard: { icon: 'fa-sun', color: '#fee140', title: 'Mustard Growing Guide', content: `<h4>🌾 Season</h4><p>Rabi (Oct sowing, Feb-Mar harvest)</p><h4>🌡️ Temp</h4><p>15-25°C. Cool and dry.</p><h4>🏔️ Soil</h4><p>Sandy loam to loam, pH 6.0-7.5.</p><h4>📋 Steps</h4><ol><li>One deep ploughing + 2 harrowings</li><li>Seed rate: 3-4 kg/ha</li><li>Row spacing: 30-45cm</li><li>NPK 60:40:20 kg/ha</li><li>First irrigation at 25-30 days</li><li>Harvest when pods turn yellow-brown</li></ol>` }
};

function showGuide(crop) {
    const g = cropGuides[crop];
    if (!g) return;
    const body = document.getElementById('guide-modal-body');
    body.innerHTML = `<div style="text-align:center;margin-bottom:28px;"><div style="width:88px;height:88px;border-radius:50%;background:${g.color};display:inline-flex;align-items:center;justify-content:center;margin-bottom:18px;box-shadow:0 8px 30px ${g.color}40;"><i class="fas ${g.icon}" style="font-size:40px;color:rgba(255,255,255,0.9);"></i></div><h2>${g.title}</h2></div><div style="font-size:14px;color:var(--text-secondary);line-height:1.9;">${g.content}</div>`;
    document.getElementById('guide-modal').classList.add('open');
}

function closeGuideModal() { document.getElementById('guide-modal').classList.remove('open'); }
document.getElementById('guide-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeGuideModal(); });

// ===== Toast =====
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ===== Contact Form =====
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    if (!name || !email) { showToast('Please fill in name and email', 'error'); return; }
    showToast(`Welcome aboard, ${name}! 🌱`, 'success');
    e.target.reset();
});

// ===== Weather Refresh =====
document.getElementById('weather-refresh').addEventListener('click', function() {
    this.querySelector('i').style.animation = 'none';
    this.querySelector('i').offsetHeight;
    this.querySelector('i').style.animation = 'spin 0.6s ease';
    setTimeout(() => showToast('Weather data refreshed! 🌤️', 'success'), 600);
});

// ===== Escape Key =====
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeGuideModal();
        document.getElementById('chatbot-window').classList.remove('open');
    }
});

// ===== Smooth Section Transitions on Nav Click =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
