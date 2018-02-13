/*
client.js

Author: Nikolas Martelaro (nmartelaro@gmail.com)
Extended: David Goeicke (da.goedicke@gmail.com)
Purpose: This run the interactivity and communication for the web app. This file
is served to the users web browser and executes on the browser.

Usage: This file is called automatically when the webpage is served.

//--Addition. Added a button handling for the `Take a picture` button.
*/

// WebSocket connection setup
var socket = io();

// send out LedOn message over socket
function ledON() {
  socket.emit('ledON');
}

// send out ledOFF message over socket
function ledOFF() {
  socket.emit('ledOFF');
}

//-- Addition: Forward the `Take a picture` button-press to the webserver.
function takePicture(){
  socket.emit('takePicture');
  socket.emit()
}

//-- Addition: This function receives the new image name and applies it to html element.

socket.on('newPicture', function(msg) {
  document.getElementById('pictureContainer').src=msg;
});

socket.on('newPalette', function(data) {
  console.log("Displaying Palette Data.")
  console.log(data);
  document.getElementById('paletteImage').src = data["palette"];
  // document.getElementById('paletteColors').innerHTML = data["colors"];
  
  document.getElementById('palette0').style.background = data["colors"][0];
  document.getElementById('palette1').style.background = data["colors"][1];
  document.getElementById('palette2').style.background = data["colors"][2];
  document.getElementById('palette3').style.background = data["colors"][3];
  document.getElementById('palette4').style.background = data["colors"][4];
  
  document.getElementById('colortext0').innerHTML = data["colors"][0];
  document.getElementById('colortext1').innerHTML = data["colors"][1];
  document.getElementById('colortext2').innerHTML = data["colors"][2];
  document.getElementById('colortext3').innerHTML = data["colors"][3];
  document.getElementById('colortext4').innerHTML = data["colors"][4];
});

// read the data from the message that the server sent and change the
// background of the webpage based on the data in the message
socket.on('server-msg', function(msg) {
  msg = msg.toString();
  console.log('msg:', msg);
  switch (msg) {
    case "light":
      document.getElementById('LEDstatus').style.backgroundColor = "#ff6767";
      console.log("white")
      break;
    case "dark":
      document.getElementById('LEDstatus').style.backgroundColor = "#cfcfcf";
      console.log("black");
      break;
    default:
      //console.log("something else");
      break;
  }
});
