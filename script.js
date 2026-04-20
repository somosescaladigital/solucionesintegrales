// Script para Soluciones Integrales BA

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mobileIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle icon between bars and times
        if (navLinks.classList.contains('active')) {
            mobileIcon.classList.remove('fa-bars');
            mobileIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
        } else {
            mobileIcon.classList.remove('fa-times');
            mobileIcon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileIcon.classList.remove('fa-times');
            mobileIcon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal (Simple Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply scroll reveal classes (excluding gallery items to avoid slider conflicts)
    document.querySelectorAll('.service-card, .presentation-image, .presentation-content').forEach(el => {
        observer.observe(el);
    });

    // Swiper Initialization
    console.log("Iniciando Swiper...");
    const swiper = new Swiper('.gallery-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        observer: true, 
        observeParents: true,
        watchOverflow: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });
    console.log("Swiper inicializado:", swiper);

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Use event delegation for gallery items (handles Swiper clones)
    document.querySelector('.gallery-slider').addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const img = galleryItem.querySelector('img');
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = '';
            document.body.style.overflow = 'hidden';
        }
    });

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
    };

    lightboxClose.addEventListener('click', closeLightbox);

    // Close on click outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Esc key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });

    // Helper for scroll reveal
    // The CSS handles the transition when the .visible class is added by the observer
});
