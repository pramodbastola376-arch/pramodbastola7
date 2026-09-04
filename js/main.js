/**
 * PRAMOD BASTOLA - PORTFOLIO INTERACTIVE SCRIPTS
 * Modern, Lightweight, Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Mobile Navigation Toggle
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.header');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      
      // Toggle hamburger / close icon
      const icon = mobileToggle.querySelector('svg');
      if (isOpen) {
        icon.innerHTML = '<path d="M18 6L6 18M6 6l12 12"></path>';
      } else {
        icon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16"></path>';
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.querySelector('svg').innerHTML = '<path d="M4 6h16M4 12h16M4 18h16"></path>';
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.querySelector('svg').innerHTML = '<path d="M4 6h16M4 12h16M4 18h16"></path>';
      }
    });
  }

  // -------------------------------------------------------------------------
  // 2. Header Scroll Shadow & Back To Top Visibility
  // -------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Header styling on scroll
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // 3. ScrollSpy: Active Link Highlight
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.scrollY || window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // -------------------------------------------------------------------------
  // 4. Hero Section: Dynamic Typewriter Effect
  // -------------------------------------------------------------------------
  const typeTarget = document.getElementById('typewriterText');
  
  if (typeTarget) {
    const words = [
      'Student',
      'Web Developer',
      'Programmer',
      'Digital Worker'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const holdTime = 1800;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typeTarget.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typeTarget.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        // Pause at end of word
        speed = holdTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  // -------------------------------------------------------------------------
  // 5. Working Contact Form Simulation & Mailto Integration
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please fill out all required fields (Name, Email, and Message).';
        }
        return;
      }

      // Show loading indicator on button
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message...';

      // Simulate sending and prepare mailto link
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <strong>Thank you, ${name}!</strong> Your message has been prepared.<br>
            If your email client didn't open automatically, you can also reach Pramod directly at: 
            <a href="mailto:pramodbastola376@gmail.com" style="color: #00f2fe; text-decoration: underline;">
              pramodbastola376@gmail.com
            </a>.
          `;
        }

        // Open mailto with prefilled inputs
        const mailtoUrl = `mailto:pramodbastola376@gmail.com?subject=${encodeURIComponent(subject || 'Message from Portfolio')}&body=${encodeURIComponent(`Hi Pramod,\n\nMy name is ${name} (${email}).\n\n${message}`)}`;
        
        // Attempt to launch user's mail client
        window.location.href = mailtoUrl;

        // Reset form
        contactForm.reset();
      }, 700);
    });
  }
});
