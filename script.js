// --- 1. Mobilní navigace + Zavírání po kliknutí ---
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a'); // Vybereme všechny odkazy

// Otevírání/zavírání burgerem
burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Zavření menu po kliknutí na odkaz
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active'); // Schová menu
        burger.classList.remove('toggle');  // Vrátí burger do původního stavu
    });
});

// --- 2. Scroll Efekt pro Navbar ---
window.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// --- 3. Scroll Reveal Animace ---
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const observer = new IntersectionObserver(revealCallback, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => observer.observe(el));

// --- 4. Otevírací doba ---
const checkOpenStatus = () => {
    const statusText = document.getElementById('shop-status');
    const now = new Date();
    const day = now.getDay(); 
    const hour = now.getHours();

    let isOpen = false;

    // Po-Pá: 9:00 - 17:00
    if (day >= 1 && day <= 5) {
        if (hour >= 9 && hour < 17) {
            isOpen = true;
        }
    }

    if (isOpen) {
        statusText.innerHTML = '<span class="indicator" style="background:#4cd137"></span> OTEVŘENO • Do 17:00';
        statusText.style.borderColor = "#4cd137";
    } else {
        let nextOpen = "v pondělí 9:00";
        if (day >= 1 && day < 5) { nextOpen = "zítra v 9:00"; }
        if (day === 5 && hour >= 17) { nextOpen = "v pondělí 9:00"; }
        if (day === 0 || day === 6) { nextOpen = "v pondělí 9:00"; }

        statusText.innerHTML = `<span class="indicator" style="background:#e84118"></span> Zavřeno • Otevíráme ${nextOpen}`;
        statusText.style.borderColor = "rgba(255,255,255,0.3)";
    }
};

checkOpenStatus();
setInterval(checkOpenStatus, 60000);