// Handling Navigation dropdowns
document.addEventListener('DOMContentLoaded', () => {
    const triggers = {
        'product': document.querySelector('.oneupmenu-trigger-product'),
        'solutions': document.querySelector('.oneupmenu-trigger-solutions'),
        'resources': document.querySelector('.oneupmenu-trigger-resources'),
        'company': document.querySelector('.oneupmenu-trigger-company')
    };

    const dropdowns = {
        'product': document.querySelector('.oneupmenu-products'),
        'solutions': document.querySelector('.oneupmenu-solutions'),
        'resources': document.querySelector('.oneupmenu-resources'),
        'company': document.querySelector('.oneupmenu-company')
    };

    let activeTimeout;

    function closeAllDropdowns() {
        Object.values(dropdowns).forEach(dropdown => {
            if (dropdown) {
                dropdown.classList.remove('oneupmenu-active-dropdown');
                // Use a timeout to set display none after transition
                setTimeout(() => {
                    if (!dropdown.classList.contains('oneupmenu-active-dropdown')) {
                        dropdown.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    function openDropdown(key) {
        if (activeTimeout) clearTimeout(activeTimeout);

        // Close others immediately needed? Or just switch.
        // If we want smooth switch, we might want to close others immediately.
        Object.keys(dropdowns).forEach(k => {
            if (k !== key && dropdowns[k]) {
                dropdowns[k].classList.remove('oneupmenu-active-dropdown');
                dropdowns[k].style.display = 'none';
            }
        });

        const dropdown = dropdowns[key];
        if (dropdown) {
            dropdown.style.display = 'block';
            // Force reflow
            void dropdown.offsetWidth;
            dropdown.classList.add('oneupmenu-active-dropdown');
        }
    }

    Object.keys(triggers).forEach(key => {
        const trigger = triggers[key];
        const dropdown = dropdowns[key];

        if (trigger && dropdown) {
            trigger.addEventListener('mouseenter', () => {
                openDropdown(key);
            });

            trigger.addEventListener('mouseleave', () => {
                activeTimeout = setTimeout(() => {
                    dropdown.classList.remove('oneupmenu-active-dropdown');
                    setTimeout(() => {
                        if (!dropdown.classList.contains('oneupmenu-active-dropdown')) {
                            dropdown.style.display = 'none';
                        }
                    }, 300);
                }, 200); // 200ms delay before closing
            });

            dropdown.addEventListener('mouseenter', () => {
                if (activeTimeout) clearTimeout(activeTimeout);
            });

            dropdown.addEventListener('mouseleave', () => {
                activeTimeout = setTimeout(() => {
                    dropdown.classList.remove('oneupmenu-active-dropdown');
                    setTimeout(() => {
                        if (!dropdown.classList.contains('oneupmenu-active-dropdown')) {
                            dropdown.style.display = 'none';
                        }
                    }, 300);
                }, 200);
            });
        }
    });

    // Product Tab Switching Logic
    const tvBtn = document.querySelector('.oneupmenu-btn-tv');
    const dashboardBtn = document.querySelector('.oneupmenu-btn-dashboard');
    const tvContainer = document.querySelector('.oneupmenu-products-tv-container');
    const dashboardContainer = document.querySelector('.oneupmenu-products-dashboard-container');

    if (tvBtn && dashboardBtn && tvContainer && dashboardContainer) {
        tvBtn.addEventListener('mouseenter', () => {
            tvBtn.classList.add('oneupmenu-btn-active');
            dashboardBtn.classList.remove('oneupmenu-btn-active');

            tvContainer.style.display = 'block';
            dashboardContainer.style.display = 'none';
        });

        dashboardBtn.addEventListener('mouseenter', () => {
            dashboardBtn.classList.add('oneupmenu-btn-active');
            tvBtn.classList.remove('oneupmenu-btn-active');

            dashboardContainer.style.display = 'block';
            tvContainer.style.display = 'none';
        });
    }
});