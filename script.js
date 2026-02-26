// Simple script - only essential functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav-content');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuBtn.setAttribute('aria-label', 'Toggle menu');
            
            // Insert button before nav links
            nav.insertBefore(menuBtn, navLinks);
            
            // Toggle menu on click
            menuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navLinks.classList.toggle('active');
                // Change icon
                const icon = this.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    icon.className = 'fas fa-bars';
                }
            });
            
            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    icon.className = 'fas fa-bars';
                });
            });
        }
    };
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                // Adjust offset for mobile
                const offset = window.innerWidth <= 768 ? 60 : 80;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Basic form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            let firstInvalid = null;
            
            requiredFields.forEach(field => {
                if(!field.value.trim()) {
                    field.style.borderColor = '#ff4444';
                    isValid = false;
                    if (!firstInvalid) firstInvalid = field;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if(!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields marked with *');
                if (firstInvalid) {
                    firstInvalid.focus();
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        
        // Clear red border on input
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    });
    
    // Back to top button
    let backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.innerHTML = '↑';
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTop);
    }
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if(window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu if window is resized to desktop size
            if (window.innerWidth > 768) {
                const navLinks = document.querySelector('.nav-links');
                const menuBtn = document.querySelector('.mobile-menu-btn i');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuBtn) menuBtn.className = 'fas fa-bars';
                }
            }
        }, 250);
    });
    
    // Add touch-friendly improvements for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.btn, .product-card, .nav-links a').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            });
            element.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
    }
});