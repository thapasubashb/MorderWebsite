document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------------------------------
  // 1. Initialize Lucide Icons
  // -----------------------------------------------------------------
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // -----------------------------------------------------------------
  // 2. Scroll Progress Bar & Scroll-Driven Active Navigation Links
  // -----------------------------------------------------------------
  const progressBar = document.getElementById('progress-bar');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const handleScroll = () => {
    // Calculate scroll progress percentage
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (totalHeight > 0 && progressBar) {
      const scrolledRatio = (windowScroll / totalHeight) * 100;
      progressBar.style.width = `${scrolledRatio}%`;
    }

    // Highlight active section in navigation bar
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // Offset for header height

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial execution on load

  // -----------------------------------------------------------------
  // 3. Mobile Navigation Menu Toggle & Accessibility Controls
  // -----------------------------------------------------------------
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-links');

  if (hamburger && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle('show');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    };

    hamburger.addEventListener('click', toggleMenu);

    // Support accessibility keybindings (Enter / Space)
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close mobile drawer when clicking any link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('show')) {
          navMenu.classList.remove('show');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // -----------------------------------------------------------------
  // 4. Interactive 3D Dynamic Card Tilt Effect
  // -----------------------------------------------------------------
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach((card) => {
    const content = card.querySelector('.card-depth-content') || card;

    const handleMouseMove = (e) => {
      // Disable tilt effect on touch/mobile viewports for better performance
      if (window.innerWidth <= 1024) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (degrees)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      content.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
    };

    const handleMouseLeave = () => {
      content.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
  });

  // -----------------------------------------------------------------
  // 5. Real-Time Dynamic Search Filtering
  // -----------------------------------------------------------------
  const searchInput = document.getElementById('topic-search');
  const searchButton = document.querySelector('.search-box button');
  const topicGrids = document.querySelectorAll('.topic-grid');

  // Create & append a "No Results" message element for each topic section
  topicGrids.forEach((grid) => {
    const noResults = document.createElement('div');
    noResults.className = 'no-results-message';
    noResults.style.display = 'none';
    noResults.innerHTML = '<p>No matching topics found in this category.</p>';
    grid.appendChild(noResults);
  });

  const filterTopics = () => {
    if (!searchInput) return;

    const query = searchInput.value.trim().toLowerCase();

    topicGrids.forEach((grid) => {
      const cards = grid.querySelectorAll('.topic-card');
      const noResults = grid.querySelector('.no-results-message');
      let visibleCount = 0;

      cards.forEach((card) => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent.toLowerCase() || '';

        if (title.includes(query) || description.includes(query)) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Display "No Results" notice if no cards match the active query
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', filterTopics);
  }

  if (searchButton) {
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      filterTopics();

      // Scroll smoothly down to the first subject section when clicking Search
      const firstSubject = document.querySelector('.subject-section');
      if (firstSubject) {
        firstSubject.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // -----------------------------------------------------------------
  // 6. Back To Top Floating Action Button
  // -----------------------------------------------------------------
  const backToTopBtn = document.createElement('button');
  backToTopBtn.type = 'button';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.style.cssText = `
    position: fixed;
    right: 24px;
    bottom: 24px;
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary, #3b82f6), var(--secondary, #8b5cf6));
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
    z-index: 999;
  `;

  document.body.appendChild(backToTopBtn);

  const toggleBackToTop = () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
      backToTopBtn.style.transform = 'translateY(0)';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
      backToTopBtn.style.transform = 'translateY(20px)';
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});