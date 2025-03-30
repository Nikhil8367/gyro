const testimonials = [
    {
        text: "An incredibly talented developer! The work is always beyond expectations.",
        name: "John Doe",
        role: "Full-Stack Developer",
        img: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
        text: "Amazing work! The website was built flawlessly and delivered on time.",
        name: "Sarah Lee",
        role: "UI/UX Designer",
        img: "https://randomuser.me/api/portraits/women/42.jpg"
    },
    {
        text: "Highly recommended for any web development project. Great attention to detail!",
        name: "Michael Smith",
        role: "Software Engineer",
        img: "https://randomuser.me/api/portraits/men/39.jpg"
    },
    {
        text: "Outstanding creativity and technical skills! A pleasure to work with.",
        name: "Emily Johnson",
        role: "Product Manager",
        img: "https://randomuser.me/api/portraits/women/50.jpg"
    },
    {
        text: "Professional, efficient, and delivers high-quality work every time!",
        name: "David Wilson",
        role: "Tech Lead",
        img: "https://randomuser.me/api/portraits/men/33.jpg"
    },
    {
        text: "This developer has an amazing ability to turn ideas into reality!",
        name: "Sophia Martinez",
        role: "Entrepreneur",
        img: "https://randomuser.me/api/portraits/women/29.jpg"
    },
    {
        text: "Exceptional problem-solving skills and an eye for detail.",
        name: "James Anderson",
        role: "CTO",
        img: "https://randomuser.me/api/portraits/men/55.jpg"
    },
    {
        text: "One of the best developers I’ve had the pleasure of working with.",
        name: "Olivia Brown",
        role: "Project Manager",
        img: "https://randomuser.me/api/portraits/women/35.jpg"
    }
];


let currentIndex = 0;

const testimonial = document.getElementById("testimonial");
const textElement = document.getElementById("testimonial-text");
const nameElement = document.getElementById("testimonial-name");
const roleElement = document.getElementById("testimonial-role");
const imgElement = document.getElementById("testimonial-img");
const prevArrow = document.getElementById("prevArrow");
const nextArrow = document.getElementById("nextArrow");

prevArrow.addEventListener("click", () => updateTestimonial("left"));
nextArrow.addEventListener("click", () => updateTestimonial("right"));

function updateTestimonial(direction) {
    // Add exit animation (move out)
    testimonial.classList.add(direction === "right" ? "slide-out-left" : "slide-out-right");

    setTimeout(() => {
        // Update index based on direction
        currentIndex = direction === "right"
            ? (currentIndex + 1) % testimonials.length
            : (currentIndex - 1 + testimonials.length) % testimonials.length;

        // Update content
        textElement.textContent = testimonials[currentIndex].text;
        nameElement.textContent = testimonials[currentIndex].name;
        roleElement.textContent = testimonials[currentIndex].role;
        imgElement.src = testimonials[currentIndex].img;

        // Reset class and add entrance animation
        testimonial.classList.remove("slide-out-left", "slide-out-right");
        testimonial.classList.add(direction === "right" ? "slide-in-right" : "slide-in-left");
    }, 500);

    // Remove entrance animation after it completes
    setTimeout(() => {
        testimonial.classList.remove("slide-in-right", "slide-in-left");
    }, 1000);
}


/* ------------------------------------
   🌟 Animated Star Background Logic 
------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("starCanvas");
    if (!canvas) {
        console.error("Error: #starCanvas not found.");
        return;
    }
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];
    let moveX = 0, moveY = 0;
    let useGyro = false;
    let isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    function enableGyro() {
        if (typeof DeviceOrientationEvent.requestPermission === "function") {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === "granted") {
                        useGyro = true;
                        window.addEventListener("deviceorientation", handleGyro);
                    }
                })
                .catch(error => console.error("Gyro Permission Error:", error));
        } else {
            useGyro = true;
            window.addEventListener("deviceorientation", handleGyro);
        }
    }

    function handleGyro(event) {
        if (!useGyro) return;

        if (event.gamma !== null && event.beta !== null) {
            let smoothFactor = 0.05;
            moveX += (event.gamma * 0.2 - moveX) * smoothFactor;
            moveY += (event.beta * 0.1 - moveY) * smoothFactor;
        }
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < 300; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                speedX: Math.random() * 0.05 + 0.02,
                speedY: Math.random() * 0.05 + 0.02,
            });
        }
    }

    function handleMouseMove(event) {
        if (!useGyro) {
            let speedMultiplier = isMobile ? 1 : 3;
            moveX = (event.clientX / window.innerWidth - 0.5) * 3 * speedMultiplier;
            moveY = (event.clientY / window.innerHeight - 0.5) * 3 * speedMultiplier;
        }
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            let speedBoost = isMobile ? 1 : 1.5;
            star.x += moveX * star.speedX * speedBoost;
            star.y += moveY * star.speedY * speedBoost;

            if (star.x < 0) star.x = canvas.width;
            if (star.x > canvas.width) star.x = 0;
            if (star.y < 0) star.y = canvas.height;
            if (star.y > canvas.height) star.y = 0;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.globalAlpha = Math.random() * 0.8 + 0.2;
            ctx.fill();
        });

        requestAnimationFrame(animateStars);
    }

    createStars();
    animateStars();

    if (isMobile) {
        enableGyro();
    } else {
        window.addEventListener("mousemove", handleMouseMove);
    }
});

/* -------------------------------
   🌟 Fade-in & Scroll Animation  
------------------------------- */
function revealSections() {
    let elements = document.querySelectorAll(".fade-in, .fade-out");
    let windowHeight = window.innerHeight;

    elements.forEach((el) => {
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add("reveal");
        } else {
            el.classList.remove("reveal");
        }
    });
}

window.addEventListener("scroll", revealSections);
revealSections(); // Run on page load

document.addEventListener("DOMContentLoaded", function () {
    const fadeInElements = document.querySelectorAll(".fade-in");

    function checkScroll() {
        fadeInElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const inViewport = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;

            if (inViewport) {
                element.classList.add("show");
            } else {
                element.classList.remove("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run once on page load
});
document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        let rect = card.getBoundingClientRect();
        let x = (e.clientX - rect.left) / rect.width - 0.5;
        let y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateY(${x * 40}deg) rotateX(${y * -40}deg) scale(1.1)`;
        card.style.boxShadow = "0px 20px 40px rgba(0, 255, 255, 0.9), 0px 0px 20px cyan";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
        card.style.boxShadow = "0px 5px 15px rgba(0, 255, 255, 0.5)";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const nav = document.querySelector("nav");

    menuIcon.addEventListener("click", function () {
        nav.classList.toggle("show-nav");
    });
});
