const   express  = require("express"),
        Paho     = require("paho-mqtt"),
        jquery   = require("jquery")
        router   = express.Router();//router = app

router.get("/", function(req,res){
    // Generate a new random MQTT client id on each page load
const MQTT_CLIENT_ID = "iot_web_"+Math.floor((1 + Math.random()) * 0x10000000000).toString(16);

// Create a MQTT client instance
const MQTT_CLIENT = new Paho.MQTT.Client("io.adafruit.com", 1883, "/ws", MQTT_CLIENT_ID);

// Tell the client instance to connect to the MQTT broker
MQTT_CLIENT.connect({ onSuccess: myClientConnected });

// This is the function which handles button clicks
function botaoDoStatusVasilha() {
    // create a new MQTT message with a specific payload
  const mqttMessage = new Paho.MQTT.Message("Hello from website");

  // Set the topic it should be published to
  mqttMessage.destinationName = "lecircuit∕feeds∕force";

  // Publish the message
  MQTT_CLIENT.send(mqttMessage);
}

// This is the function which handles subscribing to topics after a connection is made
function myClientConnected() {
    MQTT_CLIENT.subscribe("lecircuit∕feeds∕force");
}

// This is the function which handles received messages
function StatusDaVasilha(status) {
    // Get the payload
    const statusBody = status.payloadString;

    // Create a new HTML element wrapping the message payload
    const statusHTML = $("<p>"+statusBody+"</p>");

    // Insert it inside the ```id=updateMe``` element above everything else that is there 
    $("#weightSensorValue").prepend(statusHTML);
    if(statusBody.startsWith("weight_value")){
        $("#weightSensorValue").text("latest "+messageBody);
    }
};

  
  // Tell MQTT_CLIENT to call StatusDaVasilha(status) each time a new message arrives
MQTT_CLIENT.onMessageArrived = StatusDaVasilha;
})

module.exports = router;
  