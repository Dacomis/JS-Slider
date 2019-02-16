var controls = document.querySelectorAll('.controls');
for(var i=0; i < controls.length; i++){
    controls[i].style.display = 'inline-block';
}

var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,5000);

function nextSlide() {
  goToNextSlide();
}

function previousSlide() {
	goToSlide(currentSlide-1);
}

var playing = true;
var pauseButton = document.getElementById('pause');

function pauseSlideshow() {
    pauseButton.innerHTML = '&#9658;'; 
    playing = false;
    clearInterval(slideInterval);
}

function playSlideshow() {
    pauseButton.innerHTML = '&#10074;&#10074;'; 
    playing = true;
    slideInterval = setInterval(nextSlide,5000);
}

pauseButton.onclick = function() {
    if(playing){ pauseSlideshow(); }
    else{ playSlideshow(); }
};

var next = document.getElementById('next');
var previous = document.getElementById('previous');

function goToNextSlide(e) {
  console.log(e)
  const container = $('#slides');
  const currentSlide = $(".slide.showing");
  const prevSlide = $(slides[currentSlide.index() - 1]);
  const nextSlide = $(slides[currentSlide.index() + 1]);

    currentSlide.animate({"left": -currentSlide.outerWidth()}, "fast", complete => {
      currentSlide.css('left', '100%');
    });
    nextSlide.animate({"left": 0}, "fast", complete => {
      nextSlide.css('left', '0');
    });

    currentSlide.removeClass('showing');
    nextSlide.addClass('showing');

    container[0].appendChild(prevSlide[0]);
    slides = document.querySelectorAll('#slides .slide');
}

function goToPrevSlide() {
  const container = $('#slides');
  const currentSlide = $(".slide.showing");
  const prevSlide = $(slides[currentSlide.index() - 1]);
  const lastSlide = $(slides[slides.length - 1]);

    currentSlide.animate({"left": currentSlide.outerWidth()}, "fast", complete => {
      currentSlide.css('left', '100%');
    });
    prevSlide.css('left', '-100%');
    prevSlide.animate({"left": 0}, "fast", complete => {
      prevSlide.css('left', '0');
    });

    currentSlide.removeClass('showing');
    prevSlide.addClass('showing');

    container[0].prepend(lastSlide[0]);
    slides = document.querySelectorAll('#slides .slide');
}

$("#next").on('click', goToNextSlide);
  
$("#previous").on('click', goToPrevSlide);
