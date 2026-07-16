// js/app.js
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initBubbleCanvas();
  initStatsCounter();
  initScrollProgress();
  initThemeEngine();
  initChatbotSupport();
});

// 1. Custom Smooth Cursor Engine
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const glow = document.getElementById('customCursorGlow');
  if (!cursor || !glow) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    // Smooth magnetic follow effect
    glow.animate({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`
    }, { duration: 150, fill: "forwards" });
  });
}

// 2. Multi-direction Soap Bubbles Generator
function initBubbleCanvas() {
  const canvas = document.getElementById('bubbleCanvas');
  if (!canvas) return;

  for (let i = 0; i < 25; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Dynamic random scaling & movement paths
    const size = Math.random() * 32 + 12;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDelay = `${Math.random() * 8}s`;
    bubble.style.animationDuration = `${Math.random() * 10 + 6}s`;
    
    canvas.appendChild(bubble);
  }
}

// 3. React-like Auto Counters
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = +stat.getAttribute('data-count');
    if (!target) return;
    
    const updateCount = () => {
      const current = +stat.innerText || 0;
      const speed = target / 50;
      if (current < target) {
        stat.innerText = Math.ceil(current + speed);
        setTimeout(updateCount, 25);
      } else {
        stat.innerText = target;
      }
    };
    updateCount();
  });
}

// 4. Scroll Indicator Progress Bar
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  });
}

// 5. Stripe-like Light/Dark Theme Switcher
function initThemeEngine() {
  const btn = document.getElementById('themeToggleBtn');
  const icon = document.getElementById('themeIcon');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    if (icon) {
      if (newTheme === 'dark') {
        icon.setAttribute('data-lucide', 'moon');
      } else {
        icon.setAttribute('data-lucide', 'sun');
      }
      if (window.lucide) lucide.createIcons();
    }
  });
}

// 6. Interactive Mock Chatbot
function initChatbotSupport() {
  const chatBtn = document.getElementById('chatBtn');
  const chatWindow = document.getElementById('chatWindow');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  
  // PERBAIKAN: Gunakan satu ID konsisten untuk tombol kirim chat
  const sendChatBtn = document.getElementById('sendChatBtn') || document.getElementById('sendBtn');

  if (!chatBtn || !chatWindow) return;

  chatBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
  });

  const sendMsg = () => {
    if (!chatInput || !chatMessages) return;
    const text = chatInput.value.trim();
    if (!text) return;

    // Tambah pesan user
    const userMsg = document.createElement('div');
    userMsg.style.cssText = "background: var(--primary); color: white; padding: 8px 12px; border-radius: 8px; align-self: flex-end; max-width: 80%; margin-bottom: 8px;";
    userMsg.innerText = text;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Balasan simulasi dari AI Wizbot
    setTimeout(() => {
      const systemMsg = document.createElement('div');
      systemMsg.style.cssText = "background: rgba(124,58,237,0.1); padding: 8px 12px; border-radius: 8px; align-self: flex-start; max-width: 80%; margin-bottom: 8px; color: var(--text-main);";
      systemMsg.innerText = "Pesanan Anda dipantau secara otomatis oleh sistem kurir terintegrasi. Anda dapat melihat prosesnya langsung pada menu tracking!";
      chatMessages.appendChild(systemMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  };

  if (sendChatBtn) {
    sendChatBtn.addEventListener('click', sendMsg);
  }
  
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMsg();
    });
  }
}