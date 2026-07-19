/* =========================
   DOM ELEMENTS
========================== */


const loader = document.querySelector(".loader");

const header = document.querySelector(".header");

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

const navItems = document.querySelectorAll(".nav-links a");

const sections = document.querySelectorAll("section");





/* =========================
   PAGE LOADER
========================== */


window.addEventListener("load", () => {


    setTimeout(() => {


        loader.style.opacity = "0";


        loader.style.visibility = "hidden";


    }, 1000);



});








/* =========================
   MOBILE NAVBAR
========================== */


menuToggle.addEventListener("click", () => {


    navLinks.classList.toggle("active");


    const icon = menuToggle.querySelector("i");


    if(navLinks.classList.contains("active")){


        icon.classList.remove("fa-bars");


        icon.classList.add("fa-xmark");


    }

    else {


        icon.classList.remove("fa-xmark");


        icon.classList.add("fa-bars");


    }



});







// Close menu when clicking a link


navItems.forEach(link => {


    link.addEventListener("click", () => {


        navLinks.classList.remove("active");


        const icon =
        menuToggle.querySelector("i");


        icon.classList.remove("fa-xmark");


        icon.classList.add("fa-bars");



    });



});









/* =========================
   STICKY HEADER
========================== */


window.addEventListener("scroll",()=>{


    if(window.scrollY > 80){


        header.classList.add("scrolled");


    }


    else{


        header.classList.remove("scrolled");


    }



});









/* =========================
   ACTIVE NAVIGATION
========================== */


window.addEventListener("scroll",()=>{


    let current = "";



    sections.forEach(section=>{


        const sectionTop =
        section.offsetTop - 120;



        const sectionHeight =
        section.clientHeight;



        if(
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ){


            current =
            section.getAttribute("id");


        }



    });




    navItems.forEach(link=>{


        link.classList.remove("active");



        if(
            link.getAttribute("href") ===
            "#" + current
        ){


            link.classList.add("active");


        }



    });



});









/* =========================
   SMOOTH SCROLLING
========================== */


navItems.forEach(link=>{


    link.addEventListener("click",(e)=>{


        const target =
        document.querySelector(
            link.getAttribute("href")
        );



        if(target){


            e.preventDefault();



            target.scrollIntoView({

                behavior:"smooth"

            });


        }



    });


});









/* =========================
   SCROLL REVEAL ANIMATION
========================== */


const revealElements =
document.querySelectorAll(
".reveal, .reveal-left, .reveal-right"
);





const revealObserver =
new IntersectionObserver(
(entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add("active");


            revealObserver.unobserve(
                entry.target
            );


        }



    });



},
{
    threshold:.15
});






revealElements.forEach(element=>{


    revealObserver.observe(element);



});








/* =========================
   STATISTICS COUNTER
========================== */


const counters =
document.querySelectorAll(
".counter-box h2"
);



let counterStarted = false;



const counterObserver =
new IntersectionObserver(
(entries)=>{


    entries.forEach(entry=>{


        if(
            entry.isIntersecting &&
            !counterStarted
        ){


            startCounters();


            counterStarted = true;


        }



    });



},
{
    threshold:.5
});





if(counters.length){


    counterObserver.observe(
        document.querySelector(".statistics")
    );


}






function startCounters(){


    counters.forEach(counter=>{


        const target =
        Number(
            counter.dataset.count
        );


        let current = 0;



        const increment =
        target / 100;



        const update = ()=>{


            current += increment;



            if(current < target){


                counter.textContent =
                Math.ceil(current);



                requestAnimationFrame(update);


            }

            else{


                counter.textContent =
                target + "+";


            }



        };



        update();



    });



}

/* =========================
   APPOINTMENT FORM VALIDATION
========================== */


const appointmentForm =
document.getElementById(
    "appointmentForm"
);



const notification =
document.querySelector(
    ".notification"
);





if(appointmentForm){


appointmentForm.addEventListener(
"submit",
(e)=>{


    e.preventDefault();



    const name =
    document.getElementById("name").value.trim();


    const email =
    document.getElementById("email").value.trim();


    const phone =
    document.getElementById("phone").value.trim();



    if(
        name === "" ||
        email === "" ||
        phone === ""
    ){


        showNotification(
            "Please complete all required fields",
            "error"
        );


        return;


    }





    if(!validateEmail(email)){


        showNotification(
            "Please enter a valid email",
            "error"
        );


        return;


    }





    showNotification(
        "Appointment submitted successfully!",
        "success"
    );



    appointmentForm.reset();



});


}






