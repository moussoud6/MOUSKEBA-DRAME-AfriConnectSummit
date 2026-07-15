/*AFRICONNECT SUMMIT - COMMIT 4 : FONCTIONNALITÉS GLOBALES */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DARK MODE / LIGHT MODE (
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Au chargement : si un thème était déjà sauvegardé, on l'applique
    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
        // Optionnel : adapter l'icône si besoin (ex: lune -> soleil)
        if (currentTheme === "dark" && themeToggle) {
            themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            let theme = document.documentElement.getAttribute("data-theme");
            
            if (theme === "dark") {
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
                themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>'; // Remet la lune
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>'; // Met le soleil
            }
        });
    }

    // 2. NAVBAR DYNAMIQUE (Effet au défilement et Menu Mobile)
    const navbar = document.querySelector("nav") || document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger") || document.querySelector(".navbar-toggler");
    const navLinks = document.querySelector(".nav-links") || document.querySelector(".navbar-collapse");

    // Changement de fond/ombre après 80px de scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    });

    // Menu Hamburger Mobile
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("nav-active");
            hamburger.classList.toggle("toggle-menu");
        });
    }

    // 7. BOUTON RETOUR EN HAUT (Apparition après 300px et défilement fluide)
    const backToTopBtn = document.querySelector(".back-to-top") || document.getElementById("back-to-top");
    
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            // Le bouton s'affiche en flex si on dépasse 300px de scroll, sinon il se cache
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        // Clic sur le bouton : remontée fluide programmée en pur JS
        backToTopBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Annule le comportement par défaut du lien HTML
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 8. ANNÉE DYNAMIQUE DANS LE FOOTER
    const footerYearElements = document.querySelectorAll(".footer-year, footer span, footer p");
    const currentYear = new Date().getFullYear();
    
    footerYearElements.forEach(element => {
        // On cible les textes contenant un copyright ou une date statique pour la remplacer
        if (element.classList.contains("footer-year") || element.textContent.includes("202")) {
            element.innerHTML = element.innerHTML.replace(/202[0-9]/g, currentYear);
        }
    });
});