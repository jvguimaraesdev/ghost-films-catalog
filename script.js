// ELEMENTOS //

const eyeLeft = document.getElementById("eye-left");
const eyeRight = document.getElementById("eye-right");

const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("loginForm");

const likeButtons = document.querySelectorAll(".like");
const dislikeButtons = document.querySelectorAll(".dislike");
const watchButtons = document.querySelectorAll(".watch");
const langToggle = document.getElementById("langToggle");

// TRADUÇÃO PT-BR //

const movieTitlesPTBR = {
  "The Thing": "O Enigma de Outro Mundo",
  "Alien": "Alien, o Oitavo Passageiro",
  "Jaws": "Tubarão",
  "Poltergeist": "Poltergeist: O Fenômeno",
  "A Nightmare on Elm Street": "A Hora do Pesadelo",
  "Halloween": "Halloween: A Noite do Terror",
  "It": "It: A Coisa",
  "Scream": "Pânico"
};

const translations = {
  tagline: {
    en: "The best horror movies:",
    pt: "Os melhores filmes de terror:"
  }
};

// IDIOMA PRINCIPAL //

let currentLang = "en";

// FUNÇÃO DE TRADUÇÃO //

function getMovieTitle(title) {
  if (currentLang === "pt") {
    return movieTitlesPTBR[title] || title;
  }
  return title;
}

function translateMovies() {
  const titles = document.querySelectorAll(".movie-card h3");

  titles.forEach((title) => {
    const original = title.getAttribute("data-original");

    if (!original) {
      title.setAttribute("data-original", title.textContent);
    }

    const baseTitle = title.getAttribute("data-original");
    title.textContent = getMovieTitle(baseTitle);
  });
}

// BOTÃO PT / EN //

if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "pt" : "en";

    translateMovies();

    const tagline = document.querySelector(".tagline");
    if (tagline) {
      tagline.textContent = translations.tagline[currentLang]
    }
  });
}

// ANIMAÇÃO DO FANTASMA //

if (form && email && password && eyeLeft && eyeRight) {
  email.addEventListener("focus", () => {
    eyeLeft.setAttribute("cy", 55);
    eyeRight.setAttribute("cy", 55);
  });

  email.addEventListener("blur", () => {
    eyeLeft.setAttribute("cy", 45);
    eyeRight.setAttribute("cy", 45);
  });

  password.addEventListener("focus", () => {
    eyeLeft.classList.add("eye-closed");
    eyeRight.classList.add("eye-closed");
  });

  password.addEventListener("blur", () => {
    eyeLeft.classList.remove("eye-closed");
    eyeRight.classList.remove("eye-closed");
  });

  // LOGIN // 

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "catalog.html";
  });
}

// LIKE / DISLIKE //

if (likeButtons.length > 0) {
  likeButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const dislike = dislikeButtons[index];

      btn.classList.toggle("active");
      dislike.classList.remove("active");
    });
  });

  dislikeButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const like = likeButtons[index];

      btn.classList.toggle("active");
      like.classList.remove("active");
    });
  });
}

// ASSISTIR // 

if (watchButtons.length > 0) {
  watchButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-url");

      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  });
}

if (document.querySelector(".movies")) {
  translateMovies();
}