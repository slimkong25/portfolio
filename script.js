document.addEventListener('DOMContentLoaded', () => {

    // --- Scrolled Navbar Effect ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // --- Scroll Reveal Animations & Active Nav Link ---
    const setRevealVariables = () => {
        const reveals = document.querySelectorAll('.reveal');

        // Setup observer for reveals
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Add delay based on CSS variable if present
                    if (entry.target.style.getPropertyValue('--delay')) {
                        const delayStr = entry.target.style.getPropertyValue('--delay');
                        const delayInt = parseInt(delayStr);
                        entry.target.style.transitionDelay = `${delayInt * 0.1}s`;
                    }
                    observer.unobserve(entry.target); // Unobserve to animate only once
                }
            });
        }, {
            threshold: 0.15, // trigger when 15% of element is visible
            rootMargin: "0px 0px -50px 0px"
        });

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });
    };

    setRevealVariables();

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // --- Background Particles Generator ---
    const particlesContainer = document.getElementById('particles');
    const createParticles = () => {
        const particleCount = 30; // Adjust number of particles

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random properties
            const size = Math.random() * 4 + 1; // 1px to 5px
            const posX = Math.random() * 100; // 0% to 100%
            const posY = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 20 + 10; // 10s to 30s
            const delay = Math.random() * 10; // 0s to 10s

            // Style particle
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = 'rgba(99, 102, 241, 0.4)';
            particle.style.borderRadius = '50%';
            particle.style.top = `${posY}%`;
            particle.style.left = `${posX}%`;
            particle.style.boxShadow = `0 0 ${size * 2}px rgba(99, 102, 241, 0.8)`;

            // Animation
            const moveX = (Math.random() * 100 - 50) + 'px';
            particle.style.setProperty('--move-x', moveX);
            particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;

            particlesContainer.appendChild(particle);
        }
    };

    // Check if particles container exists
    if (particlesContainer) {
        createParticles();
    }

    // Add particle keyframes dynamically
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes floatParticle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(var(--move-x)); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);


    // --- Form Submit Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            // Animate button
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.style.opacity = '0.8';
            submitBtn.style.pointerEvents = 'none';

            // Simulate network request
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                submitBtn.style.background = 'linear-gradient(90deg, #10b981, #059669)';

                // Reset form
                contactForm.reset();

                // Revert button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'all';
                }, 3000);

            }, 1500);
        });
    }

    // --- Scroll Progress Bar ---
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }
    });

    // --- Vanilla Tilt Initialization ---
    // Initialize VanillaTilt if available on project cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 12,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });

        // Also add subtle tilt to skill and cert cards
        VanillaTilt.init(document.querySelectorAll(".glass-card, .cert-card"), {
            max: 8,
            speed: 300,
            glare: true,
            "max-glare": 0.1,
        });
    }
});
