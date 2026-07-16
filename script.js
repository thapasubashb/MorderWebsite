/* ==========================================
   VisionAlgo - script.js (Updated Core Engine)
========================================== */

// ===============================
// Initialize Lucide Icons
// ===============================
if (window.lucide) {
    lucide.createIcons();
}

// ===============================
// Smooth Scroll Navigation
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
            const navLinksElement = document.querySelector(".nav-links");
            if(navLinksElement) navLinksElement.classList.remove("show");
        }
    });
});

// ===============================
// Mobile Menu Toggle
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
// Navbar Background Fluid Transitions
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
// Scroll Progress Bar Tracking
// ===============================
const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;
    progressBar.style.width = progress + "%";
});

// ===============================
// Reveal Viewport Animations
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
    { threshold: 0.05 }
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "opacity .6s ease, transform .6s ease";
    observer.observe(element);
});

// ===============================
// Dynamic 3D Card Tilt Engine
// ===============================
const tiltCards = document.querySelectorAll(".dynamic-tilt");

tiltCards.forEach(card => {
    const innerContent = card.querySelector(".card-depth-content") || card.querySelector("pre");
    if (!innerContent) return;

    card.addEventListener("mousemove", (e) => {
        if (window.innerWidth <= 1024) return;

        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        
        const mouseX = e.clientX - cardRect.left - cardWidth / 2;
        const mouseY = e.clientY - cardRect.top - cardHeight / 2;
        
        const angleX = -(mouseY / (cardHeight / 2)) * 12;
        const angleY = (mouseX / (cardWidth / 2)) * 12;
        
        innerContent.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02) translateZ(20px)`;
    });

    card.addEventListener("mouseleave", () => {
        if (innerContent) {
            innerContent.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
            innerContent.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)`;
        }
    });
    
    card.addEventListener("mouseenter", () => {
        if (innerContent) {
            innerContent.style.transition = "transform 0.1s ease-out";
        }
    });
});

// ===============================
// Animated Counters Logic
// ===============================
const counters = document.querySelectorAll(".hero-stats h2");

function animateCounter(counter) {
    const text = counter.innerText;
    const number = parseInt(text);
    const suffix = text.replace(number, '');
    let current = 0;
    const increment = number / 60; // Slightly accelerated pace execution

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

// ===========================================
// Global Subject Search Engine Configuration
// ===========================================
const searchInput = document.querySelector(".search-box input");

if (searchInput) {
    searchInput.addEventListener("keyup", () => {
        const value = searchInput.value.toLowerCase();
        
        // Dynamically discovers all card entities across old and newly added sections
        const allTopicCards = document.querySelectorAll(".topic-card");
        
        allTopicCards.forEach(card => {
            const title = card.querySelector("h3").innerText.toLowerCase();
            const desc = card.querySelector("p").innerText.toLowerCase();
            
            if (title.includes(value) || desc.includes(value)) {
                card.style.display = "block";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// ===========================================
// Extended Active Navbar Context Tracker
// ===========================================
// Scans standard sections along with new Operating System & Network layers
const globalSections = document.querySelectorAll("section, .subject-section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    globalSections.forEach(section => {
        const sectionTop = section.offsetTop - 180;
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
glow.style.background = "radial-gradient(circle, rgba(59, 130, 246, 0.12), transparent 70%)";
glow.style.filter = "blur(15px)";
glow.style.zIndex = "-1";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX - 150 + "px";
    glow.style.top = e.clientY - 150 + "px";
});

console.log("%cVisionAlgo Kernel Extension Complete 🚀", "color:#10B981;font-size:14px;font-weight:bold;");