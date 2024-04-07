function toggleSummary(summaryId) {
    var summary = document.getElementById(summaryId);
    summary.style.display = summary.style.display === 'none' ? 'block' : 'none';
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });