class Slide {
    static instanceCount = 0;

    constructor(imagePath) {
        this.background = imagePath;
        Slide.instanceCount += 1;
        this.textBoxes = [];
    }

    createElementFromSlide() {
        const textBox = new DraggableTextBox({});
        const element = textBox.createElement();
        this.textBoxes.push(element);
        return element;
    }

    // printAllTextBoxes() {
    //     this.textBoxes.forEach((textBox, index) => {
    //         console.log(`TextBox ${index + 1}:`, textBox.value);  
    //         console.log(`TextBox ${index + 1}:`, textBox);
    //     });
    // }
}


class DraggableTextBox {
    static textboxcount = 0;
    constructor({ id, className, font, color, size, width, height, placeholder, textvalue }) {
        DraggableTextBox.textboxcount += 1;
        this.id = id || DraggableTextBox.textboxcount;
        this.className = className || 'draggable-textbox';
        this.font = font || 'Arial, sans-serif';
        this.color = color || '#000';
        this.size = size || '16px';
        this.width = width || 150;
        this.height = height || 30;
        this.draggable = true;
        this.placeholder = placeholder || `Textbox ${this.id}`;
        this.textvalue = textvalue || 'T BOX';
    }




    createElement() {
        const textbox = document.createElement('input');
        textbox.type = 'text';
        textbox.id = this.id;
        textbox.className = this.className;
        textbox.placeholder = this.placeholder;
        textbox.style.left = '400px';
        textbox.style.top = '400px';
        textbox.value = this.textvalue;

        // Apply styles
        textbox.style.fontFamily = this.font;
        textbox.style.color = this.color;
        textbox.style.fontSize = this.size;
        textbox.style.width = `${this.width}px`;
        textbox.style.height = `${this.height}px`;
        textbox.style.position = 'absolute';

        textbox.addEventListener('input', (event) => {
            this.textvalue = event.target.value;
        });

        var initialMousePos = { x: 0, y: 0 };
        var initialTextBoxPos = { x: 0, y: 0 };
        var isDragging = false;
        var activeTextBox = null;

        textbox.addEventListener('mousedown', function (e) {
            initialMousePos.x = e.clientX;
            initialMousePos.y = e.clientY;
            initialTextBoxPos.x = parseInt(this.style.left, 10);
            initialTextBoxPos.y = parseInt(this.style.top, 10);
            isDragging = true;
            activeTextBox = this;
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
        });

        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                var dx = e.clientX - initialMousePos.x;
                var dy = e.clientY - initialMousePos.y;
                activeTextBox.style.left = (initialTextBoxPos.x + dx) + 'px';
                activeTextBox.style.top = (initialTextBoxPos.y + dy) + 'px';
            }
        });

        return textbox;
    }
}

const textbox1 = new DraggableTextBox({ color: '#ff0000', placeholder: 'First textbox' });



var slide1 = new Slide("public/photo1.jpg");
var slide2 = new Slide("public/photo2.jpg");
var slide3 = new Slide("public/photo3.jpg");

var slidesArray = [slide1, slide2, slide3];
currentSlide = 0;
var n = slidesArray.length;

console.log(slide1.background)
console.log(slide2.background)
console.log(slide3.background)

const slideObject = `<div><img src="${slidesArray[0].background}" /> </div>`
var currentSlide = 0
document.getElementById('card').innerHTML = slideObject;



// add textbox button function
const addTextboxBtn = document.getElementById('adddragtextbox');

addTextboxBtn.addEventListener('click', () => {
    const container = document.getElementById("card");

    if (container) {
        const element = slidesArray[currentSlide].createElementFromSlide();
        container.append(element);
    } else {
        console.error('Container element not found!');
    }

})


// next button function
const nextButton = document.getElementById('nextbtn');
nextButton.addEventListener('click', function () {
    currentSlide += 1;
    currentSlide = currentSlide % n;
    const slideObject = `<div><img src="${slidesArray[currentSlide].background}" /> </div>`
    const card = document.getElementById('card');
    // console.log(card.innerHTML)
    card.innerHTML = '';
    card.innerHTML += slideObject;

    const textBoxes = slidesArray[currentSlide].textBoxes;
    textBoxes.forEach((textBox, index) => {
        card.append(textBox);
    });
});



// prev button function
const prevButton = document.getElementById('prevbtn');
prevButton.addEventListener('click', function () {
    if (currentSlide == 0) {
        currentSlide = n - 1;
    } else {
        currentSlide -= 1;
    }
    currentSlide = currentSlide % n;
    const slideObject = `<div><img src="${slidesArray[currentSlide].background}" /> </div>`

    const card = document.getElementById('card');
    // console.log(card.innerHTML)
    card.innerHTML = '';
    card.innerHTML += slideObject;

    const textBoxes = slidesArray[currentSlide].textBoxes;
    textBoxes.forEach((textBox, index) => {
        card.append(textBox);
    });
});
