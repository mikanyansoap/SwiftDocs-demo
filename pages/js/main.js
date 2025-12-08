// 1. MOBILE MENU TOGGLE
function toggleMenu() {
    const nav = document.querySelector('nav ul.nav-links');
    nav.classList.toggle('active');
}

// 2. LOADING SCREEN LOGIC
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    const body = document.body;
    
    if (loader) {
        // Fade out
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Remove 'loading' class to re-enable scrolling
        body.classList.remove('loading');
        
        // Optional: Remove from DOM after transition
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

function darkmode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');

    // Update the toggle icon (expects <button class="darkmode-icon"><i class="fa ..."></i></button>)
    const icon = document.querySelector('.darkmode-icon i');
    if (icon) {
        icon.classList.toggle('fa-sun', isDark);
        icon.classList.toggle('fa-moon', !isDark);
    }

    // Update logo if present
    const logo = document.querySelector('.logo_name');
    if (logo && logo.tagName.toLowerCase() === 'img') {
        logo.src = isDark ? 'images/DM_N.png' : 'images/LM_N.png';
    }

    // Persist preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme on load (apply stored preference or system preference)
document.addEventListener('DOMContentLoaded', () => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = stored === 'dark' || (!stored && prefersDark);
    if (shouldDark) {
        document.documentElement.classList.add('dark');

        const icon = document.querySelector('.darkmode-icon i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        const logo = document.querySelector('.logo_name');
        if (logo && logo.tagName.toLowerCase() === 'img') logo.src = 'images/DM_N.png';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.num-val');
    const options = {
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                startCounting(target);
                observer.unobserve(target); 
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));

    function startCounting(counter) {
        const targetValue = +counter.getAttribute('num');
        
        const duration = 1000; 
        const delay = duration / targetValue; 

        let currentData = 0;

        const animate = () => {
            if (currentData < targetValue) {
                currentData++;
                counter.innerText = currentData;
                setTimeout(animate, delay);
            } else {
                counter.innerText = targetValue;
            }
        };

        animate();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    const SCROLL_DURATION = 1500; 
    const SCROLL_THROTTLE = 1200; 
    
    let isScrolling = false;
    let lastScrollTime = 0;
    let currentSectionIndex = 0;
    
    const sections = [
        document.querySelector('.header'),
        document.querySelector('#about'),
        document.querySelector('#services'),
        document.querySelector('#whyUs'),
        document.querySelector('#contact'),
        document.querySelector('#footer')
    ].filter(Boolean); 

    if (sections.length === 0) return;

    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY || window.pageYOffset;
        const distance = targetY - startY;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Easing Function: EaseInOutExpo (The "Luxury" Curve)
            // This creates that soft, gliding stop.
            const ease = progress === 1 ? 1 : 
                         progress < 0.5 ? Math.pow(2, 20 * progress - 10) / 2 : 
                         (2 - Math.pow(2, -20 * progress + 10)) / 2;

            window.scrollTo(0, startY + (distance * ease));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                isScrolling = false; // Release the lock
            }
        }

        requestAnimationFrame(animation);
    }

    // 4. HANDLE THE WHEEL (THE SNAPPING LOGIC) - UPDATED
    // 4. SMART SNAPPING LOGIC (Handles Long Sections)
    window.addEventListener('wheel', (e) => {
        // If we are currently animating, ignore input
        if (isScrolling) {
            e.preventDefault();
            return;
        }

        const now = Date.now();
        // Allow rapid small movements, but throttle big snaps
        if (now - lastScrollTime < 100) return;

        const currentSection = sections[currentSectionIndex];
        const rect = currentSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if this section is taller than the screen
        const isLongSection = rect.height > windowHeight;

        const isGoingDown = e.deltaY > 0;
        const isGoingUp = e.deltaY < 0;

        // --- LONG SECTION LOGIC ---
        if (isLongSection) {
            // 1. If scrolling DOWN...
            if (isGoingDown) {
                // If the bottom of the section is still below the screen...
                // (We use a buffer of 5px to be safe)
                if (rect.bottom > windowHeight + 5) {
                    // ALLOW native scrolling (Exit function)
                    return; 
                }
                // If we reached the bottom, we allow the snap to proceed below
            }

            // 2. If scrolling UP...
            if (isGoingUp) {
                // If the top of the section is still above the screen...
                if (rect.top < -5) {
                    // ALLOW native scrolling (Exit function)
                    return; 
                }
                // If we reached the top, we allow the snap to proceed below
            }
        }

        // --- SNAPPING EXECUTION ---
        // If we get here, it means we are either:
        // A) Inside a short section (fit to screen)
        // B) At the edge of a long section and trying to leave it
        
        e.preventDefault(); // Stop native scroll
        
        if (now - lastScrollTime < SCROLL_THROTTLE) return;

        const direction = e.deltaY > 0 ? 1 : -1;
        let nextIndex = currentSectionIndex + direction;

        // Safety clamps
        if (nextIndex < 0) nextIndex = 0;
        if (nextIndex >= sections.length) nextIndex = sections.length - 1;

        if (nextIndex !== currentSectionIndex) {
            isScrolling = true;
            lastScrollTime = now;
            currentSectionIndex = nextIndex;
            
            const nextSection = sections[nextIndex];
            // Calculate target position
            // For long sections, we might snap to top; for short, center/top.
            const targetTop = nextSection.getBoundingClientRect().top + window.scrollY;
            
            smoothScrollTo(targetTop, SCROLL_DURATION);
        }
    }, { passive: false });

    function goToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // 1. Sync the Snapping Logic
            // We find which section number this is, so the mouse wheel knows where we are
            const index = sections.findIndex(section => section === targetSection);
            
            if (index !== -1) {
                currentSectionIndex = index; // Update the global index
                
                // 2. Trigger your Luxury Scroll
                const targetTop = targetSection.getBoundingClientRect().top + window.scrollY;
                smoothScrollTo(targetTop, SCROLL_DURATION);
            }
        }
    }

    // REQUIRED: This makes the function available to your HTML 'onclick'
    window.goToSection = goToSection;

    window.addEventListener('keydown', (e) => {
        if (isScrolling) return;
        
        let nextIndex = currentSectionIndex;
        if (e.key === 'ArrowDown') nextIndex++;
        if (e.key === 'ArrowUp') nextIndex--;

        if (nextIndex < 0) nextIndex = 0;
        if (nextIndex >= sections.length) nextIndex = sections.length - 1;

        if (nextIndex !== currentSectionIndex) {
            e.preventDefault();
            isScrolling = true;
            currentSectionIndex = nextIndex;
            const nextSection = sections[nextIndex];
            const targetTop = nextSection.getBoundingClientRect().top + window.scrollY;
            smoothScrollTo(targetTop, SCROLL_DURATION);
        }
    });
});

