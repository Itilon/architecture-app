document.addEventListener('DOMContentLoaded', () => {
    const sidenavs = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavs, {});

    sliders = document.querySelectorAll('.slider');
    M.Slider.init(sliders, {});

    const images = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(images, {});
});