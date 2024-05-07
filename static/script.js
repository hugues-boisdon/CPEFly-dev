var commandValues = [0,0,0,0];
var keyWerePressed     = false;
var stopSendingCommand = false;

// We create our Joysticks
const translation_joystickContainer = document.querySelector('#joystick-translation');
const translation_dX_text = document.querySelector('#dX-translation');
const translation_dY_text = document.querySelector('#dY-translation');


const translation_joystick = new VirtualJoystick(translation_joystickContainer, {
    width: 100, height: 100, color: 'gray', handleColor: 'white', handleRadius: 20,
    onChange: function(delta) {
        commandValues[0] = delta.x;
        commandValues[1] = delta.y;
    }
});


const height_joystickContainer = document.querySelector('#joystick-height');
const height_dX_text = document.querySelector('#dX-height');
const height_dY_text = document.querySelector('#dY-height');

const height_joystick = new VirtualJoystick(height_joystickContainer, {
    width: 100, height: 100, color: 'gray', handleColor: 'white', handleRadius: 20,
    onChange: function(delta) {
        commandValues[2] = delta.x;
        commandValues[3] = delta.y;
    }
});

document.body.addEventListener("keydown", (event) => {
    keyWerePressed = true;
    console.log(event.key)
    if (event.key == 'ArrowUp')   {commandValues[1] = 1}
    if (event.key == 'ArrowDown') {commandValues[1] = -1}
    if (event.key == 'ArrowRight'){commandValues[0] = 1}
    if (event.key == 'ArrowLeft') {commandValues[0] = -1}
});
document.body.addEventListener("keyup", (event) => {
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





