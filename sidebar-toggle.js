document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".sidebar-toggle");
    const closeButton = document.querySelector(".sidebar-close");
    const sidebar = document.querySelector(".sidebar");

    if (toggleButton && sidebar) {
        toggleButton.addEventListener("click", function () {
            sidebar.classList.add("active");
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            sidebar.classList.remove("active");
        });
    }


    sidebar.addEventListener("mouseenter", () => {
        document.body.classList.add("no-scroll");
    });

    sidebar.addEventListener("mouseleave", () => {
        document.body.classList.remove("no-scroll");
    });

});
