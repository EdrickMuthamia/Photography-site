document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');

            // For href="#" (Home link), scroll to top of the page
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Expandable text functionality
    const expandButtons = document.querySelectorAll('.toggle-expand-btn');

    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contentAreaId = this.getAttribute('aria-controls');
            const contentArea = document.getElementById(contentAreaId);

            if (contentArea) {
                const isExpanded = contentArea.classList.toggle('expanded');
                this.textContent = isExpanded ? 'Read Less' : 'Read More';
                this.setAttribute('aria-expanded', isExpanded);
            }
        });
    });

    // Modal functionality
    // Get the modal
    var modal = document.getElementById('imageModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById('modalImage');
    var captionText = document.getElementById('caption');

    // Get all images with class="project-image"
    var projectImages = document.querySelectorAll('.project-image');

    projectImages.forEach(function(img) {
        img.addEventListener('click', function() {
            if(modal && modalImg && captionText) { // Ensure modal elements are found
                modal.style.display = 'block';
                modalImg.src = this.src; // Use the same src for simplicity, or define a data-large-src attribute
                captionText.innerHTML = this.alt;
            }
        });
    });

    // Get the <span> element that closes the modal
    var span = document.querySelector('#imageModal .close-modal-btn'); // More specific selector

    // When the user clicks on <span> (x), close the modal
    if (span && modal) { // Ensure modal and span are found
        span.onclick = function() {
            modal.style.display = 'none';
        }
    }

    // When the user clicks anywhere outside of the modal content (the image itself), close it
    window.onclick = function(event) {
        if (event.target == modal && modal) { // Ensure modal is found
            modal.style.display = 'none';
        }
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const formName = document.getElementById('formName');
    const formEmail = document.getElementById('formEmail');
    const formMessage = document.getElementById('formMessage');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Reset previous errors
            if(nameError) nameError.textContent = '';
            if(emailError) emailError.textContent = '';
            if(messageError) messageError.textContent = '';
            if(formStatus) {
                formStatus.textContent = '';
                formStatus.className = '';
            }

            // Validate Name
            if (formName && formName.value.trim() === '') {
                if(nameError) nameError.textContent = 'Name is required.';
                isValid = false;
            }

            // Validate Email
            if (formEmail && formEmail.value.trim() === '') {
                if(emailError) emailError.textContent = 'Email is required.';
                isValid = false;
            } else if (formEmail && !isValidEmail(formEmail.value.trim())) {
                if(emailError) emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Validate Message
            if (formMessage && formMessage.value.trim() === '') {
                if(messageError) messageError.textContent = 'Message is required.';
                isValid = false;
            }

            if (isValid) {
                if(formStatus) {
                    formStatus.textContent = 'Form submitted successfully! (This is a demo)';
                    formStatus.className = 'success';
                }
                // contactForm.reset(); // Optional
            } else {
                if(formStatus) {
                    formStatus.textContent = 'Please correct the errors above.';
                    formStatus.className = 'error';
                }
            }
        });
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
