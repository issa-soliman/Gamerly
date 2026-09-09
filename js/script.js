const openBtn = document.getElementById('open-btn');
const sidebar = document.getElementById('sidebar');
const sidebarLinks = sidebar.querySelectorAll('a');

openBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
});

const sections = document.querySelectorAll('section[id]');
const mainNavLinks = document.querySelectorAll('nav a');

const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -70% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute('id');

      mainNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));


document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.slider-container');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentIndex = 0;
  const totalSections = 3;

  function updateSlider() {
    const percentage = currentIndex * (100 / totalSections);
    
    const isRTL = document.dir === 'rtl' || getComputedStyle(document.body).direction === 'rtl';
    const directionMultiplier = isRTL ? 1 : -1;

    sliderContainer.style.transform = `translateX(${percentage * directionMultiplier}%)`;
  }

  function flashButton(btn) {
    btn.classList.add('active');

    setTimeout(() => {
      btn.classList.remove('active');
    }, 300); 
  }

  nextBtn.addEventListener('click', (e) => {
    if (currentIndex < totalSections - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    
    flashButton(nextBtn);
    e.currentTarget.blur();
    updateSlider();
  });

  prevBtn.addEventListener('click', (e) => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalSections - 1;
    }

    flashButton(prevBtn);
    e.currentTarget.blur(); 
    updateSlider();
  });
});