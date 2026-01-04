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

// ==========================================
// PROJECT EXPAND/COLLAPSE FUNCTIONALITY
// ==========================================

console.log('🚀 Setting up projects...');

// Function to close all project details
function closeAllProjects() {
  document.querySelectorAll('.project-details').forEach(detail => {
    detail.classList.remove('active');
  });
  document.querySelectorAll('.project-card-simple').forEach(card => {
    card.classList.remove('active');
  });
}

// Setup project cards when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('📦 DOM Ready - Initializing projects');
  
  // Get all project expand buttons
  const expandButtons = document.querySelectorAll('.project-expand-btn');
  console.log('Found buttons:', expandButtons.length);
  
  expandButtons.forEach((button, index) => {
    console.log('Setting up button', index + 1);
    
    button.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('🖱️ Button clicked!');
      
      // Get the parent card
      const card = this.closest('.project-card-simple');
      const projectId = card.getAttribute('data-project');
      console.log('Project ID:', projectId);
      
      // Get the details section
      const details = document.getElementById(projectId);
      console.log('Details found:', details ? 'YES' : 'NO');
      
      if (!details) {
        console.error('❌ Details not found for:', projectId);
        return;
      }
      
      // Check if already open
      const isOpen = details.classList.contains('active');
      console.log('Currently open?', isOpen);
      
      // Close all first
      closeAllProjects();
      
      // If it wasn't open, open it now
      if (!isOpen) {
        details.classList.add('active');
        card.classList.add('active');
        console.log('✨ Opened:', projectId);
        
        // Scroll to details
        setTimeout(() => {
          details.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
          });
        }, 300);
      } else {
        console.log('🔒 Closed');
      }
    });
  });
  
  // Setup close buttons
  const closeButtons = document.querySelectorAll('.project-close-btn');
  console.log('Found close buttons:', closeButtons.length);
  
  closeButtons.forEach((button, index) => {
    console.log('Setting up close button', index + 1);
    
    button.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('❌ Close clicked');
      closeAllProjects();
    });
  });
  
  console.log('✅ All projects initialized!');
});