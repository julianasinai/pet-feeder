const url = "https://io.adafruit.com/api/v2/lecircuit1/feeds";

var mymap = L.map('mapid', { 
    center: [-1.474466, -48.453190],
    zoom: 16
}); //stores map variable

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoianVsaWFuYTEiLCJhIjoiY2p3bGF4ZHBpMDU4ajQ5b2hjdGR1MTN3NSJ9.hnUHEI9COuPCLNNJVFBv-A'
}).addTo(mymap);

var marker = L.marker([-1.474466, -48.453190]).addTo(mymap);

marker.bindPopup(getData);

function getData(){
    const el = document.createElement("p");
    const XHR = new XMLHttpRequest();
    el.innerText = "Carregando..."
    el.classList.add("dataSensor");
    XHR.onreadystatechange = function(){
        if(XHR.readyState === 4 && XHR.status === 200){
            const data = JSON.parse(XHR.responseText)[0].last_value; //transforms string into object
            console.log(JSON.parse(XHR.responseText));
            el.innerText = "Status: " + data + "%"; //displays % of how filled the feeder is
        }
    }
    XHR.open("GET", url);
    XHR.send();
    return el;
};