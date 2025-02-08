document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".sidebar-toggle");
    const closeButton = document.querySelector(".sidebar-close");
    const sidebar = document.querySelector(".sidebar");
    const rightSidebar = document.querySelector(".right-sidebar");
    const mobileContainer = document.querySelector(".right-sidebar-content-mobile");

    // === Логика для левого сайдбара ===
    function toggleSidebar(open) {
        if (!sidebar) return;

        if (open) {
            sidebar.classList.add("active");
            localStorage.setItem("sidebarOpen", "true");
        } else {
            sidebar.classList.remove("active");
            localStorage.setItem("sidebarOpen", "false");
        }
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", () => toggleSidebar(true));
    }

    if (closeButton) {
        closeButton.addEventListener("click", () => toggleSidebar(false));
    }

    // === Блокировка прокрутки при наведении на сайдбар ===
    if (sidebar) {
        sidebar.addEventListener("mouseenter", () => document.body.classList.add("no-scroll"));
        sidebar.addEventListener("mouseleave", (event) => {
            // Проверяем, что курсор действительно покинул sidebar, а не вложенные элементы
            if (!sidebar.contains(event.relatedTarget)) {
                document.body.classList.remove("no-scroll");
            }
        });
    }

    // === Перенос контента правого сайдбара в мобильную ленту ===
    function moveRightSidebarContent() {
        if (!rightSidebar || !mobileContainer) return;

        if (window.innerWidth <= 768) {
            if (!mobileContainer.hasChildNodes()) {
                mobileContainer.innerHTML = rightSidebar.innerHTML;
            }
        } else {
            mobileContainer.innerHTML = ""; // Очищаем контент при возврате на десктоп
        }
    }

    // === Восстановление состояния сайдбара после перезагрузки ===
    if (localStorage.getItem("sidebarOpen") === "true") {
        toggleSidebar(true);
    }

    // Вызываем при загрузке и изменении размера экрана
    moveRightSidebarContent();
    window.addEventListener("resize", moveRightSidebarContent);
});
