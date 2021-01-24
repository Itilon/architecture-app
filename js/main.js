document.addEventListener('DOMContentLoaded', () => {
    controlNavbarVisibility();

    const sidenavs = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavs, {});

    sliders = document.querySelectorAll('.slider');
    M.Slider.init(sliders, {});

    const images = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(images, {
        onOpenStart: onOpenStart.bind(null, sliders[0]),
        onCloseEnd: onCloseEnd.bind(null, sliders[0])
    });
});

const controlNavbarVisibility = () => {
    const navbar = document.querySelector('.custom-navbar');

    let previousPosition = window.pageYOffset;

    window.addEventListener('scroll', () => {
        let currentPosition = window.pageYOffset;

        navbar.style.top = (previousPosition < currentPosition && currentPosition > 150) ? '-100px' : '0';

        previousPosition = currentPosition;
    });
};


const onOpenStart = (slider) => {
    if (slider) {
        const sliderInstance = M.Slider.getInstance(slider);
        sliderInstance.pause();
    }
};

const onCloseEnd = (slider) => {
    if (slider) {
        const sliderInstance = M.Slider.getInstance(slider);
        sliderInstance.start();
    }
};