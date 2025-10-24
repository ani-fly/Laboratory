document.addEventListener("DOMContentLoaded", () => {
  function setUserName() {
    const firstNameElement = document.getElementById('firstName');
    const lastNameElement = document.getElementById('lastName');
    
    if (firstNameElement && lastNameElement) {
      firstNameElement.textContent = 'JOHN';
      lastNameElement.textContent = 'PARKER';
    }
  }

  const section = document.querySelector('.contact-section');
  const title = section.querySelector('.section-title');

  title.addEventListener('click', () => {
    section.classList.toggle('collapsed');
  });

  setUserName();
});
