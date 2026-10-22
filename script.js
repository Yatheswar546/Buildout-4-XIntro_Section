
const nav = document.querySelector(".nav");
const openMenuButton = document.querySelector(".open-menu");
const closeMenuButton = document.querySelector(".close-menu");
const overlay = document.querySelector(".overlay");

const dropdownItems = [...document.querySelectorAll(".nav-item")];
const dropdownButtons = [...document.querySelectorAll(".dropdown-toggle")];

function closeDropdowns(exceptItem = null) {
    dropdownItems.forEach((item) => {
        if (item === exceptItem) return;

        item.classList.remove("dropdown-open");

        const button = item.querySelector(".dropdown-toggle");

        if (button) {
            button.setAttribute("aria-expanded", "false");
        }
    });
}

dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();

        const item = button.closest(".nav-item");
        const shouldOpen = !item.classList.contains("dropdown-open");

        closeDropdowns();

        if (shouldOpen) {
            item.classList.add("dropdown-open");
            button.setAttribute("aria-expanded", "true");
        } else {
            item.classList.remove("dropdown-open");
            button.setAttribute("aria-expanded", "false");
        }
    });
});

function openMobileMenu() {
    nav.classList.add("menu-open");
    overlay.classList.add("visible");
    overlay.setAttribute("aria-hidden", "false");
    openMenuButton.setAttribute("aria-expanded", "true");

    closeMenuButton.focus();
}

function closeMobileMenu() {
    nav.classList.remove("menu-open");
    overlay.classList.remove("visible");
    overlay.setAttribute("aria-hidden", "true");
    openMenuButton.setAttribute("aria-expanded", "false");

    closeDropdowns();
    openMenuButton.focus();
}

openMenuButton.addEventListener("click", openMobileMenu);
closeMenuButton.addEventListener("click", closeMobileMenu);

overlay.addEventListener("click", closeMobileMenu);

document.addEventListener("click", (event) => {
    const clickedInsideNavigation = nav.contains(event.target);

    if (!clickedInsideNavigation) {
        closeDropdowns();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeDropdowns();

        if (nav.classList.contains("menu-open")) {
            closeMobileMenu();
        }
    }
});

document.querySelectorAll(".dropdown-link a").forEach((link) => {
    link.addEventListener("click", (event) => {
        // These are placeholder links for the assignment.
        if (link.getAttribute("href") === "#") {
            event.preventDefault();
        }

        closeDropdowns();

        if (window.innerWidth < 768 && nav.classList.contains("menu-open")) {
            closeMobileMenu();
        }
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
        nav.classList.remove("menu-open");
        overlay.classList.remove("visible");
        overlay.setAttribute("aria-hidden", "true");
        openMenuButton.setAttribute("aria-expanded", "false");
    }
});
