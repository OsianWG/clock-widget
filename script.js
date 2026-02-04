function updateClock() {
    const now = new Date();
    const params = new URLSearchParams(window.location.search);

    // 1. Define the Data
    const data = {
        day: now.toLocaleDateString('en-US', { weekday: 'short' }),
        date: now.getDate().toString().padStart(2, '0'),
        month: now.toLocaleDateString('en-US', { month: 'short' }),
        year: now.getFullYear(),
        hours: (now.getHours() % 12 || 12).toString().padStart(2, '0'),
        minutes: now.getMinutes().toString().padStart(2, '0'),
        seconds: now.getSeconds().toString().padStart(2, '0'),
        ampm: now.getHours() >= 12 ? 'PM' : 'AM'
    };

    // 2. Inject into HTML and check URL parameters to hide
    for (const key in data) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = data[key];
            
            // If the URL has ?hideHours=1, it adds the .hidden class
            if (params.has('hide' + key.charAt(0).toUpperCase() + key.slice(1))) {
                element.classList.add('hidden');
                
                // Special logic to hide colons if minutes/seconds are hidden
                if (key === 'minutes') document.getElementById('sep1').classList.add('hidden');
                if (key === 'seconds') document.getElementById('sep2').classList.add('hidden');
            }
        }
    }
}

// Run every 1000ms (1 second)
setInterval(updateClock, 1000);
updateClock();