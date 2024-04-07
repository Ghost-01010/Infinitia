window.addEventListener("load", function () {
    var loadingContainer = document.getElementById("loading-container");
    var websiteContent = document.getElementById("website-content");

    setTimeout(function () {
        loadingContainer.classList.add("hide");
        websiteContent.style.opacity = 1;
        document.body.classList.remove("loading");
    }, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
    var loadingContainer = document.getElementById("loading-container");
    var websiteContent = document.getElementById("website-content");

    function hideLoader() {
        loadingContainer.classList.add("fade-out");
        requestAnimationFrame(function () {
            loadingContainer.style.display = "none";
            websiteContent.style.opacity = 1;
        });
    }

    setTimeout(hideLoader, 1000);
});

function typeText(text) {
    const changingSpan = document.getElementById('changing-span');
    let index = 0;
    const typingInterval = 100;
  
    function typeCharacter() {
        if (index < text.length) {
            changingSpan.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, typingInterval);
        }
    }

    changingSpan.textContent = '';
    typeCharacter();
}

function changeTextLoop() {
    const changingSpan = document.getElementById('changing-span');
    changingSpan.style.backgroundSize = '200%';

    function changeToCoding() {
        changingSpan.style.backgroundPosition = '100%';
        typeText('Coding');
        setTimeout(changeToProgramming, 5000);
    }

    function changeToProgramming() {
        changingSpan.style.backgroundPosition = '100%';
        typeText('Programming');
        setTimeout(changeToWebDevelopment, 5000);
    }

    function changeToWebDevelopment() {
        changingSpan.style.backgroundPosition = '100%';
        typeText('Web Development');
        setTimeout(changeToCoding, 5000);
    }

    changeToCoding();
}

changeTextLoop();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});

// Remove the code related to blogPosts since it was not defined

document.addEventListener("DOMContentLoaded", function() {
    const articleLink = document.querySelector(".dropdown > a");
    const dropdownContent = document.querySelector(".dropdown-content");

    articleLink.addEventListener("click", function(e) {
        e.preventDefault();
        dropdownContent.classList.toggle("show");
    });

    document.addEventListener("click", function(event) {
        if (!event.target.matches(".dropdown > a")) {
            if (dropdownContent.classList.contains("show")) {
                dropdownContent.classList.remove("show");
            }
        }
    });
});

document.querySelector(".loader-wrapper").classList.remove("loader-hidden");
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

    var navLinksContainer = document.querySelector(".nav-links");
    var windowHeight = window.innerHeight;

    function centerNavLinks() {
        var headerHeight = header.offsetHeight;
        var offset = (windowHeight - headerHeight) / 2;
        navLinksContainer.style.top = offset + "px";
    }

    window.addEventListener("resize", centerNavLinks);
    centerNavLinks();
});

 // Get the Instagram and Discord icons
 const instagramIcon = document.getElementById('instagram-icon.png');
 const discordIcon = document.getElementById('discord-icon.png');

 // Get the hover cards
 const instagramCard = document.getElementById('instagram-card');
 const discordCard = document.getElementById('discord-card');

 // Add event listeners for hover
 addHoverEventListeners(instagramIcon, instagramCard);
 addHoverEventListeners(discordIcon, discordCard);

 // Function to add hover event listeners
 function addHoverEventListeners(icon, card) {
     icon.addEventListener('mouseover', () => showHoverCard(card));
     icon.addEventListener('mouseout', () => hideHoverCard(card));
 }

 // Function to show hover card
 function showHoverCard(card) {
     card.style.display = 'block';
 }

 // Function to hide hover card
 function hideHoverCard(card) {
     // Delay hiding to provide a smooth experience
     setTimeout(() => {
         card.style.display = 'none';
     }, 500);
 }

