// Timeline horizontal navigation script
document.addEventListener('DOMContentLoaded', function() {
  const timeline = document.querySelector('#historia-timeline');
  const panels = document.querySelectorAll('.timeline-panel');
  
  if (!timeline || !panels.length) return;

  let currentPanel = 0;
  let isScrolling = false;

  // Navigation function
  function goToPanel(index) {
    if (index < 0 || index >= panels.length || isScrolling) return;
    
    isScrolling = true;
    currentPanel = index;
    
    const targetScroll = index * window.innerWidth;
    
    timeline.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      goToPanel(currentPanel + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      goToPanel(currentPanel - 1);
    }
  });

  // Mouse wheel navigation
  timeline.addEventListener('wheel', function(e) {
    if (isScrolling) return;
    
    e.preventDefault();
    
    if (e.deltaY > 0 || e.deltaX > 0) {
      goToPanel(currentPanel + 1);
    } else if (e.deltaY < 0 || e.deltaX < 0) {
      goToPanel(currentPanel - 1);
    }
  }, { passive: false });

  // Touch navigation for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  timeline.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  timeline.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - go to next panel
        goToPanel(currentPanel + 1);
      } else {
        // Swipe right - go to previous panel
        goToPanel(currentPanel - 1);
      }
    }
  }

  // Update current panel on manual scroll
  timeline.addEventListener('scroll', function() {
    if (!isScrolling) {
      const scrollLeft = timeline.scrollLeft;
      const newPanel = Math.round(scrollLeft / window.innerWidth);
      currentPanel = Math.max(0, Math.min(newPanel, panels.length - 1));
    }
  });

  // Initial setup
  goToPanel(0);
});