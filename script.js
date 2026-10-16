// ===== Accordion Toggle =====
function toggleAccordion(block) {
  const content = block.querySelector('.accordion-content');
  const isOpen = block.classList.contains('open');

  // Close all other accordions
  document.querySelectorAll('.accordion-block.open').forEach(other => {
    if (other !== block) {
      other.classList.remove('open');
      const otherContent = other.querySelector('.accordion-content');
      otherContent.style.height = '0px';
    }
  });

  if (isOpen) {
    block.classList.remove('open');
    content.style.height = '0px';
  } else {
    block.classList.add('open');
    content.style.height = content.scrollHeight + 'px';
  }
}

// ===== Team Block Toggle (same pattern) =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.team-block').forEach(block => {
    block.addEventListener('click', () => {
      const content = block.querySelector('.team-content');
      const isOpen = block.classList.contains('open');

      document.querySelectorAll('.team-block.open').forEach(other => {
        if (other !== block) {
          other.classList.remove('open');
          other.querySelector('.team-content').style.height = '0px';
        }
      });

      if (isOpen) {
        block.classList.remove('open');
        content.style.height = '0px';
      } else {
        block.classList.add('open');
        content.style.height = content.scrollHeight + 'px';
      }
    });
  });
});

// ===== Sticky Mobile CTA =====
document.addEventListener('DOMContentLoaded', () => {
  const stickyCta = document.getElementById('stickyCta');
  const heroCta = document.querySelector('.hero-cta-wrapper');
  const contactSection = document.getElementById('contact');

  if (stickyCta && heroCta) {
    const observer = new IntersectionObserver((entries) => {
      const heroVisible = heroCta.getBoundingClientRect().bottom > 0;
      const contactVisible = contactSection && contactSection.getBoundingClientRect().top < window.innerHeight;

      if (!heroVisible && !contactVisible) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    }, { threshold: 0 });

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroBottom = heroCta.getBoundingClientRect().bottom;
          const contactTop = contactSection ? contactSection.getBoundingClientRect().top : Infinity;
          const windowHeight = window.innerHeight;

          if (heroBottom < 0 && contactTop > windowHeight) {
            stickyCta.classList.add('visible');
          } else {
            stickyCta.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }
});

