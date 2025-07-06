const imageBoxes = document.querySelectorAll('.image-box');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.25 });
imageBoxes.forEach(box => observer.observe(box));
