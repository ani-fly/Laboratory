document.addEventListener("DOMContentLoaded", () => {

  // --- Функції для відображення даних ---
  function setUserName(firstName, lastName) {
    const firstNameElement = document.getElementById('firstName');
    const lastNameElement = document.getElementById('lastName');
    
    if (firstNameElement && lastNameElement) {
      firstNameElement.textContent = firstName.toUpperCase();
      lastNameElement.textContent = lastName.toUpperCase();
    }
  }

  function renderHobbies(containerSelector, hobbiesArray) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = "";

    const title = document.createElement("h2");
    title.className = "section-title hobbies-title";
    title.textContent = "HOBBIES";
    container.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "hobbies-grid";

    hobbiesArray.forEach(hobby => {
      const hobbyItem = document.createElement("div");
      hobbyItem.className = "hobby-item";

      const hobbyName = document.createElement("span");
      hobbyName.className = "hobby-name";
      hobbyName.textContent = hobby;

      hobbyItem.appendChild(hobbyName);
      grid.appendChild(hobbyItem);
    });

    container.appendChild(grid);
  }

  function renderSkills(containerId, skillsArray) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    skillsArray.forEach(skill => {
      const skillItem = document.createElement("div");
      skillItem.className = "skill-item";

      skillItem.innerHTML = `
        <div class="skill-header">
          <span class="skill-name">${skill.name}</span>
        </div>
        <div class="skill-bar">
          <div class="skill-progress"></div>
        </div>
      `;

      const progress = skillItem.querySelector(".skill-progress");
      progress.style.width = `${skill.level}%`;

      const endSquare = document.createElement("div");
      endSquare.className = "progress-square";
      progress.appendChild(endSquare);

      container.appendChild(skillItem);
    });
  }

  function setupContactToggle() {
    const section = document.querySelector('.contact-section');
    if (!section) return;

    const title = section.querySelector('.section-title');
    if (!title) return;

    title.addEventListener('click', () => {
      section.classList.toggle('collapsed');
    });
  }

  // --- Завантаження JSON через Fetch ---
  function loadData() {
    fetch("data.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Помилка: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Виклик функцій з отриманими даними
        setUserName(data.firstName, data.lastName);
        renderHobbies(".hobbies-section", data.hobbies);
        renderSkills("skills-container", data.skills);
        setupContactToggle();
      })
      .catch(error => {
        console.error("Помилка при завантаженні даних:", error);

        // Відображення повідомлення про помилку
        const body = document.body;
        const errorMsg = document.createElement("p");
        errorMsg.textContent = "Не вдалося завантажити дані. Спробуйте пізніше.";
        errorMsg.style.color = "red";
        errorMsg.style.textAlign = "center";
        body.prepend(errorMsg);
      });
  }

  // --- Запуск ---
  loadData();
});
