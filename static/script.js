var commandValues = [0,0,0,0];
var keyWerePressed     = false;
var stopSendingCommand = false;

// We create our Joysticks
const translation_joystickContainer = document.querySelector('#joystick-translation');
const translation_dX_text = document.querySelector('#dX-translation');
const translation_dY_text = document.querySelector('#dY-translation');


const translation_joystick = new VirtualJoystick(translation_joystickContainer, {
    width: 260, height: 260, color: "rgba(0,0,0,0.2)", handleColor: "rgba(255,255,255,1)", handleRadius: 32,
    onChange: function(delta) {
        commandValues[0] = delta.x;
        commandValues[1] = delta.y;
    }
});


const height_joystickContainer = document.querySelector('#joystick-height');
const height_dX_text = document.querySelector('#dX-height');
const height_dY_text = document.querySelector('#dY-height');

const height_joystick = new VirtualJoystick(container=height_joystickContainer, options={
    width: 260, height: 260, color: "rgba(0,0,0,0.2)", handleColor: "rgba(255,255,255,1)", handleRadius: 32,
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
    //height_dX_text.innerHTML = "dX: " + textHX
    //height_dY_text.innerHTML = "dY: " + textHY
    //translation_dX_text.innerHTML = "dX: " + textTX
    //translation_dY_text.innerHTML = "dY: " + textTY
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
    fetch("/command", {
        method: "POST",
        body: JSON.stringify({
          command: command,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
} 


let commandRoutineId = setInterval(updateMoveCommand, 200)





