class DraggableTextBox {
    static textboxcount = 0;
    constructor({ id, className, font, color, size, width, height, placeholder }) {
        DraggableTextBox.textboxcount += 1; // Correct way to access static property
        this.id = id || DraggableTextBox.textboxcount; // Use the updated static value
        this.className = className || 'draggable-textbox';
        this.font = font || 'Arial, sans-serif';
        this.color = color || '#000';
        this.size = size || '16px';
        this.width = width || 150; // Default width
        this.height = height || 30; // Default height
        this.draggable = true; // Default draggable
        this.placeholder = placeholder || `Textbox ${this.id}`;
    }

    createElement() {
        const textbox = document.createElement('input');
        textbox.type = 'text';
        textbox.id = this.id;
        textbox.className = this.className;
        textbox.placeholder = this.placeholder;
        textbox.style.left = '400px';
        textbox.style.top = '400px';

        // Apply styles
        textbox.style.fontFamily = this.font;
        textbox.style.color = this.color;
        textbox.style.fontSize = this.size;
        textbox.style.width = `${this.width}px`;
        textbox.style.height = `${this.height}px`;
        textbox.style.position = 'absolute';

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