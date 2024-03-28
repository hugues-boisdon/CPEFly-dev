
// VirtualJoystick not made by us
class VirtualJoystick {
    constructor(container, options = {}) {
        this.container = container;
        this.options = Object.assign(
            {
                width: 100,
                height: 100,
                color: 'gray',
                handleColor: 'white',
                handleRadius: 20,
                onChange: null,
            },
            options
        );

        this.joystick = document.createElement('div');
        this.joystick.style.width = `${this.options.width}px`;
        this.joystick.style.height = `${this.options.height}px`;
        this.joystick.style.borderRadius = '50%';
        this.joystick.style.backgroundColor = this.options.color;
        this.joystick.style.position = 'relative';
        this.joystick.style.touchAction = 'none';
        this.joystick.style.border = '3px solid black';
        this.joystick.style.opacity = '50%';
        this.container.appendChild(this.joystick);

        this.handle = document.createElement('div');
        this.handle.style.width = `${this.options.handleRadius * 2}px`;
        this.handle.style.height = `${this.options.handleRadius * 2}px`;
        this.handle.style.borderRadius = '50%';
        this.handle.style.backgroundColor = this.options.handleColor;
        this.handle.style.position = 'absolute';
        this.handle.style.top = `${this.options.height / 2 - this.options.handleRadius}px`;
        this.handle.style.left = `${this.options.width / 2 - this.options.handleRadius}px`;
        this.handle.style.touchAction = 'none';
        this.joystick.appendChild(this.handle);

        this.position = { x: 0, y: 0 };
        this.delta = { x: 0, y: 0 };
        this.handleRadius = this.options.handleRadius;
        this.joystickRect = this.joystick.getBoundingClientRect();

        this.isPressed = false;
        this.touchId = null;

        this._addEventListeners();
    }

    _addEventListeners() {
        this.handle.addEventListener('mousedown', this._handleMouseDown.bind(this));
        document.addEventListener('mousemove', this._handleMouseMove.bind(this));
        document.addEventListener('mouseup', this._handleMouseUp.bind(this));
        this.handle.addEventListener('touchstart', this._handleTouchStart.bind(this));
        document.addEventListener('touchend', this._handleTouchEnd.bind(this));
        document.addEventListener('touchcancel', this._handleTouchEnd.bind(this));
        document.addEventListener('touchmove', this._handleTouchMove.bind(this));
    }

    _handleMouseDown(event) {
        this.isPressed = true;
        this._updatePosition(event.clientX, event.clientY);
    }

    _handleMouseMove(event) {
        if (this.isPressed) {
            this._updatePosition(event.clientX, event.clientY);
        }
    }

    _handleMouseUp() {
        this.isPressed = false;
        this._resetPosition();
    }

    _handleTouchStart(event) {
        if (this.touchId === null) {
            this.touchId = event.changedTouches[0].identifier;
            this.isPressed = true;
            this._updatePosition(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        }
    }

    _handleTouchEnd(event) {
        for (let i = 0; i < event.changedTouches.length; i++) {
            if (event.changedTouches[i].identifier === this.touchId) {
                this.touchId = null;
                this.isPressed = false;
                this._resetPosition();
                break;
            }
        }
    }

    _handleTouchMove(event) {
        for (let i = 0; i < event.changedTouches.length; i++) {
            if (event.changedTouches[i].identifier === this.touchId) {
                this._updatePosition(event.changedTouches[i].clientX, event.changedTouches[i].clientY);
                break;
            }
        }
    }

    _updatePosition(x, y) {
        let clientX = x;
        let clientY = y;

        if (this.touchId !== null) {
            for (let i = 0; i < event.changedTouches.length; i++) {
                if (event.changedTouches[i].identifier === this.touchId) {
                    clientX = event.changedTouches[i].clientX;
                    clientY = event.changedTouches[i].clientY;
                    const dx = x - this.joystickRect.left - this.options.width / 2 + this.options.handleRadius;
                    const dy = y - this.joystickRect.top - this.options.height / 2 + this.options.handleRadius;

                    break;
                }
            }
        }

        const dx = clientX - this.joystickRect.left - this.options.width / 2;
        const dy = clientY - this.joystickRect.top - this.options.height / 2;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this.handleRadius) {
            const angle = Math.atan2(dy, dx);
            this.position = { x: Math.cos(angle) * this.handleRadius, y: Math.sin(angle) * this.handleRadius };
        } else {
            this.position = { x: dx, y: dy };
        }

        this.delta = { x: this.position.x / this.handleRadius, y: this.position.y / this.handleRadius };

        this.handle.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;

        if (typeof this.options.onChange === 'function') {
            this.options.onChange(this.delta);
        }
    }

