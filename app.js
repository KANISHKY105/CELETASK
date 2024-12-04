class Slide {
    constructor(imagePath) {
        this.background = imagePath;
    }
}

var slide1 = new Slide("public/photo1.jpg");
var slide2 = new Slide("public/photo2.jpg");
var slide3 = new Slide("public/photo3.jpg");

var slidesArray = [slide1, slide2, slide3];
var n = slidesArray.length;

const slideObject = `<div><img src="${slidesArray[0].background}" /> </div>`
var currentSlide = 0
document.getElementById('card').innerHTML = slideObject;






// next button function
const nextButton = document.getElementById('nextbtn');
nextButton.addEventListener('click', function () {
    currentSlide += 1;
    currentSlide = currentSlide % n;
    const slideObject = `<div><img src="${slidesArray[currentSlide].background}" /> </div>`
    document.getElementById('card').innerHTML = slideObject;
});



// prev button function
const prevButton = document.getElementById('prevbtn');
prevButton.addEventListener('click', function () {
    if (currentSlide == 0) {
        currentSlide = n-1;
    } else {
        currentSlide -= 1;
    }
    currentSlide = currentSlide % n;
    const slideObject = `<div><img src="${slidesArray[currentSlide].background}" /> </div>`
    document.getElementById('card').innerHTML = slideObject;
});
