//Loader
setTimeout(function () {
  $(".loader").fadeOut(500);
  $(".btn-scroll-top").fadeOut(200);
}, 5000);


//Scroll to Top
$(window).scroll(function () {
  if ($(this).scrollTop() >= 50 && ($(this).innerWidth() >= 550)) {
    // If page is scrolled more than 50px
    $(".btn-scroll-top").fadeIn(200); // Fade in the arrow
  } else {
    $(".btn-scroll-top").fadeOut(200); // Else fade out the arrow
  }
});
$(".btn-scroll-top").click(function () {
  // When arrow is clicked
  $("body,html").animate({
      scrollTop: 0 // Scroll to top of body
    },
    300
  );
});

//Typewrite effect
const TypeWriter = function (txtElement, words, wait = 1500) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

TypeWriter.prototype.type = function () {
  //Current index of word
  const current = this.wordIndex % this.words.length;
  //Get full text of current word
  const fullTxt = this.words[current];
  //Check if deleting
  if (this.isDeleting) {
    //Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //Initial Type Speed
  let typeSpeed = 150;

  if (this.isDeleting) {
    typeSpeed /= 1.5;
  }

  //If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    //Make pause at the end
    typeSpeed = this.wait;
    //Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //Move to the next word
    this.wordIndex++;
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

//Init on DOM Load
document.addEventListener("DOMContentLoaded", init);

//Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init typeWriter
  new TypeWriter(txtElement, words, wait);
}

function setClass(els, className, fnName) {
  for (let i = 0; i < els.length; i++) {
    els[i].classList[fnName](className);
  }
}

function accordion() {
  const acc = document.getElementsByClassName("accordion__button");
  const panel = document.getElementsByClassName("accordion__content");

  for (let i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
      let setClasses = !this.classList.contains("active");
      setClass(acc, "active", "remove");
      setClass(panel, "show", "remove");

      if (setClasses) {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
        this.nextElementSibling.style.maxHeight =
          this.nextElementSibling.scrollHeight + "px";
      } else {
        this.nextElementSibling.style.maxHeight = 0;
      }
    };
  }
}

accordion();