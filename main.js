document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Animasi header
    gsap.from('.header h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.header p', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.nav a', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Animasi galeri item
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            z: 0,
            rotateY: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1,
                toggleActions: 'play none none reverse'
            },
            delay: index * 0.2
        });
    });

    // Efek hover interaktif
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('img'), {
                scale: 1.05,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('img'), {
                scale: 1,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
    });

    // Animasi tambahan untuk about section
    gsap.from('.about h2', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.about p', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    // Animasi untuk contact section
    gsap.from('.contact h2', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.contact form', {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    // Fungsi untuk parallax background
    function updateParallax() {
        const scrollPos = window.scrollY;
        document.body.style.backgroundPositionY = `${scrollPos * 0.2}px`;
    }
    window.addEventListener('scroll', updateParallax);

    // Kontrol animasi manual
    let isAnimating = false;
    const toggleAnimation = document.createElement('button');
    toggleAnimation.textContent = 'Toggle Animation';
    toggleAnimation.style.position = 'fixed';
    toggleAnimation.style.top = '10px';
    toggleAnimation.style.right = '10px';
    toggleAnimation.style.padding = '10px';
    toggleAnimation.style.background = '#ffd700';
    toggleAnimation.style.border = 'none';
    toggleAnimation.style.cursor = 'pointer';
    document.body.appendChild(toggleAnimation);

    toggleAnimation.addEventListener('click', () => {
        if (!isAnimating) {
            gsap.to('.gallery-item img', {
                rotateY: '+=360',
                duration: 2,
                stagger: 0.1,
                ease: 'power2.inOut'
            });
            isAnimating = true;
        } else {
            gsap.killTweensOf('.gallery-item img');
            isAnimating = false;
        }
    });

    // Efek scroll tambahan
    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top 50%',
        end: 'bottom 20%',
        onEnter: () => gsap.to('.gallery-item', { scale: 1.1, duration: 0.5 }),
        onLeave: () => gsap.to('.gallery-item', { scale: 1, duration: 0.5 }),
        onEnterBack: () => gsap.to('.gallery-item', { scale: 1.1, duration: 0.5 }),
        onLeaveBack: () => gsap.to('.gallery-item', { scale: 1, duration: 0.5 })
    });

    // Fungsi untuk deteksi klik pada item
    items.forEach(item => {
        item.addEventListener('click', () => {
            gsap.to(item, {
                z: 50,
                rotateY: 360,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => gsap.to(item, { z: 0, rotateY: 0, duration: 0.5 })
            });
        });
    });

    // Animasi footer
    gsap.from('footer', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Fungsi untuk auto-rotate item
    function autoRotate() {
        gsap.to('.gallery-item img', {
            rotateY: '+=90',
            duration: 5,
            ease: 'none',
            repeat: -1,
            modifier: { x: 0, y: 0 }
        });
    }
    autoRotate();

    // Tambahkan logika untuk menghentikan animasi saat mouse over
    items.forEach(item => {
        item.addEventListener('mouseover', () => {
            gsap.to(item.querySelector('img'), { rotationY: '+=0', duration: 0.1 });
        });
        item.addEventListener('mouseout', () => {
            gsap.to(item.querySelector('img'), { rotationY: '+=90', duration: 5, ease: 'none', repeat: -1 });
        });
    });

    // Efek tambahan untuk transisi halus
    gsap.set('.gallery-item', { transformPerspective: 600 });

    // Fungsi untuk resize window
    function handleResize() {
        gsap.set('.gallery-item', { clearProps: 'all' });
        gsap.from('.gallery-item', {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }
    window.addEventListener('resize', handleResize);

    // Tambahkan efek scroll progresif
    let progress = 0;
    window.addEventListener('scroll', () => {
        progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        gsap.to('.header', {
            backgroundColor: `rgba(0, 0, 0, ${0.7 + progress * 0.3})`,
            duration: 0.3
        });
    });

    // Animasi tambahan untuk caption
    gsap.from('.gallery-item .caption', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.gallery-item',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Fungsi untuk toggle dark mode
    const toggleDarkMode = document.createElement('button');
    toggleDarkMode.textContent = 'Toggle Dark Mode';
    toggleDarkMode.style.position = 'fixed';
    toggleDarkMode.style.top = '40px';
    toggleDarkMode.style.right = '10px';
    toggleDarkMode.style.padding = '10px';
    toggleDarkMode.style.background = '#ffd700';
    toggleDarkMode.style.border = 'none';
    toggleDarkMode.style.cursor = 'pointer';
    document.body.appendChild(toggleDarkMode);

    let isDarkMode = false;
    toggleDarkMode.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.style.background = isDarkMode ? 'linear-gradient(135deg, #000, #1a0033)' : 'linear-gradient(135deg, #1a0033, #330066)';
        gsap.to('.gallery-item img', {
            filter: isDarkMode ? 'brightness(0.8)' : 'brightness(1)',
            duration: 0.5
        });
    });

    // Efek tambahan untuk hover scale
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            gsap.to(item.querySelector('img'), {
                x: (mouseX - rect.width / 2) / 10,
                y: (mouseY - rect.height / 2) / 10,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('img'), { x: 0, y: 0, duration: 0.3 });
        });
    });

    // Animasi tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 20%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery-item', { opacity: 0.5, duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery-item', { opacity: 1, duration: 1 })
    });

    // Fungsi untuk preload gambar
    function preloadImages() {
        const images = document.querySelectorAll('.gallery-item img');
        images.forEach(img => {
            const src = img.src;
            const tempImg = new Image();
            tempImg.src = src;
        });
    }
    preloadImages();

    // Tambahkan logika untuk animasi berulang
    function repeatAnimation() {
        gsap.to('.gallery-item', {
            scale: 1.1,
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'power1.inOut'
        });
    }
    repeatAnimation();

    // Efek tambahan untuk transisi halus
    gsap.set('.gallery', { autoAlpha: 1 });

    // Fungsi untuk deteksi scroll ke atas
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll) {
            gsap.to('.header', { y: '-50px', duration: 0.3 });
        } else {
            gsap.to('.header', { y: '0px', duration: 0.3 });
        }
        lastScroll = currentScroll;
    });

    // Animasi tambahan untuk form input
    const inputs = document.querySelectorAll('.contact input, .contact textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, { scale: 1.05, duration: 0.3 });
        });
        input.addEventListener('blur', () => {
            gsap.to(input, { scale: 1, duration: 0.3 });
        });
    });

    // Fungsi untuk animasi loading
    function showLoading() {
        const loader = document.createElement('div');
        loader.style.position = 'fixed';
        loader.style.top = '50%';
        loader.style.left = '50%';
        loader.style.transform = 'translate(-50%, -50%)';
        loader.style.background = '#ffd700';
        loader.style.width = '50px';
        loader.style.height = '50px';
        loader.style.borderRadius = '50%';
        loader.style.animation = 'spin 1s linear infinite';
        document.body.appendChild(loader);

        setTimeout(() => {
            document.body.removeChild(loader);
        }, 2000);
    }
    window.addEventListener('load', showLoading);

    // Tambahkan efek parallax untuk setiap item
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (mouseX - centerX) / 20;
            const moveY = (mouseY - centerY) / 20;
            gsap.to(item.querySelector('img'), {
                x: moveX,
                y: moveY,
                duration: 0.3
            });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('img'), { x: 0, y: 0, duration: 0.3 });
        });
    });

    // Animasi tambahan untuk footer
    gsap.from('footer p', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 80%'
        }
    });

    // Fungsi untuk toggle sound effect (dummy)
    const toggleSound = document.createElement('button');
    toggleSound.textContent = 'Toggle Sound';
    toggleSound.style.position = 'fixed';
    toggleSound.style.top = '70px';
    toggleSound.style.right = '10px';
    toggleSound.style.padding = '10px';
    toggleSound.style.background = '#ffd700';
    toggleSound.style.border = 'none';
    toggleSound.style.cursor = 'pointer';
    document.body.appendChild(toggleSound);

    let isSoundOn = false;
    toggleSound.addEventListener('click', () => {
        isSoundOn = !isSoundOn;
        if (isSoundOn) {
            console.log('Sound On');
        } else {
            console.log('Sound Off');
        }
    });

    // Efek tambahan untuk scroll progres
    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top 50%',
        end: 'bottom 50%',
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to('.gallery-item', {
                opacity: 1 - progress,
                duration: 0.3
            });
        }
    });

    // Fungsi untuk animasi berbasis waktu
    function timeBasedAnimation() {
        const now = new Date();
        const hours = now.getHours();
        gsap.to('.header', {
            backgroundColor: hours > 18 || hours < 6 ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)',
            duration: 1
        });
    }
    setInterval(timeBasedAnimation, 60000);

    // Tambahkan efek zoom saat klik
    items.forEach(item => {
        item.addEventListener('click', () => {
            gsap.to(item.querySelector('img'), {
                scale: 1.5,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => gsap.to(item.querySelector('img'), { scale: 1, duration: 0.5 })
            });
        });
    });

    // Animasi tambahan untuk nav
    gsap.from('.nav', {
        x: '-100%',
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Fungsi untuk deteksi scroll ke bawah
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            gsap.to('.gallery-item', { y: '-=20', duration: 0.3 });
        } else {
            gsap.to('.gallery-item', { y: '+=20', duration: 0.3 });
        }
    });

    // Efek tambahan untuk transisi halus
    gsap.set('.contact', { autoAlpha: 0 });
    gsap.to('.contact', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.header', {
            x: (mouseX - 0.5) * 20,
            y: (mouseY - 0.5) * 20,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatScale() {
        gsap.to('.gallery-item', {
            scale: 1.05,
            yoyo: true,
            repeat: -1,
            duration: 3,
            ease: 'power1.inOut'
        });
    }
    repeatScale();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 10%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery', { y: '-50px', duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery', { y: '0px', duration: 1 })
    });

    // Fungsi untuk preload font
    function preloadFont() {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css?family=Arial';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
    preloadFont();

    // Animasi tambahan untuk caption hover
    items.forEach(item => {
        item.querySelector('.caption').addEventListener('mouseover', () => {
            gsap.to(item.querySelector('.caption'), {
                scale: 1.2,
                duration: 0.3
            });
        });
        item.querySelector('.caption').addEventListener('mouseout', () => {
            gsap.to(item.querySelector('.caption'), {
                scale: 1,
                duration: 0.3
            });
        });
    });

    // Fungsi untuk animasi berbasis waktu
    function updateTime() {
        const now = new Date();
        const seconds = now.getSeconds();
        gsap.to('.gallery-item', {
            rotation: seconds * 6,
            duration: 1
        });
    }
    setInterval(updateTime, 1000);

    // Efek tambahan untuk transisi halus
    gsap.set('.about', { autoAlpha: 0 });
    gsap.to('.about', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%'
        }
    });

    // Fungsi untuk deteksi resize ulang
    function reInitAnimations() {
        ScrollTrigger.refresh();
        gsap.from('.gallery-item', {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }
    window.addEventListener('resize', reInitAnimations);

    // Animasi tambahan untuk form submit
    const form = document.querySelector('.contact form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        gsap.to('.contact button', {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
        setTimeout(() => alert('Message sent!'), 500);
    });

    // Efek tambahan untuk scroll progresif
    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top 50%',
        end: 'bottom 50%',
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to('.gallery-item .caption', {
                opacity: 1 - progress,
                duration: 0.3
            });
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.gallery-item', {
            x: (mouseX - 0.5) * 30,
            y: (mouseY - 0.5) * 30,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatRotate() {
        gsap.to('.gallery-item img', {
            rotationY: '+=180',
            duration: 4,
            ease: 'none',
            repeat: -1
        });
    }
    repeatRotate();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 20%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery-item', { scale: 0.9, duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery-item', { scale: 1, duration: 1 })
    });

    // Fungsi untuk preload audio (dummy)
    function preloadAudio() {
        const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
        audio.preload = 'auto';
    }
    preloadAudio();

    // Animasi tambahan untuk nav hover
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            gsap.to(link, { color: '#fff', duration: 0.3 });
        });
        link.addEventListener('mouseout', () => {
            gsap.to(link, { color: '#ffd700', duration: 0.3 });
        });
    });

    // Fungsi untuk animasi berbasis waktu
    function updateDate() {
        const now = new Date();
        document.title = `3D Gallery - ${now.toLocaleTimeString()}`;
    }
    setInterval(updateDate, 1000);

    // Efek tambahan untuk transisi halus
    gsap.set('.footer', { autoAlpha: 0 });
    gsap.to('.footer', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%'
        }
    });

    // Fungsi untuk deteksi scroll ke atas
    window.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) {
            gsap.to('.gallery-item', { y: '+=30', duration: 0.3 });
        }
    });

    // Animasi tambahan untuk caption
    gsap.from('.gallery-item .caption', {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.gallery-item',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Fungsi untuk toggle animation speed
    const toggleSpeed = document.createElement('button');
    toggleSpeed.textContent = 'Toggle Speed';
    toggleSpeed.style.position = 'fixed';
    toggleSpeed.style.top = '100px';
    toggleSpeed.style.right = '10px';
    toggleSpeed.style.padding = '10px';
    toggleSpeed.style.background = '#ffd700';
    toggleSpeed.style.border = 'none';
    toggleSpeed.style.cursor = 'pointer';
    document.body.appendChild(toggleSpeed);

    let speed = 1;
    toggleSpeed.addEventListener('click', () => {
        speed = speed === 1 ? 2 : 1;
        gsap.globalTimeline.timeScale(speed);
    });

    // Efek tambahan untuk scroll progres
    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top 50%',
        end: 'bottom 50%',
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to('.gallery-item', {
                rotationX: progress * 360,
                duration: 0.3
            });
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.about', {
            x: (mouseX - 0.5) * 50,
            y: (mouseY - 0.5) * 50,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatTranslate() {
        gsap.to('.gallery-item', {
            x: '+=20',
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'power1.inOut'
        });
    }
    repeatTranslate();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 10%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery', { x: '-50px', duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery', { x: '0px', duration: 1 })
    });

    // Fungsi untuk preload video (dummy)
    function preloadVideo() {
        const video = document.createElement('video');
        video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
        video.preload = 'auto';
        video.style.display = 'none';
        document.body.appendChild(video);
    }
    preloadVideo();

    // Animasi tambahan untuk nav
    gsap.from('.nav', {
        rotation: -90,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Fungsi untuk deteksi scroll ke bawah
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            gsap.to('.gallery-item', { rotationY: '+=10', duration: 0.3 });
        } else {
            gsap.to('.gallery-item', { rotationY: '-=10', duration: 0.3 });
        }
    });

    // Efek tambahan untuk transisi halus
    gsap.set('.contact', { autoAlpha: 0 });
    gsap.to('.contact', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.footer', {
            x: (mouseX - 0.5) * 20,
            y: (mouseY - 0.5) * 20,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatScaleY() {
        gsap.to('.gallery-item', {
            scaleY: 1.1,
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'power1.inOut'
        });
    }
    repeatScaleY();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 20%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery-item', { opacity: 0.3, duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery-item', { opacity: 1, duration: 1 })
    });

    // Fungsi untuk preload font tambahan
    function preloadFontExtra() {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css?family=Helvetica';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
    preloadFontExtra();

    // Animasi tambahan untuk caption hover
    items.forEach(item => {
        item.querySelector('.caption').addEventListener('mouseover', () => {
            gsap.to(item.querySelector('.caption'), {
                scale: 1.3,
                duration: 0.3
            });
        });
        item.querySelector('.caption').addEventListener('mouseout', () => {
            gsap.to(item.querySelector('.caption'), {
                scale: 1,
                duration: 0.3
            });
        });
    });

    // Fungsi untuk animasi berbasis waktu
    function updateSeconds() {
        const now = new Date();
        const seconds = now.getSeconds();
        gsap.to('.gallery-item', {
            rotationZ: seconds * 6,
            duration: 1
        });
    }
    setInterval(updateSeconds, 1000);

    // Efek tambahan untuk transisi halus
    gsap.set('.about', { autoAlpha: 0 });
    gsap.to('.about', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%'
        }
    });

    // Fungsi untuk deteksi resize ulang
    function reInitAnimationsExtra() {
        ScrollTrigger.refresh();
        gsap.from('.gallery-item', {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }
    window.addEventListener('resize', reInitAnimationsExtra);

    // Animasi tambahan untuk form submit
    const formExtra = document.querySelector('.contact form');
    formExtra.addEventListener('submit', (e) => {
        e.preventDefault();
        gsap.to('.contact button', {
            scale: 1.2,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
        setTimeout(() => alert('Message sent successfully!'), 500);
    });

    // Efek tambahan untuk scroll progresif
    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top 50%',
        end: 'bottom 50%',
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to('.gallery-item .caption', {
                y: progress * 50,
                duration: 0.3
            });
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.contact', {
            x: (mouseX - 0.5) * 30,
            y: (mouseY - 0.5) * 30,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatTranslateX() {
        gsap.to('.gallery-item', {
            x: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'power1.inOut'
        });
    }
    repeatTranslateX();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 10%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery', { y: '-100px', duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery', { y: '0px', duration: 1 })
    });

    // Fungsi untuk preload image tambahan
    function preloadImagesExtra() {
        const images = document.querySelectorAll('.gallery-item img');
        images.forEach(img => {
            const src = img.src.replace('random', 'random-extra');
            const tempImg = new Image();
            tempImg.src = src;
        });
    }
    preloadImagesExtra();

    // Animasi tambahan untuk nav
    gsap.from('.nav', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Fungsi untuk deteksi scroll ke bawah
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            gsap.to('.gallery-item', { rotationX: '+=10', duration: 0.3 });
        } else {
            gsap.to('.gallery-item', { rotationX: '-=10', duration: 0.3 });
        }
    });

    // Efek tambahan untuk transisi halus
    gsap.set('.contact', { autoAlpha: 0 });
    gsap.to('.contact', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.footer', {
            x: (mouseX - 0.5) * 30,
            y: (mouseY - 0.5) * 30,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatScaleZ() {
        gsap.to('.gallery-item', {
            scaleZ: 1.1,
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'power1.inOut'
        });
    }
    repeatScaleZ();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 20%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery-item', { scale: 0.8, duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery-item', { scale: 1, duration: 1 })
    });

    // Fungsi untuk preload audio tambahan
    function preloadAudioExtra() {
        const audio = new Audio('https://www.soundjay.com/buttons/beep-02.mp3');
        audio.preload = 'auto';
    }
    preloadAudioExtra();

    // Animasi tambahan untuk nav hover
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            gsap.to(link, { scale: 1.1, duration: 0.3 });
        });
        link.addEventListener('mouseout', () => {
            gsap.to(link, { scale: 1, duration: 0.3 });
        });
    });

    // Fungsi untuk animasi berbasis waktu
    function updateMinutes() {
        const now = new Date();
        const minutes = now.getMinutes();
        gsap.to('.gallery-item', {
            rotationY: minutes * 6,
            duration: 1
        });
    }
    setInterval(updateMinutes, 60000);

    // Efek tambahan untuk transisi halus
    gsap.set('.footer', { autoAlpha: 0 });
    gsap.to('.footer', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%'
        }
    });

    // Fungsi untuk deteksi scroll ke atas
    window.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) {
            gsap.to('.gallery-item', { rotationY: '-=10', duration: 0.3 });
        }
    });

    // Animasi tambahan untuk caption
    gsap.from('.gallery-item .caption', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.gallery-item',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Fungsi untuk toggle animation direction
    const toggleDirection = document.createElement('button');
    toggleDirection.textContent = 'Toggle Direction';
    toggleDirection.style.position = 'fixed';
    toggleDirection.style.top = '130px';
    toggleDirection.style.right = '10px';
    toggleDirection.style.padding = '10px';
    toggleDirection.style.background = '#ffd700';
    toggleDirection.style.border = 'none';
    toggleDirection.style.cursor = 'pointer';
    document.body.appendChild(toggleDirection);

    let isForward = true;
    toggleDirection.addEventListener('click', () => {
        isForward = !isForward;
        gsap.globalTimeline.reversed(!isForward);
    });

    // Efek tambahan untuk scroll progres
    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top 50%',
        end: 'bottom 50%',
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to('.gallery-item', {
                rotationZ: progress * 180,
                duration: 0.3
            });
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.contact', {
            x: (mouseX - 0.5) * 40,
            y: (mouseY - 0.5) * 40,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatRotateY() {
        gsap.to('.gallery-item img', {
            rotationY: '+=360',
            duration: 3,
            ease: 'none',
            repeat: -1
        });
    }
    repeatRotateY();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 10%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery', { y: '-150px', duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery', { y: '0px', duration: 1 })
    });

    // Fungsi untuk preload video tambahan
    function preloadVideoExtra() {
        const video = document.createElement('video');
        video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
        video.preload = 'auto';
        video.style.display = 'none';
        document.body.appendChild(video);
    }
    preloadVideoExtra();

    // Animasi tambahan untuk nav
    gsap.from('.nav', {
        x: '100%',
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Fungsi untuk deteksi scroll ke bawah
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            gsap.to('.gallery-item', { rotationZ: '+=10', duration: 0.3 });
        } else {
            gsap.to('.gallery-item', { rotationZ: '-=10', duration: 0.3 });
        }
    });

    // Efek tambahan untuk transisi halus
    gsap.set('.contact', { autoAlpha: 0 });
    gsap.to('.contact', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.footer', {
            x: (mouseX - 0.5) * 40,
            y: (mouseY - 0.5) * 40,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatScaleX() {
        gsap.to('.gallery-item', {
            scaleX: 1.1,
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'power1.inOut'
        });
    }
    repeatScaleX();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 20%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery-item', { scale: 0.7, duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery-item', { scale: 1, duration: 1 })
    });

    // Fungsi untuk preload audio tambahan
    function preloadAudioExtraTwo() {
        const audio = new Audio('https://www.soundjay.com/buttons/beep-03.mp3');
        audio.preload = 'auto';
    }
    preloadAudioExtraTwo();

    // Animasi tambahan untuk nav hover
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            gsap.to(link, { scale: 1.2, duration: 0.3 });
        });
        link.addEventListener('mouseout', () => {
            gsap.to(link, { scale: 1, duration: 0.3 });
        });
    });

    // Fungsi untuk animasi berbasis waktu
    function updateHours() {
        const now = new Date();
        const hours = now.getHours();
        gsap.to('.gallery-item', {
            rotationX: hours * 15,
            duration: 1
        });
    }
    setInterval(updateHours, 3600000);

    // Efek tambahan untuk transisi halus
    gsap.set('.footer', { autoAlpha: 0 });
    gsap.to('.footer', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%'
        }
    });

    // Fungsi untuk deteksi scroll ke atas
    window.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) {
            gsap.to('.gallery-item', { rotationX: '-=10', duration: 0.3 });
        }
    });

    // Animasi tambahan untuk caption
    gsap.from('.gallery-item .caption', {
        x: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.gallery-item',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Fungsi untuk toggle animation pause
    const togglePause = document.createElement('button');
    togglePause.textContent = 'Toggle Pause';
    togglePause.style.position = 'fixed';
    togglePause.style.top = '160px';
    togglePause.style.right = '10px';
    togglePause.style.padding = '10px';
    togglePause.style.background = '#ffd700';
    togglePause.style.border = 'none';
    togglePause.style.cursor = 'pointer';
    document.body.appendChild(togglePause);

    let isPaused = false;
    togglePause.addEventListener('click', () => {
        isPaused = !isPaused;
        gsap.globalTimeline.paused(isPaused);
    });

    // Efek tambahan untuk scroll progres
    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top 50%',
        end: 'bottom 50%',
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to('.gallery-item', {
                rotationY: progress * 180,
                duration: 0.3
            });
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.about', {
            x: (mouseX - 0.5) * 60,
            y: (mouseY - 0.5) * 60,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatTranslateZ() {
        gsap.to('.gallery-item', {
            z: '+=20',
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'power1.inOut'
        });
    }
    repeatTranslateZ();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 10%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery', { x: '-100px', duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery', { x: '0px', duration: 1 })
    });

    // Fungsi untuk preload video tambahan
    function preloadVideoExtraTwo() {
        const video = document.createElement('video');
        video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
        video.preload = 'auto';
        video.style.display = 'none';
        document.body.appendChild(video);
    }
    preloadVideoExtraTwo();

    // Animasi tambahan untuk nav
    gsap.from('.nav', {
        y: '-100%',
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Fungsi untuk deteksi scroll ke bawah
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            gsap.to('.gallery-item', { rotationZ: '-=10', duration: 0.3 });
        } else {
            gsap.to('.gallery-item', { rotationZ: '+=10', duration: 0.3 });
        }
    });

    // Efek tambahan untuk transisi halus
    gsap.set('.contact', { autoAlpha: 0 });
    gsap.to('.contact', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.footer', {
            x: (mouseX - 0.5) * 50,
            y: (mouseY - 0.5) * 50,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatRotateX() {
        gsap.to('.gallery-item img', {
            rotationX: '+=360',
            duration: 3,
            ease: 'none',
            repeat: -1
        });
    }
    repeatRotateX();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 20%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery-item', { scale: 0.6, duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery-item', { scale: 1, duration: 1 })
    });

    // Fungsi untuk preload audio tambahan
    function preloadAudioExtraThree() {
        const audio = new Audio('https://www.soundjay.com/buttons/beep-04.mp3');
        audio.preload = 'auto';
    }
    preloadAudioExtraThree();

    // Animasi tambahan untuk nav hover
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            gsap.to(link, { scale: 1.3, duration: 0.3 });
        });
        link.addEventListener('mouseout', () => {
            gsap.to(link, { scale: 1, duration: 0.3 });
        });
    });

    // Fungsi untuk animasi berbasis waktu
    function updateDay() {
        const now = new Date();
        const day = now.getDay();
        gsap.to('.gallery-item', {
            rotationZ: day * 30,
            duration: 1
        });
    }
    setInterval(updateDay, 86400000);

    // Efek tambahan untuk transisi halus
    gsap.set('.footer', { autoAlpha: 0 });
    gsap.to('.footer', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%'
        }
    });

    // Fungsi untuk deteksi scroll ke atas
    window.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) {
            gsap.to('.gallery-item', { rotationZ: '+=10', duration: 0.3 });
        }
    });

    // Animasi tambahan untuk caption
    gsap.from('.gallery-item .caption', {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.gallery-item',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Fungsi untuk toggle animation reverse
    const toggleReverse = document.createElement('button');
    toggleReverse.textContent = 'Toggle Reverse';
    toggleReverse.style.position = 'fixed';
    toggleReverse.style.top = '190px';
    toggleReverse.style.right = '10px';
    toggleReverse.style.padding = '10px';
    toggleReverse.style.background = '#ffd700';
    toggleReverse.style.border = 'none';
    toggleReverse.style.cursor = 'pointer';
    document.body.appendChild(toggleReverse);

    let isReversed = false;
    toggleReverse.addEventListener('click', () => {
        isReversed = !isReversed;
        gsap.globalTimeline.reversed(isReversed);
    });

    // Efek tambahan untuk scroll progres
    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top 50%',
        end: 'bottom 50%',
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to('.gallery-item', {
                rotationX: progress * 180,
                duration: 0.3
            });
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.contact', {
            x: (mouseX - 0.5) * 50,
            y: (mouseY - 0.5) * 50,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatTranslateY() {
        gsap.to('.gallery-item', {
            y: '+=20',
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'power1.inOut'
        });
    }
    repeatTranslateY();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 10%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery', { y: '-200px', duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery', { y: '0px', duration: 1 })
    });

    // Fungsi untuk preload video tambahan
    function preloadVideoExtraThree() {
        const video = document.createElement('video');
        video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
        video.preload = 'auto';
        video.style.display = 'none';
        document.body.appendChild(video);
    }
    preloadVideoExtraThree();

    // Animasi tambahan untuk nav
    gsap.from('.nav', {
        rotation: 90,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Fungsi untuk deteksi scroll ke bawah
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            gsap.to('.gallery-item', { rotationY: '-=10', duration: 0.3 });
        } else {
            gsap.to('.gallery-item', { rotationY: '+=10', duration: 0.3 });
        }
    });

    // Efek tambahan untuk transisi halus
    gsap.set('.contact', { autoAlpha: 0 });
    gsap.to('.contact', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.footer', {
            x: (mouseX - 0.5) * 60,
            y: (mouseY - 0.5) * 60,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatRotateZ() {
        gsap.to('.gallery-item img', {
            rotationZ: '+=360',
            duration: 3,
            ease: 'none',
            repeat: -1
        });
    }
    repeatRotateZ();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 20%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery-item', { scale: 0.5, duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery-item', { scale: 1, duration: 1 })
    });

    // Fungsi untuk preload audio tambahan
    function preloadAudioExtraFour() {
        const audio = new Audio('https://www.soundjay.com/buttons/beep-05.mp3');
        audio.preload = 'auto';
    }
    preloadAudioExtraFour();

    // Animasi tambahan untuk nav hover
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            gsap.to(link, { scale: 1.4, duration: 0.3 });
        });
        link.addEventListener('mouseout', () => {
            gsap.to(link, { scale: 1, duration: 0.3 });
        });
    });

    // Fungsi untuk animasi berbasis waktu
    function updateMonth() {
        const now = new Date();
        const month = now.getMonth();
        gsap.to('.gallery-item', {
            rotationX: month * 30,
            duration: 1
        });
    }
    setInterval(updateMonth, 2592000000);

    // Efek tambahan untuk transisi halus
    gsap.set('.footer', { autoAlpha: 0 });
    gsap.to('.footer', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%'
        }
    });

    // Fungsi untuk deteksi scroll ke atas
    window.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) {
            gsap.to('.gallery-item', { rotationX: '+=10', duration: 0.3 });
        }
    });

    // Animasi tambahan untuk caption
    gsap.from('.gallery-item .caption', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.gallery-item',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Fungsi untuk toggle animation restart
    const toggleRestart = document.createElement('button');
    toggleRestart.textContent = 'Toggle Restart';
    toggleRestart.style.position = 'fixed';
    toggleRestart.style.top = '220px';
    toggleRestart.style.right = '10px';
    toggleRestart.style.padding = '10px';
    toggleRestart.style.background = '#ffd700';
    toggleRestart.style.border = 'none';
    toggleRestart.style.cursor = 'pointer';
    document.body.appendChild(toggleRestart);

    let isRestarted = false;
    toggleRestart.addEventListener('click', () => {
        isRestarted = !isRestarted;
        if (isRestarted) {
            gsap.globalTimeline.restart();
        }
    });

    // Efek tambahan untuk scroll progres
    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top 50%',
        end: 'bottom 50%',
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to('.gallery-item', {
                rotationZ: progress * 360,
                duration: 0.3
            });
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.contact', {
            x: (mouseX - 0.5) * 70,
            y: (mouseY - 0.5) * 70,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatTranslateAll() {
        gsap.to('.gallery-item', {
            x: '+=20',
            y: '+=20',
            z: '+=20',
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'power1.inOut'
        });
    }
    repeatTranslateAll();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 10%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery', { y: '-250px', duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery', { y: '0px', duration: 1 })
    });

    // Fungsi untuk preload video tambahan
    function preloadVideoExtraFour() {
        const video = document.createElement('video');
        video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
        video.preload = 'auto';
        video.style.display = 'none';
        document.body.appendChild(video);
    }
    preloadVideoExtraFour();

    // Animasi tambahan untuk nav
    gsap.from('.nav', {
        scale: 1.2,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Fungsi untuk deteksi scroll ke bawah
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            gsap.to('.gallery-item', { rotationX: '-=10', duration: 0.3 });
        } else {
            gsap.to('.gallery-item', { rotationX: '+=10', duration: 0.3 });
        }
    });

    // Efek tambahan untuk transisi halus
    gsap.set('.contact', { autoAlpha: 0 });
    gsap.to('.contact', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.footer', {
            x: (mouseX - 0.5) * 70,
            y: (mouseY - 0.5) * 70,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatRotateAll() {
        gsap.to('.gallery-item img', {
            rotationX: '+=360',
            rotationY: '+=360',
            rotationZ: '+=360',
            duration: 3,
            ease: 'none',
            repeat: -1
        });
    }
    repeatRotateAll();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 20%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery-item', { scale: 0.4, duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery-item', { scale: 1, duration: 1 })
    });

    // Fungsi untuk preload audio tambahan
    function preloadAudioExtraFive() {
        const audio = new Audio('https://www.soundjay.com/buttons/beep-06.mp3');
        audio.preload = 'auto';
    }
    preloadAudioExtraFive();

    // Animasi tambahan untuk nav hover
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            gsap.to(link, { scale: 1.5, duration: 0.3 });
        });
        link.addEventListener('mouseout', () => {
            gsap.to(link, { scale: 1, duration: 0.3 });
        });
    });

    // Fungsi untuk animasi berbasis waktu
    function updateYear() {
        const now = new Date();
        const year = now.getFullYear();
        gsap.to('.gallery-item', {
            rotationY: (year - 2025) * 10,
            duration: 1
        });
    }
    setInterval(updateYear, 31536000000);

    // Efek tambahan untuk transisi halus
    gsap.set('.footer', { autoAlpha: 0 });
    gsap.to('.footer', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%'
        }
    });

    // Fungsi untuk deteksi scroll ke atas
    window.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) {
            gsap.to('.gallery-item', { rotationY: '+=10', duration: 0.3 });
        }
    });

    // Animasi tambahan untuk caption
    gsap.from('.gallery-item .caption', {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.gallery-item',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Fungsi untuk toggle animation speed up
    const toggleSpeedUp = document.createElement('button');
    toggleSpeedUp.textContent = 'Toggle Speed Up';
    toggleSpeedUp.style.position = 'fixed';
    toggleSpeedUp.style.top = '250px';
    toggleSpeedUp.style.right = '10px';
    toggleSpeedUp.style.padding = '10px';
    toggleSpeedUp.style.background = '#ffd700';
    toggleSpeedUp.style.border = 'none';
    toggleSpeedUp.style.cursor = 'pointer';
    document.body.appendChild(toggleSpeedUp);

    let speedUp = 1;
    toggleSpeedUp.addEventListener('click', () => {
        speedUp = speedUp === 1 ? 3 : 1;
        gsap.globalTimeline.timeScale(speedUp);
    });

    // Efek tambahan untuk scroll progres
    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top 50%',
        end: 'bottom 50%',
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to('.gallery-item', {
                rotationX: progress * 360,
                duration: 0.3
            });
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.contact', {
            x: (mouseX - 0.5) * 80,
            y: (mouseY - 0.5) * 80,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatTranslateAllDirections() {
        gsap.to('.gallery-item', {
            x: '+=30',
            y: '+=30',
            z: '+=30',
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'power1.inOut'
        });
    }
    repeatTranslateAllDirections();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 10%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery', { y: '-300px', duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery', { y: '0px', duration: 1 })
    });

    // Fungsi untuk preload video tambahan
    function preloadVideoExtraFive() {
        const video = document.createElement('video');
        video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
        video.preload = 'auto';
        video.style.display = 'none';
        document.body.appendChild(video);
    }
    preloadVideoExtraFive();

    // Animasi tambahan untuk nav
    gsap.from('.nav', {
        rotation: -180,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Fungsi untuk deteksi scroll ke bawah
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            gsap.to('.gallery-item', { rotationY: '+=10', duration: 0.3 });
        } else {
            gsap.to('.gallery-item', { rotationY: '-=10', duration: 0.3 });
        }
    });

    // Efek tambahan untuk transisi halus
    gsap.set('.contact', { autoAlpha: 0 });
    gsap.to('.contact', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.footer', {
            x: (mouseX - 0.5) * 80,
            y: (mouseY - 0.5) * 80,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatRotateAllAxes() {
        gsap.to('.gallery-item img', {
            rotationX: '+=360',
            rotationY: '+=360',
            rotationZ: '+=360',
            duration: 3,
            ease: 'none',
            repeat: -1
        });
    }
    repeatRotateAllAxes();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 20%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery-item', { scale: 0.3, duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery-item', { scale: 1, duration: 1 })
    });

    // Fungsi untuk preload audio tambahan
    function preloadAudioExtraSix() {
        const audio = new Audio('https://www.soundjay.com/buttons/beep-07.mp3');
        audio.preload = 'auto';
    }
    preloadAudioExtraSix();

    // Animasi tambahan untuk nav hover
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            gsap.to(link, { scale: 1.6, duration: 0.3 });
        });
        link.addEventListener('mouseout', () => {
            gsap.to(link, { scale: 1, duration: 0.3 });
        });
    });

    // Fungsi untuk animasi berbasis waktu
    function updateTimeOfDay() {
        const now = new Date();
        const hours = now.getHours();
        gsap.to('.gallery-item', {
            rotationZ: hours * 15,
            duration: 1
        });
    }
    setInterval(updateTimeOfDay, 3600000);

    // Efek tambahan untuk transisi halus
    gsap.set('.footer', { autoAlpha: 0 });
    gsap.to('.footer', {
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%'
        }
    });

    // Fungsi untuk deteksi scroll ke atas
    window.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) {
            gsap.to('.gallery-item', { rotationZ: '-=10', duration: 0.3 });
        }
    });

    // Animasi tambahan untuk caption
    gsap.from('.gallery-item .caption', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.gallery-item',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Fungsi untuk toggle animation slow
    const toggleSlow = document.createElement('button');
    toggleSlow.textContent = 'Toggle Slow';
    toggleSlow.style.position = 'fixed';
    toggleSlow.style.top = '280px';
    toggleSlow.style.right = '10px';
    toggleSlow.style.padding = '10px';
    toggleSlow.style.background = '#ffd700';
    toggleSlow.style.border = 'none';
    toggleSlow.style.cursor = 'pointer';
    document.body.appendChild(toggleSlow);

    let slowSpeed = 1;
    toggleSlow.addEventListener('click', () => {
        slowSpeed = slowSpeed === 1 ? 0.5 : 1;
        gsap.globalTimeline.timeScale(slowSpeed);
    });

    // Efek tambahan untuk scroll progres
    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top 50%',
        end: 'bottom 50%',
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to('.gallery-item', {
                rotationY: progress * 360,
                duration: 0.3
            });
        }
    });

    // Fungsi untuk animasi berbasis mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        gsap.to('.contact', {
            x: (mouseX - 0.5) * 90,
            y: (mouseY - 0.5) * 90,
            duration: 0.3
        });
    });

    // Tambahkan logika untuk animasi berulang
    function repeatTranslateRandom() {
        gsap.to('.gallery-item', {
            x: gsap.utils.random(-20, 20),
            y: gsap.utils.random(-20, 20),
            z: gsap.utils.random(-20, 20),
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'power1.inOut'
        });
    }
    repeatTranslateRandom();

    // Efek tambahan untuk scroll end
    ScrollTrigger.create({
        trigger: 'footer',
        start: 'top 10%',
        end: 'bottom 0%',
        onEnter: () => gsap.to('.gallery', { y: '-350px', duration: 1 }),
        onLeaveBack: () => gsap.to('.gallery', { y: '0px', duration: 1 })
    });

    // Fungsi untuk preload video tambahan
    function preloadVideoExtraSix() {
        const video = document.createElement('video');
        video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
        video.preload = 'auto';
        video.style.display = 'none';
        document.body.appendChild(video);
    }
    preloadVideoExtraSix();

    // Animasi tambahan untuk nav
    gsap.from('.nav', {
        rotation: 180,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Fungsi untuk deteksi scroll ke bawah
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            gsap.to('.gallery-item', { rotationX: '+=10