function validateEmail(email){


    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);


}








/* =========================
   NOTIFICATION POPUP
========================== */


function showNotification(message,type){


    if(!notification)
        return;



    notification.querySelector("span")
    .textContent = message;




    if(type==="error"){


        notification.classList.add("error");


    }

    else{


        notification.classList.remove("error");


    }




    notification.classList.add("show");



    setTimeout(()=>{


        notification.classList.remove("show");


    },3000);



}









/* =========================
   FAQ ACCORDION
========================== */


const faqItems =
document.querySelectorAll(
".faq-item"
);





faqItems.forEach(item=>{


    const question =
    item.querySelector(
        ".faq-question"
    );


    question.addEventListener(
    "click",
    ()=>{


        faqItems.forEach(other=>{


            if(other !== item){


                other.classList.remove(
                    "active"
                );


            }


        });




        item.classList.toggle(
            "active"
        );



        const icon =
        question.querySelector("i");



        if(
            item.classList.contains(
                "active"
            )
        ){


            icon.classList.replace(
                "fa-plus",
                "fa-minus"
            );


        }

        else{


            icon.classList.replace(
                "fa-minus",
                "fa-plus"
            );


        }



    });



});









/* =========================
   TESTIMONIAL SLIDER
========================== */


const testimonials =
document.querySelectorAll(
".testimonial"
);



let testimonialIndex = 0;



function changeTestimonial(){


    if(testimonials.length === 0)
        return;



    testimonials.forEach(item=>{


        item.classList.remove(
            "active"
        );


    });



    testimonialIndex++;



    if(
        testimonialIndex >=
        testimonials.length
    ){


        testimonialIndex = 0;


    }





    testimonials[testimonialIndex]
    .classList.add(
        "active"
    );


}




if(testimonials.length){


setInterval(
    changeTestimonial,
    4000
);


}









/* =========================
   GALLERY LIGHTBOX
========================== */


const galleryImages =
document.querySelectorAll(
".gallery-item img"
);



const lightbox =
document.querySelector(
".lightbox"
);



const lightboxImage =
document.querySelector(
".lightbox img"
);



const closeLightbox =
document.querySelector(
".close-lightbox"
);






galleryImages.forEach(image=>{


    image.addEventListener(
    "click",
    ()=>{


        lightbox.classList.add(
            "active"
        );


        lightboxImage.src =
        image.src;



    });


});






if(closeLightbox){


closeLightbox.addEventListener(
"click",
()=>{


    lightbox.classList.remove(
        "active"
    );


});


}







if(lightbox){


lightbox.addEventListener(
"click",
(e)=>{


    if(e.target === lightbox){


        lightbox.classList.remove(
            "active"
        );


    }


});


}









/* =========================
   SCROLL TO TOP
========================== */


const scrollTop =
document.querySelector(
".scroll-top"
);





window.addEventListener(
"scroll",
()=>{


    if(
        window.scrollY > 500
    ){


        scrollTop.classList.add(
            "show"
        );


    }

    else{


        scrollTop.classList.remove(
            "show"
        );


    }



});






if(scrollTop){


scrollTop.addEventListener(
"click",
()=>{


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });



});


}









/* =========================
   CLOSE LIGHTBOX WITH ESC
========================== */


document.addEventListener(
"keydown",
(e)=>{


    if(
        e.key === "Escape" &&
        lightbox
    ){


        lightbox.classList.remove(
            "active"
        );


    }


});









/* =========================
   LAZY IMAGE FALLBACK
========================== */


const images =
document.querySelectorAll(
"img"
);



images.forEach(img=>{


    img.addEventListener(
    "error",
    ()=>{


        img.src =
        "images/placeholder.jpg";


    });


});








/* =========================
   BUTTON RIPPLE EFFECT
========================== */


const buttons =
document.querySelectorAll(
".btn, .small-btn"
);



buttons.forEach(button=>{


button.addEventListener(
"click",
function(e){



    const ripple =
    document.createElement(
        "span"
    );



    ripple.className =
    "ripple";



    const rect =
    this.getBoundingClientRect();



    ripple.style.left =
    `${e.clientX - rect.left}px`;



    ripple.style.top =
    `${e.clientY - rect.top}px`;



    this.appendChild(
        ripple
    );



    setTimeout(()=>{


        ripple.remove();


    },600);



});


});

