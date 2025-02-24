document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap carousel if Bootstrap is used
    if (typeof bootstrap !== 'undefined') {
        var carouselElement = document.getElementById('bannerCarousel');
        var carousel = new bootstrap.Carousel(carouselElement, {
            interval: 5000,
            wrap: true
        });
    }

    // If not using Bootstrap, implement a simple carousel
    else {
        setupSimpleCarousel();
    }

    // Setup countdown timer for flash sale
    setupCountdown();
});

function setupSimpleCarousel() {
    const carousel = document.getElementById('bannerCarousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-control-prev');
    const nextBtn = carousel.querySelector('.carousel-control-next');
    
    let currentSlide = 0;
    const slideCount = items.length;
    
    // Show first slide
    items[0].classList.add('active');
    
    // Set interval for automatic sliding
    const slideInterval = setInterval(nextSlide, 5000);
    
    // Next slide function
    function nextSlide() {
        items[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slideCount;
        items[currentSlide].classList.add('active');
    }
    
    // Previous slide function
    function prevSlide() {
        items[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        items[currentSlide].classList.add('active');
    }
    
    // Button event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearInterval(slideInterval);
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearInterval(slideInterval);
            nextSlide();
        });
    }
}

function setupCountdown() {
    // Set the countdown target time (e.g., 24 hours from now)
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(targetTime.getHours() + 24);
    
    // Get countdown elements
    const countdownBoxes = document.querySelectorAll('.countdown-box');
    
    if (countdownBoxes.length >= 3) {
        // Update countdown every second
        const countdownInterval = setInterval(function() {
            const currentTime = new Date();
            const diff = targetTime - currentTime;
            
            // If countdown is finished
            if (diff <= 0) {
                clearInterval(countdownInterval);
                countdownBoxes.forEach(box => {
                    box.textContent = '00';
                });
                return;
            }
            
            // Calculate hours, minutes, seconds
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Update countdown display
            countdownBoxes[0].textContent = hours.toString().padStart(2, '0');
            countdownBoxes[1].textContent = minutes.toString().padStart(2, '0');
            countdownBoxes[2].textContent = seconds.toString().padStart(2, '0');
        }, 1000);
        
        // Initial update
        countdownInterval();
    }
}

// Handle category click events
document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', function(e) {
        // For top navigation categories
        if (this.parentElement.classList.contains('categories-wrapper')) {
            document.querySelectorAll('.categories-wrapper .category-item').forEach(el => {
                el.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Handle tab click events
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.tab').forEach(el => {
            el.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imgObserver.observe(img);
    });
}