// Ensure darkmode icon animations behave predictably across pointer types
;(function(){
    const icon = document.querySelector('.darkmode-icon');
    if (!icon) return;

    const pauseAnimation = () => {
        icon.style.animation = 'none';
    };
    const resumeAnimation = () => {
        // Force reflow to restart animation when needed
        icon.style.animation = '';
        void icon.offsetWidth;
    };

    icon.addEventListener('mousedown', pauseAnimation);
    icon.addEventListener('touchstart', pauseAnimation, {passive: true});
    icon.addEventListener('mouseup', resumeAnimation);
    icon.addEventListener('mouseleave', resumeAnimation);
    icon.addEventListener('touchend', resumeAnimation);
    icon.addEventListener('blur', resumeAnimation);
})();

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Create the Observer
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the item is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that triggers the CSS transition
                entry.target.classList.add('in-view');
                
                // Optional: Stop watching once animated (run only once)
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // 2. Helper function to observe all animate-on-scroll elements
    const observeAnimatedElements = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.in-view)');
        animatedElements.forEach((el) => scrollObserver.observe(el));
    };

    // 3. Initial scan on DOMContentLoaded
    observeAnimatedElements();

    // 4. Re-scan after a short delay to catch dynamically added elements (e.g., from services.js)
    setTimeout(observeAnimatedElements, 150);
    
});