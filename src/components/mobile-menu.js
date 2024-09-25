document.addEventListener("DOMContentLoaded", function() {
    const menuOpen = document.getElementById("menu-open");
    const menuClose = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("header-nav");

    menuOpen.addEventListener("click", () => {
        menuOpen.style.display = "none";
        menuClose.style.display = "flex";
        mobileMenu.style.display = "flex";
    });

    menuClose.addEventListener("click", () => {
        menuOpen.style.display = "flex";
        menuClose.style.display = "none";
        mobileMenu.style.display = "none";
    });
});
