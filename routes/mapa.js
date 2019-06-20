const   express  = require("express"),
        mqtt = require('mqtt'),
        // Paho     = require("paho-mqtt"),
        // jquery   = require("jquery")
        router   = express.Router();//router = app

        
router.get("/", function(req,res){
    var route_options={
            clientId:"mqttjs01",
            username:"lecircuit1",
            password:"13bfed0eff764944a17783ac6d66b919",
            clean:true};
    
    var count =0;
    var client  = mqtt.connect("mqtt://io.adafruit.com",route_options);
    console.log("connected flag  " + client.connected);

    //handle incoming messages
    client.on('message',function(topic, message, packet){
        console.log("message is "+ message);
        console.log("topic is "+ topic);
    });

    client.on("connect",function(){	
        console.log("connected  "+ client.connected);
        })
        //handle errors
        client.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)});
    // //publish
    // function publish(topic,msg,options){
    //     console.log("publishing",msg);
    //     if (client.connected == true){
    //         client.publish(topic,msg,options);
    //     }
    //     count+=1;
    //     if (count==2){ //ens script
    //         clearTimeout(timer_id); //stop timer
    //         client.end();
    //     }	
    // }
    var options={
        retain:true,
        qos:1};
    var topic="lecircuit1/feeds/force";
    var message="test message";
    console.log("subscribing to topics");
    client.subscribe(topic,{qos:1}); //single topic
    //var timer_id=setInterval(function(){publish(topic,message,options);},5000);
    //notice this is printed even before we connect
    console.log("end of script");

//     // Generate a new random MQTT client id on each page load
// const MQTT_CLIENT_ID = "iot_web_"+Math.floor((1 + Math.random()) * 0x10000000000).toString(16);

// // Create a MQTT client instance
// const MQTT_CLIENT = new Paho.MQTT.Client("io.adafruit.com", 1883, "/ws", MQTT_CLIENT_ID);

// // Tell the client instance to connect to the MQTT broker
// MQTT_CLIENT.connect({ onSuccess: myClientConnected });

// // This is the function which handles button clicks
// function botaoDoStatusVasilha() {
//     // create a new MQTT message with a specific payload
//   const mqttMessage = new Paho.MQTT.Message("Hello from website");

//   // Set the topic it should be published to
//   mqttMessage.destinationName = "lecircuit∕feeds∕force";

//   // Publish the message
//   MQTT_CLIENT.send(mqttMessage);
// }

// // This is the function which handles subscribing to topics after a connection is made
// function myClientConnected() {
//     MQTT_CLIENT.subscribe("lecircuit∕feeds∕force");
// }

// // This is the function which handles received messages
// function StatusDaVasilha(status) {
//     // Get the payload
//     const statusBody = status.payloadString;

//     // Create a new HTML element wrapping the message payload
//     const statusHTML = $("<p>"+statusBody+"</p>");

//     // Insert it inside the ```id=updateMe``` element above everything else that is there 
//     $("#weightSensorValue").prepend(statusHTML);
//     if(statusBody.startsWith("weight_value")){
//         $("#weightSensorValue").text("latest "+messageBody);
//     }
// };

  
//   // Tell MQTT_CLIENT to call StatusDaVasilha(status) each time a new message arrives
// MQTT_CLIENT.onMessageArrived = StatusDaVasilha;
})

module.exports = router;
  