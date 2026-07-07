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

        header.style.background = "rgba(5,8,22,.95)";
        header.style.boxShadow = "0 15px 40px rgba(0,0,0,.25)";

    } else {

        header.style.background = "rgba(5,8,22,.65)";
        header.style.boxShadow = "none";

    }

});

// ===============================
// Scroll Progress Bar
// ===============================

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / pageHeight) * 100;

    progressBar.style.width = progress + "%";

});

// ===============================
// Reveal Animation
// ===============================

const revealElements = document.querySelectorAll(

    ".topic-card, .path-card, .hero-card"

);

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});

},

{
threshold:.2
}

);

revealElements.forEach(element=>{

element.style.opacity="0";

element.style.transform="translateY(60px)";

element.style.transition="all .8s ease";

observer.observe(element);

});

// ===============================
// Animated Counter
// ===============================

const counters = document.querySelectorAll(".hero-stats h2");

function animateCounter(counter){

const text = counter.innerText;

const number = parseInt(text);

const suffix = text.replace(number,'');

let current = 0;

const increment = number/80;

function update(){

current += increment;

if(current < number){

counter.innerText =
Math.floor(current)+suffix;

requestAnimationFrame(update);

}else{

counter.innerText=text;

}

}

update();

}

const counterObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

animateCounter(entry.target);

counterObserver.unobserve(entry.target);

}

});

}

);

counters.forEach(counter=>{

counterObserver.observe(counter);

});

// ===============================
// Search
// ===============================

const searchInput = document.querySelector(".search-box input");

const topicCards = document.querySelectorAll(".topic-card");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const value =
searchInput.value.toLowerCase();

topicCards.forEach(card=>{

const title =
card.querySelector("h3").innerText.toLowerCase();

const desc =
card.querySelector("p").innerText.toLowerCase();

if(title.includes(value) || desc.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

// ===============================
// Active Navbar
// ===============================

const sections=document.querySelectorAll("section");
const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-150;

if(window.scrollY>=sectionTop){

current=section.getAttribute("id");

}

});

navItems.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

// ===============================
// Mouse Glow
// ===============================

const glow=document.createElement("div");

glow.style.position="fixed";
glow.style.width="250px";
glow.style.height="250px";
glow.style.borderRadius="50%";
glow.style.pointerEvents="none";
glow.style.background="radial-gradient(circle, rgba(59,130,246,.20), transparent 70%)";
glow.style.filter="blur(20px)";
glow.style.zIndex="-1";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX-125+"px";
glow.style.top=e.clientY-125+"px";

});

// ===============================
// Hero Buttons Ripple
// ===============================

document.querySelectorAll(".primary-btn,.secondary-btn,.nav-btn")
.forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="translateY(-4px) scale(1.02)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translateY(0)";

});

});

// ===============================
// Floating Animation
// ===============================

const blobs=document.querySelectorAll(".blob");

blobs.forEach((blob,index)=>{

blob.animate(

[
{
transform:"translateY(0px)"
},
{
transform:"translateY(-35px)"
},
{
transform:"translateY(0px)"
}
],

{

duration:5000+index*1500,

iterations:Infinity

}

);

});

// ===============================
// Console Welcome
// ===============================

console.log("%cWelcome to VisionAlgo 🚀",
"color:#3B82F6;font-size:20px;font-weight:bold;");