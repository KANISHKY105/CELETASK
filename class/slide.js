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

module.exports = Slide;