class Slide {
    static instanceCount = 0;

    constructor(imagePath, element) {
        this.background = imagePath;
        Slide.instanceCount += 1;
        this.textBoxes = [];
        this.textBoxes.push(element);
    }

    createElementFromSlide() {
        const textBox = new DraggableTextBox({});
        const element = textBox.createElement();
        this.textBoxes.push(element);
        return element;
    }

    printAllTextBoxes() {
        this.textBoxes.forEach((textBox, index) => {
            console.log(`TextBox ${index + 1}:`, textBox.value);
            console.log(`TextBox ${index + 1}:`, textBox);
        });
    }
}

class DraggableTextBox {
    static textboxcount = 0;
    constructor({ id, className, font, color, size, width, height, placeholder, textvalue, activitystatus}) {
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
        this.activitystatus = false;

    }

    createElement() {
        const textbox = document.createElement('textarea');
        // textbox.type = 'text';
        textbox.id = this.id;
        textbox.className = this.className;
        textbox.placeholder = this.placeholder;
        textbox.style.left = '400px';
        textbox.style.top = '400px';
        textbox.value = this.textvalue;
        textbox.activitystatus = false

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
        textbox.addEventListener('focus', function (event) {
            const tb = document.getElementById("area1");
            tb.innerText = textbox.value
        });


        var initialMousePos = { x: 0, y: 0 };
        var initialTextBoxPos = { x: 0, y: 0 };
        var isDragging = false;
        var activeTextBox = null;

        function deselectAllTextBoxes() {
            // Before updating the activitystatus
            // console.log("Before deselecting:");
            // document.querySelectorAll('.draggable-textbox').forEach(ele => {
            //     console.log(`Textbox ID: ${ele.id}, Activity Status: ${ele.activitystatus}`);
            // });
        
            // Update the activitystatus
            document.querySelectorAll('.draggable-textbox').forEach(ele => {
                ele.activitystatus = false;
            });
        
            // After updating the activitystatus
            // console.log("After deselecting:");
            // document.querySelectorAll('.draggable-textbox').forEach(ele => {
            //     console.log(`Textbox ID: ${ele.id}, Activity Status: ${ele.activitystatus}`);
            // });
        }


        textbox.addEventListener('mousedown', function (e) {
            deselectAllTextBoxes();

            initialMousePos.x = e.clientX;
            initialMousePos.y = e.clientY;
            initialTextBoxPos.x = parseInt(this.style.left, 10);
            initialTextBoxPos.y = parseInt(this.style.top, 10);
            isDragging = true;
            activeTextBox = this;
            this.activitystatus = true;
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

        document.getElementById('size').addEventListener('input', function () {
            if (activeTextBox && activeTextBox.activitystatus === true) {
                console.log(this.value);
                activeTextBox.style.fontSize = this.value + 'px';
            }
        });
        

        document.getElementById('color1').addEventListener('input', function () {
            if (activeTextBox && activeTextBox.activitystatus === true) {
                console.log(this.value)
                activeTextBox.style.color = this.value;
            }
        });

        document.getElementById('txtfont').addEventListener('input', function () {
            if (activeTextBox && activeTextBox.activitystatus === true) {
                console.log(this.value)
                activeTextBox.style.fontFamily = this.value;
            }
        });

        return textbox;
    }
}



const textbox1 = new DraggableTextBox({ color: '#ff0000', placeholder: 'First textbox', textvalue: "The Great Wall of China" });
const textbox2 = new DraggableTextBox({ color: '#ff0000', placeholder: 'First textbox', textvalue: "Christ the Redeemer" });
const textbox3 = new DraggableTextBox({ color: '#ff0000', placeholder: 'First textbox', textvalue: "The Taj Mahal" });

const ele1 = textbox1.createElement();
const ele2 = textbox2.createElement();
const ele3 = textbox3.createElement();

var slide1 = new Slide("public/photo1.jpg", ele1);
var slide2 = new Slide("public/photo2.jpg", ele2);
var slide3 = new Slide("public/photo3.jpg", ele3);

var slidesArray = [slide1, slide2, slide3];
currentSlide = 0;
var n = slidesArray.length;

const start = document.getElementById('card');
setTimeout(() => {
    start.append(slide1.textBoxes[0]);
}, 500);

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
    slidesArray[currentSlide].printAllTextBoxes();
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
    slidesArray[currentSlide].printAllTextBoxes();

    // console.log(slidesArray[currentSlide].textBoxes[0])

});
