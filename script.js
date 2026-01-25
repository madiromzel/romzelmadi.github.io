// Smooth scrolling for navbar links
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');
const navItems = document.querySelectorAll('.nav-links a');

if (navToggle && navbar) {
  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navItems.forEach(link => {
    link.addEventListener('click', () => {
      if (!navbar.classList.contains('nav-open')) {
        return;
      }
      navbar.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}


// Typewriter effect for hero text
const typewriterElements = [
  { selector: '.type-intro', speed: 60, delay: 120 },
  { selector: '.type-name', speed: 65, delay: 160 },
  { selector: '.type-desc', speed: 14, delay: 120 },
  { selector: '.project-subtitle.typewriter', speed: 22, delay: 160 },
  { selector: '.project-tech.typewriter', speed: 18, delay: 180 }
];

const typeText = (el, text, speed) => new Promise(resolve => {
  let index = 0;
  el.textContent = '';
  el.classList.add('typing-caret');

  const tick = () => {
    el.textContent = text.slice(0, index);
    if (index < text.length) {
      index += 1;
      setTimeout(tick, speed);
      return;
    }
    el.classList.remove('typing-caret');
    resolve();
  };

  tick();
});

const runTypewriter = async () => {
  const cta = document.querySelector('.delayed-cta');
  const projectTitle = document.querySelector('.flip-title');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typewriterElements.forEach(item => {
      const el = document.querySelector(item.selector);
      if (!el) {
        return;
      }
      el.textContent = el.getAttribute('data-text') || '';
    });
    if (projectTitle) {
      projectTitle.classList.add('is-flipped');
    }
    if (cta) {
      cta.classList.add('show-cta');
    }
    return;
  }

  if (projectTitle) {
    projectTitle.classList.add('is-flipped');
    await new Promise(resolve => setTimeout(resolve, 720));
  }

  for (const item of typewriterElements) {
    const el = document.querySelector(item.selector);
    if (!el) {
      continue;
    }
    const text = el.getAttribute('data-text') || '';
    await new Promise(resolve => setTimeout(resolve, item.delay));
    await typeText(el, text, item.speed);
  }

  if (cta) {
    cta.classList.add('show-cta');
  }
};

document.addEventListener('DOMContentLoaded', runTypewriter);

// Projects cover flip
const projectsSection = document.querySelector('.projects');
const projectsCover = document.querySelector('.projects-cover');

const flipProjects = () => {
  if (!projectsSection) {
    return;
  }
  projectsSection.classList.add('flipped');
};

if (projectsCover) {
  projectsCover.addEventListener('click', flipProjects);
  projectsCover.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      flipProjects();
    }
  });
}

if (projectsSection) {
  projectsSection.addEventListener('click', event => {
    if (!projectsSection.classList.contains('flipped')) {
      return;
    }
    if (event.target.closest('.projects-cover')) {
      return;
    }
    if (event.target.closest('.project-card')) {
      return;
    }
    projectsSection.classList.remove('flipped');
  });
}

// Tech Stack cover slide
const stackSection = document.querySelector('.stack');
const stackRevealBtn = document.querySelector('.stack-reveal');
const stackHideBtn = document.querySelector('.stack-hide');
const stackTrack = document.querySelector('.stack-track');
const stackItems = stackTrack ? Array.from(stackTrack.querySelectorAll('.icon-box')) : [];
const stackPrev = document.querySelector('.stack-prev');
const stackNext = document.querySelector('.stack-next');
const resumeSection = document.querySelector('.resume');
const resumeRevealBtn = document.querySelector('.resume-reveal');

if (stackRevealBtn && stackSection) {
  stackRevealBtn.addEventListener('click', () => {
    stackSection.classList.add('revealed');
  });
}

if (stackHideBtn && stackSection) {
  stackHideBtn.addEventListener('click', () => {
    stackSection.classList.remove('revealed');
  });
}

if (stackTrack && stackItems.length) {
  let stackIndex = 0;

  const updateStack = () => {
    stackTrack.style.transform = `translateX(-${stackIndex * 100}%)`;
  };

  const goPrev = () => {
    stackIndex = (stackIndex - 1 + stackItems.length) % stackItems.length;
    updateStack();
  };

  const goNext = () => {
    stackIndex = (stackIndex + 1) % stackItems.length;
    updateStack();
  };

  if (stackPrev) {
    stackPrev.addEventListener('click', goPrev);
  }

  if (stackNext) {
    stackNext.addEventListener('click', goNext);
  }
}

