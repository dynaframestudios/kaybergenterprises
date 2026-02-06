// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Top Contact Button
    const topContactBtn = document.getElementById('topContactBtn');
    if (topContactBtn) {
        topContactBtn.addEventListener('click', function() {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Reset previous error styles
            [name, email, message].forEach(field => {
                field.style.borderColor = '#ddd';
            });
            
            // Validate name
            if (!name.value.trim()) {
                name.style.borderColor = 'red';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                email.style.borderColor = 'red';
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                message.style.borderColor = 'red';
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
                return;
            }
            
            // If using FormSubmit, you can add additional handling here
            // For demo purposes, we'll show a success message
            // In a real implementation, remove this and let FormSubmit handle it
            e.preventDefault();
            showFormSuccess();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open (for future mobile implementation)
                const navbar = document.querySelector('.navbar');
                if (navbar && window.innerWidth <= 768) {
                    // For future mobile menu implementation
                }
            }
        });
    });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.product-icon i');
            if (icon) {
                icon.style.transform = 'rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.product-icon i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Form success message function
    function showFormSuccess() {
        const form = document.getElementById('contactForm');
        const originalHTML = form.innerHTML;
        
        form.innerHTML = `
            <div class="form-success" style="text-align: center; padding: 40px 20px;">
                <div style="width: 80px; height: 80px; background-color: #d4edda; color: #155724; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 2rem;">
                    <i class="fas fa-check"></i>
                </div>
                <h3 style="color: var(--navy-blue); margin-bottom: 15px;">Message Sent Successfully!</h3>
                <p style="color: #666; margin-bottom: 25px;">Thank you for contacting Industrial Gases Co. We'll respond to your inquiry within 24 hours.</p>
                <button id="sendAnother" class="btn btn-primary">Send Another Message</button>
            </div>
        `;
        
        document.getElementById('sendAnother').addEventListener('click', function() {
            form.innerHTML = originalHTML;
            // Re-attach form event listeners
            const newForm = document.getElementById('contactForm');
            newForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showFormSuccess();
            });
        });
    }
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll('.product-card, .section-header, .contact-info, .contact-form');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});