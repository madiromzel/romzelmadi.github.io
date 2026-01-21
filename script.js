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

// Typewriter effect for hero text
const typewriterElements = [
  { selector: '.type-intro', speed: 60, delay: 120 },
  { selector: '.type-name', speed: 65, delay: 160 },
  { selector: '.type-desc', speed: 14, delay: 120 }
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
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typewriterElements.forEach(item => {
      const el = document.querySelector(item.selector);
      if (!el) {
        return;
      }
      el.textContent = el.getAttribute('data-text') || '';
    });
    if (cta) {
      cta.classList.add('show-cta');
    }
    return;
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
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const idToLink = new Map(
  navLinks.map(link => [link.getAttribute('href').replace('#', ''), link])
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
      if (entry.intersectionRatio >= 0.55 && id && idToLink.has(id)) {
        navLinks.forEach(l => l.classList.remove('active'));
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