// Project gallery carousel
const galleryCarousels = document.querySelectorAll('.gallery-carousel');

galleryCarousels.forEach(carousel => {
  const track = carousel.querySelector('.gallery-track');
  const items = track ? Array.from(track.querySelectorAll('.gallery-item')) : [];
  const prevBtn = carousel.querySelector('.gallery-prev');
  const nextBtn = carousel.querySelector('.gallery-next');

  if (!track || items.length === 0) {
    return;
  }

  let galleryIndex = 0;

  const updateGallery = () => {
    track.style.transform = `translateX(-${galleryIndex * 100}%)`;
  };

  const goPrev = () => {
    galleryIndex = (galleryIndex - 1 + items.length) % items.length;
    updateGallery();
  };

  const goNext = () => {
    galleryIndex = (galleryIndex + 1) % items.length;
    updateGallery();
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', goPrev);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', goNext);
  }
});

// Feature carousel
const featureCarousels = document.querySelectorAll('.feature-carousel');

featureCarousels.forEach(carousel => {
  const track = carousel.querySelector('.feature-track');
  const slides = track ? Array.from(track.querySelectorAll('.feature-slide')) : [];
  const prevBtn = carousel.querySelector('.feature-prev');
  const nextBtn = carousel.querySelector('.feature-next');
  const medias = carousel.querySelectorAll('.feature-media');
  const lightbox = document.querySelector('.feature-lightbox');
  const lightboxImage = lightbox ? lightbox.querySelector('.feature-lightbox-image') : null;

  if (!track || slides.length === 0) {
    return;
  }

  let featureIndex = 0;

  const updateFeature = () => {
    track.style.transform = `translateX(-${featureIndex * 100}%)`;
    if (lightbox) {
      lightbox.classList.remove('is-active');
    }
  };

  const goPrev = () => {
    featureIndex = (featureIndex - 1 + slides.length) % slides.length;
    updateFeature();
  };

  const goNext = () => {
    featureIndex = (featureIndex + 1) % slides.length;
    updateFeature();
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', goPrev);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', goNext);
  }

  if (lightbox && lightboxImage) {
    medias.forEach(media => {
      const src = media.getAttribute('data-pop') || '';
      media.addEventListener('mouseenter', () => {
        if (!src) {
          return;
        }
        lightboxImage.src = src;
        lightbox.classList.add('is-active');
      });
      media.addEventListener('mouseleave', () => {
        lightbox.classList.remove('is-active');
      });
    });
  }
});

if (resumeSection && resumeRevealBtn) {
  resumeRevealBtn.addEventListener('click', () => {
    resumeSection.classList.toggle('revealed');
  });
}

if (resumeSection) {
  resumeSection.addEventListener('click', event => {
    if (!resumeSection.classList.contains('revealed')) {
      return;
    }
    if (event.target.closest('.resume-btn')) {
      return;
    }
    if (event.target.closest('.resume-reveal')) {
      return;
    }
    resumeSection.classList.remove('revealed');
  });
}

// Intersection Observer for reveal animations and active nav link
const sections = document.querySelectorAll('section');
const navLinkList = Array.from(document.querySelectorAll('.nav-links a'));
const idToLink = new Map(
  navLinkList.map(link => [link.getAttribute('href').replace('#', ''), link])
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
      if (entry.intersectionRatio >= 0.55 && id && idToLink.has(id)) {
        navLinkList.forEach(l => l.classList.remove('active'));
        idToLink.get(id).classList.add('active');
      }
    });
  },
  {
    root: null,
    rootMargin: '-45% 0px -45% 0px',
    threshold: [0, 0.25, 0.55, 0.75, 1]
  }
);

sections.forEach(section => observer.observe(section));

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');

const toggleBackToTop = () => {
  const show = window.scrollY > window.innerHeight * 0.8;
  backToTopBtn.classList.toggle('show', show);
};

window.addEventListener('scroll', toggleBackToTop);
toggleBackToTop();

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