    _resetPosition() {
        this.position = { x: 0, y: 0 };
        this.delta = { x: 0, y: 0 };

        this.handle.style.transform = `translate(0, 0)`;

        if (typeof this.options.onChange === 'function') {
            this.options.onChange(this.delta);
        }
    }
}






var commandValues = [0,0,0,0];
var keyWerePressed     = false;
var stopSendingCommand = false;

// We create our Joysticks
const translation_joystickContainer = document.querySelector('.joystick-translation');
const translation_dX_text = document.querySelector('#dX-translation');
const translation_dY_text = document.querySelector('#dY-translation');


const translation_joystick = new VirtualJoystick(translation_joystickContainer, {
    width: 100, height: 100, color: 'gray', handleColor: 'white', handleRadius: 20,
    onChange: function(delta) {
        commandValues[0] = delta.x;
        commandValues[1] = delta.y;
    }
});


const height_joystickContainer = document.querySelector('.joystick-height');
const height_dX_text = document.querySelector('#dX-height');
const height_dY_text = document.querySelector('#dY-height');

const height_joystick = new VirtualJoystick(height_joystickContainer, {
    width: 100, height: 100, color: 'gray', handleColor: 'white', handleRadius: 20,
    onChange: function(delta) {
        commandValues[2] = delta.x;
        commandValues[3] = delta.y;
    }
});



document.querySelector('.page').addEventListener("keydown", (event) => {
    keyWerePressed = true;
    console.log(event.key)
    if (event.key == 'ArrowUp')   {commandValues[1] = 1}
    if (event.key == 'ArrowDown') {commandValues[1] = -1}
    if (event.key == 'ArrowRight'){commandValues[0] = 1}
    if (event.key == 'ArrowLeft') {commandValues[0] = -1}
});
document.querySelector('.page').addEventListener("keyup", (event) => {
    keyWerePressed = true;
    console.log(event.key)
    if (event.key == 'ArrowUp')   {commandValues[1] = 0}
    if (event.key == 'ArrowDown') {commandValues[1] = 0}
    if (event.key == 'ArrowRight'){commandValues[0] = 0}
    if (event.key == 'ArrowLeft') {commandValues[0] = 0}
});



function updateCommandDisplay(command)
{
    var textTX = String(parseFloat(commandValues[0]).toFixed(4));
    var textTY = String(parseFloat(commandValues[1]).toFixed(4));
    var textHX = String(parseFloat(commandValues[2]).toFixed(4));
    var textHY = String(parseFloat(commandValues[3]).toFixed(4));
    height_dX_text.innerHTML = "dX: " + textHX
    height_dY_text.innerHTML = "dY: " + textHY
    translation_dX_text.innerHTML = "dX: " + textTX
    translation_dY_text.innerHTML = "dY: " + textTY
}


function updateMoveCommand()
{
    var commandIsNull = (commandValues[0] == 0) && (commandValues[1] == 0) && (commandValues[2] == 0) && (commandValues[3] == 0);
    if ((!keyWerePressed && commandIsNull) && !stopSendingCommand)
    {
        stopSendingCommand = true;
        sendCommand(command = [0,0,0,0])
        updateCommandDisplay(command = commandValues)
    }
    else if (keyWerePressed || !commandIsNull)
    {
        stopSendingCommand = false
    }


    if (!stopSendingCommand)
    {
        sendCommand(command = commandValues)
        updateCommandDisplay(command = commandValues)
    }

    keyWerePressed = false;
}



function sendCommand(command) 
{ 
    let response = fetch("/command", {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json'
           },
            body: JSON.stringify(command)
        });
        return response;
} 


let commandRoutineId = setInterval(updateMoveCommand, 200)

