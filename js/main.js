document.addEventListener('DOMContentLoaded', () => {
    const sidenavs = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavs, {});


    const images = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(images, {});
});