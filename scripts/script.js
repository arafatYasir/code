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

    // Mobile Menu Toggle Logic
    const hamburgerIcon = document.querySelector('.oneupmenu-hamburger');
    const crossIcon = document.querySelector('.oneupmenu-cross');
    const mobileNav = document.querySelector('.oneupmenu-mobile-nav');
    const mainNavbar = document.querySelector('.oneupmenu-main-nav');

    // Sub-menus
    const subMenus = {
        'product': document.querySelector('.oneupmenu-products-mobile'),
        'solutions': document.querySelector('.oneupmenu-solutions-mobile'),
        'resources': document.querySelector('.oneupmenu-resources-mobile')
    };

    // Triggers in the main mobile menu
    const mobileTriggers = {
        'product': document.querySelector('.oneupmenu-nav-options-mobile .oneupmenu-trigger-product'),
        'solutions': document.querySelector('.oneupmenu-nav-options-mobile .oneupmenu-trigger-solutions'),
        'resources': document.querySelector('.oneupmenu-nav-options-mobile .oneupmenu-trigger-resources')
    };

    if (hamburgerIcon && crossIcon && mobileNav) {
        // Open mobile menu when hamburger is clicked
        hamburgerIcon.addEventListener('click', () => {
            // Show mobile nav with transition
            mobileNav.style.display = 'flex'; // Changed to flex based on CSS
            // Force reflow
            void mobileNav.offsetWidth;
            mobileNav.classList.add('oneupmenu-mobile-nav-active');

            // Hide hamburger and show cross
            hamburgerIcon.classList.add('oneupmenu-hamburger-hidden');
            crossIcon.classList.add('oneupmenu-cross-active');
        });

        // Close mobile menu when cross is clicked
        crossIcon.addEventListener('click', () => {
            // Helper to close a specific menu element
            const closeMenu = (element) => {
                element.classList.remove('oneupmenu-mobile-nav-active');
                setTimeout(() => {
                    if (!element.classList.contains('oneupmenu-mobile-nav-active')) {
                        element.style.display = 'none';
                    }
                }, 300);
            };

            // Close main nav
            closeMenu(mobileNav);

            // Close any open sub-menus
            Object.values(subMenus).forEach(subMenu => {
                if (subMenu) closeMenu(subMenu);
            });

            // Show hamburger and hide cross
            hamburgerIcon.classList.remove('oneupmenu-hamburger-hidden');
            crossIcon.classList.remove('oneupmenu-cross-active');

            // Ensure navbar is visible (safety)
            if (mainNavbar) mainNavbar.style.display = 'block';
        });

        // Handle Sub-menu opening
        Object.keys(mobileTriggers).forEach(key => {
            const trigger = mobileTriggers[key];
            const subMenu = subMenus[key];

            if (trigger && subMenu) {
                trigger.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent bubbling if needed

                    // Hide main nav list
                    mobileNav.classList.remove('oneupmenu-mobile-nav-active');
                    setTimeout(() => {
                        if (!mobileNav.classList.contains('oneupmenu-mobile-nav-active')) {
                            mobileNav.style.display = 'none';
                        }
                    }, 300);

                    // Hide the TOP navbar
                    if (mainNavbar) mainNavbar.style.display = 'none';

                    // Show sub-menu
                    subMenu.style.display = 'flex';
                    void subMenu.offsetWidth; // Force reflow
                    subMenu.classList.add('oneupmenu-mobile-nav-active');
                });

                // Handle Back Button in Sub-menu
                const backBtn = subMenu.querySelector('.oneupmenu-product-name');
                if (backBtn) {
                    backBtn.addEventListener('click', () => {
                        // Hide sub-menu
                        subMenu.classList.remove('oneupmenu-mobile-nav-active');
                        setTimeout(() => {
                            if (!subMenu.classList.contains('oneupmenu-mobile-nav-active')) {
                                subMenu.style.display = 'none';
                            }
                        }, 300);

                        // Show TOP navbar again
                        if (mainNavbar) mainNavbar.style.display = 'block';

                        // Show main nav list
                        mobileNav.style.display = 'flex';
                        void mobileNav.offsetWidth; // Force reflow
                        mobileNav.classList.add('oneupmenu-mobile-nav-active');
                    });
                }
            }
        });
    }
});