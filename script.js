// Simple student reward app
document.addEventListener('DOMContentLoaded', function() {
    // Get student name from URL (simple version)
    const urlParams = new URLSearchParams(window.location.search);
    const studentName = urlParams.get('name') || 'Super Student';
    document.getElementById('studentName').textContent = studentName;
    
    // Sample rewards data
    const rewards = [
        { name: "Math Star", emoji: "🔢", earned: true },
        { name: "Reading Champ", emoji: "📚", earned: true },
        { name: "Helper Award", emoji: "🤝", earned: false },
        { name: "Focus Master", emoji: "🎯", earned: true }
    ];
    
    // Display rewards
    const badgesDiv = document.getElementById('badges');
    rewards.forEach(reward => {
        const badge = document.createElement('div');
        badge.style.cssText = `
            background: ${reward.earned ? 'gold' : 'gray'};
            padding: 15px;
            margin: 10px;
            border-radius: 10px;
            display: inline-block;
            opacity: ${reward.earned ? '1' : '0.5'};
        `;
        badge.innerHTML = `
            <div style="font-size: 30px;">${reward.emoji}</div>
            <div>${reward.name}</div>
            <div>${reward.earned ? '✅ EARNED!' : '🔒 Locked'}</div>
        `;
        badgesDiv.appendChild(badge);
    });
    
    // Add some points (example)
    let points = 150;
    document.getElementById('points').textContent = points + " Points";
    
    // Celebrate when page loads
    celebrate();
});

// Simple celebration function
function celebrate() {
    // Add floating stars
    for(let i = 0; i < 20; i++) {
        createStar();
    }
    
    // Play sound (if allowed)
    try {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
        audio.volume = 0.3;
        audio.play();
    } catch(e) {
        console.log("Sound not playing - that's okay!");
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
    
    // Remove after animation
    setTimeout(() => star.remove(), 5000);
}

// Add CSS for falling animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);// Paste your JavaScript code here
