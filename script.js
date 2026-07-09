/* ==========================================
   VisionAlgo - script.js
========================================== */

// ===============================
// Initialize Lucide Icons
// ===============================
if (window.lucide) {
    lucide.createIcons();
}

// ===============================
// Smooth Scroll
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        if (window.innerWidth <= 768) {
            document.querySelector(".nav-links").classList.remove("show");
        }
    });
});

// ===============================
// Mobile Menu
// ===============================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        hamburger.classList.toggle("active");
    });
}

// ===============================
// Navbar Background on Scroll
// ===============================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.style.background = "rgba(5, 8, 22, 0.95)";
        header.style.boxShadow = "0 15px 40px rgba(0,0,0,.25)";
    } else {
        header.style.background = "rgba(5, 8, 22, 0.65)";
        header.style.boxShadow = "none";
    }
});

// ===============================
// Scroll Progress Bar
// ===============================
const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / pageHeight) * 100;
    progressBar.style.width = progress + "%";
});

// ===============================
// Reveal Animation
// ===============================
const revealElements = document.querySelectorAll(".topic-card, .path-card");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.1 }
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "opacity .6s ease, transform .6s ease";
    observer.observe(element);
});

// ===============================
// Dynamic 3D Card Tilt Engine (FIXED)
// ===============================
const tiltCards = document.querySelectorAll(".dynamic-tilt");

tiltCards.forEach(card => {
    // Find the inner moving child element
    const innerContent = card.querySelector(".card-depth-content");
    if (!innerContent) return;

    card.addEventListener("mousemove", (e) => {
        if (window.innerWidth <= 1024) return;

        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        
        // Coordinates accurately measured from the completely stable bounding container
        const mouseX = e.clientX - cardRect.left - cardWidth / 2;
        const mouseY = e.clientY - cardRect.top - cardHeight / 2;
        
        // Moderate max swing values safely (Max 12 degrees tilt)
        const angleX = -(mouseY / (cardHeight / 2)) * 12;
        const angleY = (mouseX / (cardWidth / 2)) * 12;
        
        // Tilt the INNER content, keeping the main card shell securely fixed in grid space
        innerContent.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02) translateZ(20px)`;
    });

    card.addEventListener("mouseleave", () => {
        // Smoothly drop back to exact flat balance specifications
        if (innerContent) {
            innerContent.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
            innerContent.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)`;
        }
    });
    
    card.addEventListener("mouseenter", () => {
        // Remove tracking transitions during mousemove for ultra-snappy feedback loops
        if (innerContent) {
            innerContent.style.transition = "transform 0.1s ease-out";
        }
    });
});

// ===============================
// Animated Counter
// ===============================
const counters = document.querySelectorAll(".hero-stats h2");

function animateCounter(counter) {
    const text = counter.innerText;
    const number = parseInt(text);
    const suffix = text.replace(number, '');
    let current = 0;
    const increment = number / 80;

    function update() {
        current += increment;
        if (current < number) {
            counter.innerText = Math.floor(current) + suffix;
            requestAnimationFrame(update);
        } else {
            counter.innerText = text;
        }
    }
    update();
}

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }
);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ===============================
// Search filter configuration
// ===============================
const searchInput = document.querySelector(".search-box input");
const topicCards = document.querySelectorAll(".topic-card");

if (searchInput) {
    searchInput.addEventListener("keyup", () => {
        const value = searchInput.value.toLowerCase();
        topicCards.forEach(card => {
            const title = card.querySelector("h3").innerText.toLowerCase();
            const desc = card.querySelector("p").innerText.toLowerCase();
            if (title.includes(value) || desc.includes(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// ===============================
// Active Navbar Context tracker
// ===============================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ===============================
// Mouse Interactive Radial Aura Glow
// ===============================
const glow = document.createElement("div");
glow.style.position = "fixed";
glow.style.width = "300px";
glow.style.height = "300px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.background = "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)";
glow.style.filter = "blur(15px)";
glow.style.zIndex = "-1";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX - 150 + "px";
    glow.style.top = e.clientY - 150 + "px";
});

// ===============================
// Console Welcome
// ===============================
console.log("%cWelcome to VisionAlgo 🚀", "color:#3B82F6;font-size:20px;font-weight:bold;");