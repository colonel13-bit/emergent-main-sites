/* ============================================
   MARKETING SITE JAVASCRIPT
   Form handling and interactions
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /* ============================================
       CONTACT FORM HANDLING
       ============================================ */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // In production, send to your backend API
            // For now, we'll just log and show success
            console.log('Contact form submitted:', data);
            
            // Simulate API call
            submitContactForm(data)
                .then(response => {
                    showNotification('Thank you! We\'ll be in touch soon.', 'success');
                    contactForm.reset();
                })
                .catch(error => {
                    showNotification('Sorry, something went wrong. Please try again.', 'error');
                    console.error('Form submission error:', error);
                });
        });
    }
    
    /* ============================================
       NEWSLETTER FORM HANDLING
       ============================================ */
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(newsletterForm);
            const email = formData.get('email');
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // In production, send to your email service provider
            console.log('Newsletter signup:', email);
            
            // Simulate API call
            submitNewsletter(email)
                .then(response => {
                    showNotification('You\'re subscribed! Check your inbox.', 'success');
                    newsletterForm.reset();
                })
                .catch(error => {
                    showNotification('Sorry, something went wrong. Please try again.', 'error');
                    console.error('Newsletter submission error:', error);
                });
        });
    }
    
    /* ============================================
       SMOOTH SCROLLING FOR ANCHOR LINKS
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for href="#" links
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80; // Adjust if you add a fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

/* ============================================
   HELPER FUNCTIONS
   ============================================ */

/**
 * Submit contact form to backend API
 * @param {Object} data - Form data
 * @returns {Promise}
 */
function submitContactForm(data) {
    // Replace with your actual API endpoint
    // Example using fetch:
    /*
    return fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
    */
    
    // Simulated API call for demo
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success
            resolve({ success: true, message: 'Form submitted successfully' });
            
            // Simulate error: reject({ error: 'Something went wrong' });
        }, 1000);
    });
}

/**
 * Submit newsletter signup to email service
 * @param {string} email - Email address
 * @returns {Promise}
 */
function submitNewsletter(email) {
    // Replace with your email service provider API
    // Examples: Mailchimp, ConvertKit, SendGrid, etc.
    /*
    return fetch('/api/newsletter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    }).then(response => response.json());
    */
    
    // Simulated API call for demo
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ success: true, message: 'Subscribed successfully' });
        }, 1000);
    });
}

/**
 * Show notification to user
 * @param {string} message - Notification message
 * @param {string} type - 'success' or 'error'
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        backgroundColor: type === 'success' ? '#2596be' : '#e28743',
        color: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: '10000',
        maxWidth: '400px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
        animation: 'slideIn 0.3s ease-out'
    });
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Append to body
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

/* ============================================
   LAZY LOADING IMAGES (Optional Enhancement)
   ============================================ */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
