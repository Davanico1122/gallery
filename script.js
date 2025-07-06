document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Header animation
    gsap.from('.header h1', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    gsap.from('.header p', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
    });

    // Gallery item animations
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 30%',
                scrub: 0.5,
                toggleActions: 'play none none reverse'
            },
            delay: index * 0.15
        });
    });

    // Hover effect
    gsap.utils.toArray('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('img'), {
                transform: 'translateZ(30px) rotateX(-5deg)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('img'), {
                transform: 'translateZ(0) rotateX(0)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // Responsive adjustments
    function adjustAnimations() {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
            if (window.innerWidth <= 768) {
                trigger.start = 'top 90%';
            } else {
                trigger.start = 'top 85%';
            }
            trigger.refresh();
        });
    }

    window.addEventListener('resize', adjustAnimations);
    adjustAnimations();
});
