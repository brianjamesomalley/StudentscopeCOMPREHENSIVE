// Read rewards from localStorage and render them
(function(){
    const STORAGE_KEY = 'studentScopeRewards';

    // Sample rewards template (will mark earned based on stored badges)
    const sampleRewards = [
        { name: "Math Star", emoji: "🔢" },
        { name: "Reading Champ", emoji: "📚" },
        { name: "Helper Award", emoji: "🤝" },
        { name: "Focus Master", emoji: "🎯" }
    ];

    function getStored() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            console.error('Failed to parse rewards from localStorage', e);
            return null;
        }
    }

    function render(data) {
        const urlParams = new URLSearchParams(window.location.search);
        const forcedName = urlParams.get('name');

        const name = forcedName || (data && data.name) || 'Super Student';
        document.getElementById('studentName').textContent = name;

        const points = (data && data.points) || 0;
        document.getElementById('points').textContent = points + ' Points';

        const badgesDiv = document.getElementById('badges');
        badgesDiv.innerHTML = '';

        // If stored badges exist, show them as earned
        const storedBadges = (data && data.badges) || [];

        // Show stored badges first
        if (storedBadges.length) {
            storedBadges.forEach(b => {
                const badge = document.createElement('div');
                badge.style.cssText = `
                    background: gold;
                    padding: 15px;
                    margin: 10px;
                    border-radius: 10px;
                    display: inline-block;
                `;
                badge.innerHTML = `<div style="font-size:24px;">🏆</div><div>${b}</div><div>✅ EARNED!</div>`;
                badgesDiv.appendChild(badge);
            });
        }

        // Then show sample rewards, marking earned if they match stored names
        sampleRewards.forEach(reward => {
            const earned = storedBadges.includes(reward.name);
            const badge = document.createElement('div');
            badge.style.cssText = `
                background: ${earned ? 'gold' : 'gray'};
                padding: 15px;
                margin: 10px;
                border-radius: 10px;
                display: inline-block;
                opacity: ${earned ? '1' : '0.5'};
            `;
            badge.innerHTML = `
                <div style="font-size:30px;">${reward.emoji}</div>
                <div>${reward.name}</div>
                <div>${earned ? '✅ EARNED!' : '🔒 Locked'}</div>
            `;
            badgesDiv.appendChild(badge);
        });

        // Update points display again (in case)
        document.getElementById('points').textContent = points + ' Points';

        // Celebration if the student has any points
        if (points > 0) {
            celebrate();
        }
    }

    // Initial render
    render(getStored());

    // React to storage events so another tab (main app) can update this view
    window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY) {
            render(getStored());
        }
    });

    // Poll as a fallback in case storage events don't fire
    setInterval(() => render(getStored()), 3000);

    // ---------------- Celebration code (from user's JS) ----------------
    function celebrate() {
        for (let i = 0; i < 12; i++) createStar();
        try {
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
            audio.volume = 0.25;
            audio.play().catch(() => {});
        } catch (e) {
            console.log('Sound not playing - okay.');
        }
    }

    function createStar() {
        const star = document.createElement('div');
        star.textContent = '⭐';
        star.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 30 + 20}px;
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
            z-index: 1000;
        `;
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 5000);
    }

    // Add CSS for falling animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

})();
