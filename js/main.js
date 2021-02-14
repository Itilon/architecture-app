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

    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm.bind(null, contactForm));
    }
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

const submitContactForm = (form) => {
    this.event.preventDefault();

    sendFormData(form)
        .then((response) => {
            if (!response.ok) {
                throw new Error();
            }

            [...form.elements].forEach((element) => {
                element.value = '';
            });

            populateFormMessage(form, true);
        })
        .catch(() => {
            populateFormMessage(form, false);
        });
};

const sendFormData = (form) => {
    const endpoint = form.action;
    const method = form.method;
    const formData = new FormData(form);
    
    return fetch(
        endpoint,
        {
            method,
            body: formData 
        }
    );
};

const populateFormMessage = (form, isSuccess) => {
    const messageContainer = isSuccess ?
        createElement('div', 'success-message', null) :
        createElement('div', 'error-message', null);

    const message = isSuccess ?
        createElement('p', null, 'Съобщението е изпратено успешно.') :
        createElement('p', null, 'Нещо се обърка. Моля, опитай отново.');

    const exitBtn = createElement('span', 'exit-btn', '&#10005');

    messageContainer.appendChild(message);
    messageContainer.appendChild(exitBtn);

    form.prepend(messageContainer);

    exitBtn.addEventListener('click', () => removeElement(messageContainer));

    setTimeout(() => removeElement(messageContainer), 5000);
};

const createElement = (tagName, className, innerText) => {
    const element = document.createElement(tagName);
    element.classList.add(className);
    element.innerHTML = innerText;
    return element;
};

const removeElement = (element) => {
    element.remove();
};
