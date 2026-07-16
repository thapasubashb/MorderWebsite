/* ==========================================
   VisionAlgo - Complete Application Engine
========================================== */

// ==========================================
// 1. INITIALIZE GLOBAL ICONS (LUCIDE)
// ==========================================
if (window.lucide) {
    lucide.createIcons();
}






// ==========================================
// 2. MOBILE MENU & INTERACTIVE DRAWER LOGIC
// ==========================================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        hamburger.classList.toggle("active");
    });
}






// ==========================================
// 3. SMOOTH NAVIGATION SCROLL ENGINE
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        e.preventDefault();
        
        // Retain context by snapping cleanly into place with proper navbar clearance
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        // Close the mobile navigation drawer contextually on mobile clicks
        if (window.innerWidth <= 768 && navLinks && hamburger) {
            navLinks.classList.remove("show");
            hamburger.classList.remove("active");
        }
    });
});






// ==========================================
// 4. NAVBAR FLUID SYNC ON SCROLL
// ==========================================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 40) {
        header.style.background = "rgba(5, 8, 22, 0.95)";
        header.style.boxShadow = "0 15px 40px rgba(0,0,0,.25)";
    } else {
        header.style.background = "rgba(5, 8, 22, 0.65)";
        header.style.boxShadow = "none";
    }
});






// ==========================================
// 5. SCROLL PROGRESS BAR SYSTEM
// ==========================================
const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;
    progressBar.style.width = progress + "%";
});






// ==========================================
// 6. SCROLL REVEAL VIEWPORT ANIMATION ENGINE
// ==========================================
const revealElements = document.querySelectorAll(".topic-card, .path-card");

const revealObserver = new IntersectionObserver(
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
    revealObserver.observe(element);
});







// ==========================================
// 7. DYNAMIC 3D CARD TILT ENGINE
// ==========================================
const tiltCards = document.querySelectorAll(".dynamic-tilt");

tiltCards.forEach(card => {
    // Dynamically captures internal visual depth objects (or terminal containers)
    const innerContent = card.querySelector(".card-depth-content") || card.querySelector("pre");
    if (!innerContent) return;

    card.addEventListener("mousemove", (e) => {
        if (window.innerWidth <= 1024) return; // Disables calculation load on mobile touch displays

        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        
        // Exact spatial center mapping vectors
        const mouseX = e.clientX - cardRect.left - cardWidth / 2;
        const mouseY = e.clientY - cardRect.top - cardHeight / 2;
        
        // Moderate safe swing limits (Max 12 degrees rotation)
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






// ==========================================
// 8. ANIMATED STATUS NUMBERS CONTEXT ENGINE
// ==========================================
const counters = document.querySelectorAll(".hero-stats h2");

function animateCounter(counter) {
    const text = counter.innerText;
    const number = parseInt(text);
    const suffix = text.replace(number, '');
    let current = 0;
    const increment = number / 60; // Fluid update curve pacing

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

// ==========================================
// 9. LIVE DATA SEARCH ENGINE (GLOBAL MULTI-SUBJECT)
// ==========================================
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const topicGrid = document.querySelector(".topic-grid");
const allTopicCards = document.querySelectorAll(".topic-card");
const sectionLinks = document.querySelectorAll(".nav-links a[href^='#']");
const sections = document.querySelectorAll("section[id]");

const noResultsMessage = document.createElement("div");
noResultsMessage.className = "no-results-message";
noResultsMessage.innerHTML = `<p>No matching topics were found. Try a broader search term.</p>`;

function filterTopics(query) {
    const normalized = query.toLowerCase().trim();
    let visibleCount = 0;

    allTopicCards.forEach(card => {
        const title = card.querySelector("h3").innerText.toLowerCase();
        const desc = card.querySelector("p").innerText.toLowerCase();
        const matches = !normalized || title.includes(normalized) || desc.includes(normalized);

        card.style.display = matches ? "block" : "none";
        if (matches) visibleCount++;
    });

    if (topicGrid) {
        if (visibleCount === 0) {
            if (!topicGrid.contains(noResultsMessage)) {
                topicGrid.appendChild(noResultsMessage);
            }
        } else {
            if (topicGrid.contains(noResultsMessage)) {
                topicGrid.removeChild(noResultsMessage);
            }
        }
    }
}

if (searchInput) {
    searchInput.addEventListener("keyup", (event) => {
        filterTopics(searchInput.value);
        if (event.key === "Enter") {
            searchInput.blur();
        }
    });
}

if (searchButton) {
    searchButton.addEventListener("click", () => filterTopics(searchInput ? searchInput.value : ""));
}

// ==========================================
// 10. ACTIVE NAVIGATION TRACKER
// ==========================================
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (!link) return;

            if (entry.isIntersecting) {
                sectionLinks.forEach(item => item.classList.remove("active"));
                link.classList.add("active");
            }
        });
    },
    { threshold: 0.45 }
);

sections.forEach(section => sectionObserver.observe(section));

// ==========================================
// 11. BACK TO TOP BUTTON
// ==========================================
function createBackToTopButton() {
    const button = document.createElement("button");
    button.className = "back-to-top";
    button.type = "button";
    button.innerText = "↑";
    button.title = "Back to top";

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.appendChild(button);
    return button;
}

const backToTopButton = createBackToTopButton();

window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
        backToTopButton.classList.add("visible");
    } else {
        backToTopButton.classList.remove("visible");
    }
});






// ==========================================
// 10. ACTIVE NAVBAR SUBJECTS TRACKER SYSTEM
// ==========================================
const globalSections = document.querySelectorAll("section, #topics, #os-topics, #cn-topics");
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









// ==========================================
// 11. MOUSE INTERACTIVE RADIAL BACKFLUID GLOW
// ==========================================
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

console.log("%cVisionAlgo Kernel System Boot Complete 🚀", "color:#3B82F6;font-size:14px;font-weight:bold;");