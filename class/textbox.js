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



        const textbox = document.createElement('input');
        textbox.type = 'text';
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

module.exports = DraggableTextBox;