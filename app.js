/* 
   ==========================================================================
   CLASSIC NETWORK SERVICE - CORE JAVASCRIPT
   Access That Keeps Pace
   ==========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initPlanSelectors();
  initConnectionForm();
});

/**
 * 1. Header Scroll Styling
 * Adds a background shadow and shrinks height when user scrolls down.
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const toggleHeaderState = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Initial check and event binding
  toggleHeaderState();
  window.addEventListener('scroll', toggleHeaderState);
}

/**
 * 2. Mobile Menu & Drawer Toggler
 * Handles mobile hamburger clicks and overlay drawer navigation.
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scrolling when menu is active
    if (hamburger.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close the menu drawer when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

/**
 * 3. Scroll Spy for Active Navigation Links
 * Dynamically highlights the current page section in the navbar while scrolling.
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger activation near the top/middle of the viewport
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));
}

/**
 * 4. Interactive Plan Selectors & Form Injectors
 * Links the 'Select Plan' CTAs to the custom form, auto-populating options and scrolling down.
 */
function initPlanSelectors() {
  const planCTAs = document.querySelectorAll('.btn-plan-select');
  const planDropdown = document.getElementById('formPlan');

  planCTAs.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const planValue = btn.getAttribute('data-plan');
      const targetForm = document.getElementById('contact');
      
      if (planDropdown && planValue) {
        // Set the dropdown to matching value
        planDropdown.value = planValue;
      }
      
      if (targetForm) {
        // Scroll smoothly to form section
        targetForm.scrollIntoView({ behavior: 'smooth' });
        
        // Brief flash on form card to guide the user's eye
        const formCard = targetForm.querySelector('.form-card');
        if (formCard) {
          setTimeout(() => {
            formCard.style.boxShadow = '0 0 35px rgba(133, 147, 196, 0.4)';
            setTimeout(() => {
              formCard.style.boxShadow = '';
            }, 800);
          }, 800);
        }
      }
    });
  });
}

// Local coverage checker UI removed - Google Maps iframe used as replacement

/**
 * 5. Get Connection Form Handler
 * Validates inputs, formats data, displays a loader state, and triggers WhatsApp redirection
 * with neatly formatted customer details in a new tab alongside opening the success overlay.
 */
function initConnectionForm() {
  const form = document.getElementById('connectionForm');
  const successOverlay = document.getElementById('formSuccessOverlay');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  if (!form || !successOverlay) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic Input Validations
    const name = document.getElementById('formName').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const address = document.getElementById('formAddress').value.trim();
    const plan = document.getElementById('formPlan').value;
    const msg = document.getElementById('formMessage').value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!name || !phone || !address || !plan) {
      alert('Please fill out all required fields marked with an asterisk (*).');
      return;
    }

    // Indian Phone format validation: 10 digits (optionally prefixed by country code)
    const phonePattern = /^(?:\+91|0)?[6-9]\d{9}$/;
    if (!phonePattern.test(phone.replace(/\s+/g, ''))) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Change button state to animated spinner/loader
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.8';
    submitBtn.innerHTML = `
      <svg class="spinner" viewBox="0 0 50 50" style="width: 20px; height: 20px; animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 8px;">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" style="stroke-dasharray: 80, 200; stroke-dashoffset: 0;"></circle>
      </svg>
      Opening WhatsApp...
    `;

    // Inject spinner animation dynamically in stylesheet if not present
    if (!document.getElementById('spinner-anim-style')) {
      const style = document.createElement('style');
      style.id = 'spinner-anim-style';
      style.innerHTML = `
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    // Formulate a beautiful, neatly formatted WhatsApp notification message
    let whatsappText = `Hi Classic Network Service,\n\nI would like to request a new high-speed broadband connection!\n\n`;
    whatsappText += `*Full Name:* ${name}\n`;
    whatsappText += `*Mobile Number:* ${phone}\n`;
    whatsappText += `*Installation Address:* ${address}\n`;
    whatsappText += `*Selected Speed Plan:* ${plan}\n`;
    if (msg) {
      whatsappText += `*Landmark / Message:* ${msg}\n`;
    }

    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/919540495039?text=${encodedText}`;

    // Simulate 1.2-second network and lead processing delay before launching WhatsApp
    setTimeout(() => {
      // Revert button state
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.innerHTML = originalBtnText;

      // Open WhatsApp pre-filled chat in a new browser tab
      window.open(whatsappUrl, '_blank');

      // Show animated success checkmark overlay on the parent page
      successOverlay.classList.add('active');
      
      // Reset form fields
      form.reset();
    }, 1200);
  });

  // Close form success dialog overlay
  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
      successOverlay.classList.remove('active');
    });
  }
}
