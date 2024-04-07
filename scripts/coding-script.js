    // Same JavaScript as the original webpage
    function toggleSummary(summaryId) {
        var summary = document.getElementById(summaryId);
        summary.style.maxHeight = summary.style.maxHeight === '0px' ? summary.scrollHeight + 'px' : '0px';
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
  
      function toggleNav() {
        var nav = document.querySelector('nav');
        nav.style.height = nav.style.height === '0px' ? 'auto' : '0px';
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