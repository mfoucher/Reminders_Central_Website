// Theme Toggle Functionality
(function() {
    const THEME_STORAGE_KEY = 'reminders-central-theme';
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const nav = document.querySelector('.nav');

    // Get CSS variable values for nav background
    const getNavBg = () => {
        return getComputedStyle(document.documentElement).getPropertyValue('--nav-bg').trim();
    };

    const getNavBgScrolled = () => {
        return getComputedStyle(document.documentElement).getPropertyValue('--nav-bg-scrolled').trim();
    };

    // Get saved theme or detect system preference
    function getInitialTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
            return savedTheme;
        }
        // If no saved preference, use system preference
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    // Apply theme
    function setTheme(theme) {
        if (theme === 'light') {
            html.setAttribute('data-theme', 'light');
            if (themeToggle) themeToggle.checked = true;
        } else {
            html.setAttribute('data-theme', 'dark');
            if (themeToggle) themeToggle.checked = false;
        }
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        
        // Update nav background
        if (nav) {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                nav.style.backgroundColor = getNavBgScrolled();
            } else {
                nav.style.backgroundColor = getNavBg();
            }
        }
    }

    // Initialize theme on page load
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);

    // Handle toggle click
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Listen for system theme changes (only if no manual preference is set)
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        // Only apply system preference if user hasn't manually set a preference
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            setTheme(e.matches ? 'light' : 'dark');
        }
    });
})();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navigation
let lastScroll = 0;
const nav = document.querySelector('.nav');

// Get CSS variable values for nav background
const getNavBg = () => {
    return getComputedStyle(document.documentElement).getPropertyValue('--nav-bg').trim();
};

const getNavBgScrolled = () => {
    return getComputedStyle(document.documentElement).getPropertyValue('--nav-bg-scrolled').trim();
};

// Initialize nav background on page load
if (nav) {
    nav.style.backgroundColor = getNavBg();
}

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.backgroundColor = getNavBgScrolled();
    } else {
        nav.style.backgroundColor = getNavBg();
    }
    
    lastScroll = currentScroll;
});

// Update nav background on theme change (handled in theme toggle section above)

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and integration cards
document.querySelectorAll('.feature-card, .integration-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Add hover effect to CTA buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.2s ease';
    });
});

