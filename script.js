
const nav = document.querySelector(".nav");
const openMenuButton = document.querySelector(".open-menu");
const closeMenuButton = document.querySelector(".close-menu");
const overlay = document.querySelector(".overlay");

const dropdownItems = [...document.querySelectorAll(".nav-item")];
const dropdownButtons = [...document.querySelectorAll(".dropdown-toggle")];

function closeDropdowns(exceptButton = null) {
    dropdownButtons.forEach((button) => {
        if (button === exceptButton) return;

        button.classList.remove("link-open");
        button.setAttribute("aria-expanded", "false");

        const item = button.closest(".nav-item");
        item?.classList.remove("dropdown-open");
    });
}

dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();

        const item = button.closest(".nav-item");
        const isOpen = button.classList.contains("link-open");

        closeDropdowns();

        if (!isOpen) {
            button.classList.add("link-open");
            button.setAttribute("aria-expanded", "true");
            item.classList.add("dropdown-open");
        }
    });
});

function openMobileMenu() {
    nav.classList.add("menu-open");
    nav.style.visibility = "visible";
    nav.style.opacity = "1";

    overlay.classList.add("visible");
    overlay.style.display = "block";
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    overlay.setAttribute("aria-hidden", "false");

    openMenuButton.setAttribute("aria-expanded", "true");
}

function closeMobileMenu() {
    nav.classList.remove("menu-open");
    nav.style.visibility = "";
    nav.style.opacity = "";

    overlay.classList.remove("visible");
    overlay.style.display = "none";
    overlay.style.visibility = "hidden";
    overlay.style.opacity = "0";
    overlay.setAttribute("aria-hidden", "true");

    openMenuButton.setAttribute("aria-expanded", "false");

    closeDropdowns();
}

openMenuButton.addEventListener("click", openMobileMenu);
closeMenuButton.addEventListener("click", closeMobileMenu);
overlay.addEventListener("click", closeMobileMenu);

document.addEventListener("click", (event) => {
    const clickedDropdown = event.target.closest(".nav-item");

    if (!clickedDropdown) {
        closeDropdowns();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeDropdowns();

        if (nav.classList.contains("menu-open")) {
            closeMobileMenu();
            openMenuButton.focus();
        }
    }
});

document.querySelectorAll(".dropdown-link a").forEach((link) => {
    link.addEventListener("click", (event) => {
        if (link.getAttribute("href") === "#") {
            event.preventDefault();
        }

        closeDropdowns();

        if (
            window.innerWidth < 768 &&
            nav.classList.contains("menu-open")
        ) {
            closeMobileMenu();
        }
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
        nav.classList.remove("menu-open");
        nav.style.visibility = "";
        nav.style.opacity = "";

        overlay.classList.remove("visible");
        overlay.style.display = "";
        overlay.style.visibility = "";
        overlay.style.opacity = "";
        overlay.setAttribute("aria-hidden", "true");

        openMenuButton.setAttribute("aria-expanded", "false");
    }
});

// Start with dropdowns closed.
closeDropdowns();
