// Handling Navigation dropdowns
const navOptions = document.querySelectorAll('.oneupmenu-nav-options li');

navOptions.forEach(option => {
    option.addEventListener('click', () => {
        navOptions.forEach(option => option.classList.remove('active'));
        option.classList.add('active');
    })
})