var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
canvas.addEventListener("click", defineImage, false);
//Funcion que toma las coordenadas x y y
function getCurrentPos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
//Funcion para tomar el color y la forma desde el formulario HTML5
function defineImage(evt) {
    var currentPos = getCurrentPos(evt);

    17
    for (i = 0; i < document.inputForm.color.length; i++) {
        if (document.inputForm.color[i].checked) {
            var color = document.inputForm.color[i];
            break;
        }
    }
    for (i = 0; i < document.inputForm.shape.length; i++) {
        if (document.inputForm.shape[i].checked) {
            var shape = document.inputForm.shape[i];
            break;
        }
    }
//Armamos la estructura del JSON a usar
    var json = JSON.stringify({
        "shape": shape.value,
        "color": color.value,
        "coords": {
            "x": currentPos.x,
            "y": currentPos.y
        }
    });
    drawImageText(json);
    sendText(json);
}
function drawImageText(image) {
    var json = JSON.parse(image);
    context.fillStyle = json.color;
    switch (json.shape) {
        case "circle":
            context.beginPath();
            context.arc(json.coords.x, json.coords.y, 5, 0, 2 * Math.PI, false);
            context.fill();
            break;
        case "square":
        default:
            context.fillRect(json.coords.x, json.coords.y, 10, 10);
            break;
    }
}


