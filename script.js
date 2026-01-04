console.log('✅ Script loaded!');

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header && window.scrollY > 100) {
    header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  } else if (header) {
    header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

// Active navigation link highlight
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-links a:not(.resume-btn)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinksArray.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ========================================
// PROJECT EXPAND/COLLAPSE - FIXED SCROLL VERSION
// ========================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjects);
} else {
  initProjects();
}

function initProjects() {
  console.log('🚀 Initializing project expand/collapse...');
  
  // Get all project cards
  const allCards = document.querySelectorAll('.project-card-simple');
  console.log('📦 Found', allCards.length, 'project cards');
  
  // Setup each card
  allCards.forEach((card, index) => {
    const projectId = card.getAttribute('data-project');
    const expandBtn = card.querySelector('.project-expand-btn');
    
    console.log(`Setting up card ${index + 1}:`, projectId);
    
    if (!expandBtn) {
      console.error('❌ No expand button found in card:', projectId);
      return;
    }
    
    if (!projectId) {
      console.error('❌ No data-project attribute on card');
      return;
    }
    
    // Add click event to expand button
    expandBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      
      console.log('🖱️ CLICK detected on:', projectId);
      
      // Find the details section
      const detailsSection = document.getElementById(projectId);
      
      if (!detailsSection) {
        console.error('❌ Could not find details section with ID:', projectId);
        console.log('Available IDs:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
        return;
      }
      
      console.log('✅ Found details section:', projectId);
      
      // Check if currently open
      const isOpen = detailsSection.classList.contains('active');
      console.log('Current state:', isOpen ? 'OPEN' : 'CLOSED');
      
      // Close all details first
      document.querySelectorAll('.project-details').forEach(detail => {
        detail.classList.remove('active');
        console.log('Closed:', detail.id);
      });
      
      // Remove active from all cards
      document.querySelectorAll('.project-card-simple').forEach(c => {
        c.classList.remove('active');
      });
      
      // If it was closed, open it
      if (!isOpen) {
        detailsSection.classList.add('active');
        card.classList.add('active');
        console.log('✨ OPENED:', projectId);
        
        // Scroll to the details section with the title visible
        // Wait for the expand animation to complete
        setTimeout(() => {
          const yOffset = -100; // Offset to account for fixed header
          const element = detailsSection;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }, 400); // Wait for CSS transition to complete
      } else {
        console.log('🔒 CLOSED:', projectId);
      }
    });
    
    // Setup close button
    const detailsSection = document.getElementById(projectId);
    if (detailsSection) {
      const closeBtn = detailsSection.querySelector('.project-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', function(event) {
          event.preventDefault();
          console.log('❌ Close button clicked');
          
          detailsSection.classList.remove('active');
          card.classList.remove('active');
          
          // Scroll back to the project cards grid
          setTimeout(() => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
              const yOffset = -100;
              const y = projectsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
              
              window.scrollTo({
                top: y,
                behavior: 'smooth'
              });
            }
          }, 100);
        });
      } else {
        console.warn('⚠️ No close button found in details section:', projectId);
      }
    }
  });
  
  console.log('✅ Project setup complete!');
  console.log('💡 Try clicking a "View Details" button now...');
}