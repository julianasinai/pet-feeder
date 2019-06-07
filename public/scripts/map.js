var mymap = L.map('mapid').setView([-1.4558, -48.5044], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoianVsaWFuYTEiLCJhIjoiY2p3bGF4ZHBpMDU4ajQ5b2hjdGR1MTN3NSJ9.hnUHEI9COuPCLNNJVFBv-A'
}).addTo(mymap);