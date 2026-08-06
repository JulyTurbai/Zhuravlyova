'use script'

const galleryData = [
    {
        beforeImg: 'img/after.png',
        afterImg: 'img/after1.png',
        beforeText: 'Тьмяний відтінок, нерівномірна база після попередніх фарбувань та сухість на кінцях.',
        afterText: 'Авторське фарбування Airtouch у бежевому відтінку з глибшим корінням та молекулярним доглядом.'
    },
    {
        beforeImg: 'img/after.png',
        afterImg: 'img/after1.png',
        beforeText: 'Пошкоджена структура волосся, втрата блиску та еластичності.',
        afterText: 'Глибока реконструкція ліпідного балансу та гаряче відновлення по всій довжині.'
    }
];

let currentIndex = 0;
let isAfter = false; // Завжди починаємо зі стану "До"

const imgEl = document.getElementById('galleryImg');
const textEl = document.getElementById('gallery__text');
const toggleBtn = document.getElementById('toggleBtn');
const counterEl = document.getElementById('galleryCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateSlide() {
    const item = galleryData[currentIndex];
    
    // Плавна анімація зникання перед зміною вмісту
    imgEl.style.opacity = '0';
    textEl.style.opacity = '0';
    
    setTimeout(() => {
        if (isAfter) {
            imgEl.src = item.afterImg;
            textEl.textContent = item.afterText;
            toggleBtn.textContent = 'До процедури';
        } else {
            imgEl.src = item.beforeImg;
            textEl.textContent = item.beforeText;
            toggleBtn.textContent = 'Після процедури';
        }
        
        counterEl.textContent = String(currentIndex + 1).padStart(2, '0');
        imgEl.style.opacity = '1';
        textEl.style.opacity = '1';
    }, 200);
}

// Перемикання До / Після для поточного слайда
toggleBtn.addEventListener('click', () => {
    isAfter = !isAfter;
    updateSlide();
});

// Перехід на попередній слайд — примусово скидаємо стан на "До"
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? galleryData.length - 1 : currentIndex - 1;
    isAfter = false; 
    updateSlide();
});

// Перехід на наступний слайд — примусово скидаємо стан на "До"
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === galleryData.length - 1) ? 0 : currentIndex + 1;
    isAfter = false; 
    updateSlide();
});

// Intersection Observer: плашка зникає при вході в блок і повертається при виході
const overlay = document.getElementById('galleryOverlay');
const gallerySection = document.querySelector('.gallery__section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Користувач дійшов до блоку -> темна плашка зникає
            overlay.classList.add('is-visible');
        } else {
            // Користувач прокролив повз блок -> темна плашка повертається
            overlay.classList.remove('is-visible');
        }
    });
}, { threshold: 0.2 });

observer.observe(gallerySection);