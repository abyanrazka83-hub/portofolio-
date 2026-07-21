/**
 * ============================================================
 * YANZ PORTFOLIO - JavaScript
 * ============================================================
 */

(function() {
    'use strict';

    // ============================================================
    // 1. JAM DIGITAL & TANGGAL (untuk footer & motivasi bar)
    // ============================================================
    function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        const timeStr = `${h}:${m}:${s}`;
        
        const clockDisplay = document.getElementById('clockDisplay');
        const motivationClock = document.getElementById('motivationClock');
        if (clockDisplay) clockDisplay.textContent = timeStr;
        if (motivationClock) motivationClock.textContent = timeStr;
        
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
        const dateDisplay = document.getElementById('dateDisplay');
        if (dateDisplay) dateDisplay.textContent = dateStr;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ============================================================
    // 2. AVATAR INTERAKSI
    // ============================================================
    const avatar = document.getElementById('avatarBtn');
    if (avatar) {
        avatar.addEventListener('click', function(e) {
            this.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            this.style.transform = 'rotate(720deg) scale(1.2)';
            this.style.boxShadow = '0 0 0 20px rgba(0,240,255,0.2), 0 30px 70px rgba(0,0,0,0.6)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) scale(1)';
                this.style.boxShadow = '';
            }, 900);
        });
    }

    // ============================================================
    // 3. FLOATING ACTION BUTTON (BUNDARAN SOSMED)
    // ============================================================
    const fabMain = document.getElementById('fabMain');
    const fabSocial = document.getElementById('fabSocial');
    let isFabOpen = false;

    if (fabMain) {
        fabMain.addEventListener('click', function(e) {
            e.stopPropagation();
            isFabOpen = !isFabOpen;
            this.classList.toggle('active');
            if (fabSocial) fabSocial.classList.toggle('open');
            
            const icon = this.querySelector('.fab-icon');
            if (icon) {
                if (isFabOpen) {
                    icon.className = 'fas fa-times fab-icon';
                } else {
                    icon.className = 'fas fa-share-alt fab-icon';
                }
            }
        });
    }

    // Tutup FAB jika klik di luar
    document.addEventListener('click', function(e) {
        const container = document.getElementById('fabContainer');
        if (container && !container.contains(e.target) && isFabOpen) {
            isFabOpen = false;
            if (fabMain) fabMain.classList.remove('active');
            if (fabSocial) fabSocial.classList.remove('open');
            const icon = fabMain ? fabMain.querySelector('.fab-icon') : null;
            if (icon) icon.className = 'fas fa-share-alt fab-icon';
        }
    });

    // ============================================================
    // 4. FEATURE CARDS
    // ============================================================
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.92)';
            setTimeout(() => { this.style.transform = ''; }, 200);
        });
    });

    // ============================================================
    // 5. SCROLL ANIMATION (Intersection Observer)
    // ============================================================
    // Feature cards observer
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.feature-card').forEach(card => {
        featureObserver.observe(card);
    });

    // Skill items observer
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const fill = entry.target.querySelector('.skill-fill');
                if (fill && !fill.style.width) {
                    const width = fill.style.getPropertyValue('--w');
                    if (width) {
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 300);
                    }
                }
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.skill-item').forEach(item => {
        skillObserver.observe(item);
    });

    // Stats observer
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });

    // ============================================================
    // 6. MOTIVASI BERUBAH OTOMATIS (di bar atas)
    // ============================================================
    const motText = document.getElementById('motivationText');
    const quotes = [
        'konsistensi > bakat',
        'debugging is art',
        'belajar seumur hidup',
        'code, sleep, repeat',
        'kreativitas tanpa batas',
        'hari ini lebih baik dari kemarin',
        'kecil tapi konsisten',
        'programmer adalah penyihir modern'
    ];
    let qIdx = 0;
    if (motText) {
        setInterval(() => {
            qIdx = (qIdx + 1) % quotes.length;
            motText.style.opacity = '0';
            setTimeout(() => {
                motText.innerHTML = `
                    <i class="fas fa-quote-left" style="opacity:0.3; font-size:0.7rem;"></i>
                    ${quotes[qIdx]}
                    <i class="fas fa-quote-right" style="opacity:0.3; font-size:0.7rem;"></i>
                `;
                motText.style.opacity = '1';
            }, 300);
        }, 5000);
    }

    // ============================================================
    // 7. QUOTE TEXT BERUBAH (di profile)
    // ============================================================
    const quoteText = document.getElementById('quoteText');
    const quotes2 = [
        'kode adalah puisi, dan aku penyairnya.',
        'membangun mimpi satu baris kode.',
        'dari nol menjadi pahlawan kode.',
        'setiap bug adalah pelajaran.',
        'kreativitas adalah batasnya.',
        'keamanan adalah prioritas utama.'
    ];
    let qIdx2 = 0;
    if (quoteText) {
        setInterval(() => {
            qIdx2 = (qIdx2 + 1) % quotes2.length;
            quoteText.style.opacity = '0';
            setTimeout(() => {
                quoteText.textContent = quotes2[qIdx2];
                quoteText.style.opacity = '1';
            }, 300);
        }, 7000);
    }

    // ============================================================
    // 8. BADGE GLOW RANDOM
    // ============================================================
    const badge = document.getElementById('statusBadge');
    if (badge) {
        setInterval(() => {
            const hue = Math.floor(Math.random() * 40) + 170;
            badge.style.borderColor = `hsl(${hue}, 85%, 55%)`;
            badge.style.color = `hsl(${hue}, 85%, 65%)`;
            badge.style.boxShadow = `0 0 30px hsla(${hue}, 85%, 55%, 0.1)`;
        }, 3000);
    }

    // ============================================================
    // 9. STATS COUNTER
    // ============================================================
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const step = Math.ceil(target / 30);
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            element.textContent = current + suffix;
        }, 60);
    }

    setTimeout(() => {
        const statProjects = document.getElementById('statProjects');
        const statFollowers = document.getElementById('statFollowers');
        const statStars = document.getElementById('statStars');
        const statHours = document.getElementById('statHours');
        if (statProjects) animateCounter(statProjects, 12, '+');
        if (statFollowers) animateCounter(statFollowers, 256);
        if (statStars) animateCounter(statStars, 89);
        if (statHours) animateCounter(statHours, 420, '+');
    }, 1000);

    // ============================================================
    // 10. KEYBOARD SHORTCUT
    // ============================================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 's' || e.key === 'S') {
            if (fabMain) fabMain.click();
        }
    });

    // ============================================================
    // 11. CONSOLE EASTER EGG
    // ============================================================
    console.log('%c YANZ PORTFOLIO PRO ', 'font-size:24px; font-weight:bold; color:#00f0ff;');
    console.log('%c developer masa depan | SMP | cita-cita programer ', 'font-size:14px; color:#f7d875;');
    console.log('%c Cyber Security | Black Hack ', 'font-size:14px; color:#ff4444;');
    console.log('%c "kode adalah puisi, dan aku penyairnya." ', 'font-size:14px; color:#94a3b8; font-style:italic;');
    console.log(' Shortcut: S = buka sosial media');
    console.log(' Portofolio Yanz siap digunakan!');

})();