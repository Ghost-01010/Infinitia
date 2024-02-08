window.addEventListener("load", function () {
    var loadingContainer = document.getElementById("loading-container");
    var websiteContent = document.getElementById("website-content");

    setTimeout(function () {
        loadingContainer.classList.add("hide"); // Add the hide class to hide the loader with a delay
        websiteContent.style.opacity = 1; // Make the website content fully visible
        document.body.classList.remove("loading"); // Remove the "loading" class from the body
    }, 1000); // Delayed hiding after 1 second
});

document.addEventListener("DOMContentLoaded", function () {
    // Wait for the DOM to be fully loaded before executing the code

    var loadingContainer = document.getElementById("loading-container");
    var websiteContent = document.getElementById("website-content");

    // Function to hide the loader and show the website content
    function hideLoader() {
        // Add a class to fade out the loading container
        loadingContainer.classList.add("fade-out");

        // Use requestAnimationFrame to ensure smooth transitions
        requestAnimationFrame(function () {
            loadingContainer.style.display = "none"; // Hide the loader
            websiteContent.style.opacity = 1; // Make the website content fully visible
        });
    }

    // Simulate a delay (you can adjust the duration as needed)
    setTimeout(hideLoader, 1000); // Delayed hiding after 1 second
});

// Function to simulate typing animation
function typeText(text) {
    const changingSpan = document.getElementById('changing-span');
    let index = 0;
    const typingInterval = 100; // Adjust the typing speed as desired (milliseconds)
  
    function typeCharacter() {
      if (index < text.length) {
        changingSpan.textContent += text.charAt(index);
        index++;
        setTimeout(typeCharacter, typingInterval);
      }
    }
  
    // Clear the existing text before typing
    changingSpan.textContent = '';
    typeCharacter();
  }
  
  // Function to change the text sequentially
  function changeTextLoop() {
    const changingSpan = document.getElementById('changing-span');
  changingSpan.style.backgroundSize = '200%'; // Adjust the background size as needed

  function changeToCoding() {
    changingSpan.style.backgroundPosition = '100%'; // Reveal the text
    typeText('Coding');
    setTimeout(changeToProgramming, 5000); // Change to "Programming" after 5 seconds
  }

  function changeToProgramming() {
    changingSpan.style.backgroundPosition = '100%'; // Reveal the text
    typeText('Programming');
    setTimeout(changeToWebDevelopment, 5000); // Change to "Web Development" after 5 seconds
  }

  function changeToWebDevelopment() {
    changingSpan.style.backgroundPosition = '100%'; // Reveal the text
    typeText('Web Development');
    setTimeout(changeToCoding, 5000); // Change to "Coding" after 5 seconds
  }

  // Start the loop by transitioning to the first word
  changeToCoding();
}

// Call the function to start the looping text change
changeTextLoop();
  
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Adjust the offset if you have a fixed header
                behavior: 'smooth'
            });
        }
    });
});

const blogPostsContainer = document.querySelector('.blog-posts');

blogPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>Posted on: ${post.date}</p>
        <p>${post.content}</p>
    `;
    blogPostsContainer.appendChild(postElement);
});

// Example: Interactive portfolio gallery (replace with your data)
const portfolioItems = [
    { category: 'web', image: 'project1.jpg', description: 'Project 1 description.' },
    { category: 'design', image: 'project2.jpg', description: 'Project 2 description.' },
    { category: 'web', image: 'project3.jpg', description: 'Project 3 description.' }
];

const portfolioGallery = document.querySelector('.portfolio-gallery');

portfolioItems.forEach(item => {
    const portfolioItem = document.createElement('div');
    portfolioItem.classList.add('portfolio-item');
    portfolioItem.setAttribute('data-category', item.category);
    portfolioItem.innerHTML = `
        <img src="${item.image}" alt="${item.description}">
        <p>${item.description}</p>
    `;
    portfolioGallery.appendChild(portfolioItem);
});

document.addEventListener("DOMContentLoaded", function() {
    const articleLink = document.querySelector(".dropdown > a");
    const dropdownContent = document.querySelector(".dropdown-content");

    articleLink.addEventListener("click", function(e) {
        e.preventDefault(); // Prevent the link from navigating
        dropdownContent.classList.toggle("show");
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener("click", function(event) {
        if (!event.target.matches(".dropdown > a")) {
            if (dropdownContent.classList.contains("show")) {
                dropdownContent.classList.remove("show");
            }
        }
    });
});

// Show the loader (add the class)
document.querySelector(".loader-wrapper").classList.remove("loader-hidden");

// Hide the loader (remove the class)
document.querySelector(".loader-wrapper").classList.add("loader-hidden");

document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector("header");
    var nav = document.querySelector("nav");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            header.classList.add("sticky");
            nav.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
            nav.classList.remove("sticky");
        }
    });

    // Centering navigation links vertically
    var navLinksContainer = document.querySelector(".nav-links");
    var windowHeight = window.innerHeight;

    function centerNavLinks() {
        var headerHeight = header.offsetHeight;
        var offset = (windowHeight - headerHeight) / 2;
        navLinksContainer.style.top = offset + "px";
    }

    window.addEventListener("resize", centerNavLinks);
    centerNavLinks(); // Call it initially
});
