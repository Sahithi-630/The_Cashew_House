/* ==========================================================================
   THE CASHEW HUB - PREMIUM INTERACTIVE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. HEADER SCROLL EFFECT
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once initially

    // 2. PRODUCT SELECTOR AUTO-FILL & SCROLL
    const selectButtons = document.querySelectorAll('.select-product-btn');
    const productSelect = document.getElementById('order-product');
    const nameInput = document.getElementById('order-name');

    selectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get selected product name
            const product = button.getAttribute('data-product');
            
            if (productSelect && product) {
                // Set value in form dropdown
                productSelect.value = product;
                
                // Smooth scroll to the form section
                const targetId = button.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                // Focus the name input to guide user
                setTimeout(() => {
                    nameInput.focus();
                }, 800);
            }
        });
    });

    // 3. WHATSAPP QUOTE FORM GENERATOR
    const form = document.getElementById('whatsapp-quote-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Extract Form Values
            const name = document.getElementById('order-name').value.trim();
            const product = document.getElementById('order-product').value;
            const qty = document.getElementById('order-qty').value;
            const notes = document.getElementById('order-notes').value.trim();
            
            // Your Business WhatsApp Number (format: countrycode + number, e.g. 916301884617)
            // Replace with your actual number when launching
            const businessNumber = "916301884617"; 
            
            // Format WhatsApp Message with Emojis & Bold text
            let message = `*NEW CASHEW INQUIRY* 🌿\n`;
            message += `=========================\n\n`;
            message += `👤 *Customer Name:* ${name}\n`;
            message += `📦 *Cashew Variety:* ${product}\n`;
            message += `⚖️ *Preferred Qty:* ${qty}\n`;
            
            if (notes) {
                message += `📝 *Custom Request:* ${notes}\n`;
            }
            
            message += `\n=========================\n`;
            message += `_Sent via The Cashew House Web Portfolio_`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Construct API Link
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${businessNumber}&text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    // 4. SCROLL FADE-IN ANIMATIONS
    const fadeElements = document.querySelectorAll('.promise-card, .product-card, .chat-mockup, .gallery-item, .timeline-item, .interactive-form-card');
    
    // Add CSS initial state class
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                observer.unobserve(el); // Only animate once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => {
        elementObserver.observe(el);
    });

    // 5. MOUSE INTERACTION PHYSICS FOR CASHEW BOWL
    const visualCard = document.querySelector('.visual-card');
    const cashews = document.querySelectorAll('.cashew');

    if (visualCard) {
        visualCard.addEventListener('mousemove', (e) => {
            const rect = visualCard.getBoundingClientRect();
            // Calculate mouse coordinates relative to card center (-1 to 1)
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

            // Tilt card slightly
            visualCard.style.transform = `rotate(${x * 3}deg) translateY(${y * -5}px)`;

            // Shift cashews slightly relative to their original position
            cashews.forEach((cashew, index) => {
                const shiftFactor = (index + 1) * 3; // Different speeds
                cashew.style.transform += ` translate(${x * shiftFactor}px, ${y * shiftFactor}px)`;
            });
        });

        visualCard.addEventListener('mouseleave', () => {
            // Restore original state
            visualCard.style.transform = 'rotate(2deg) translateY(0)';
            cashews.forEach((cashew) => {
                cashew.style.transform = '';
            });
        });
    }
});
