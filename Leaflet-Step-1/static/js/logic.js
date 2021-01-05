// Creating map object
var myMap = L.map("map", {
    center: [61.0474, -152.3162],
    zoom: 11
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Store API query variables
  var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
//   var date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
//   var complaint = "&complaint_type=Rodent";
//   var limit = "&$limit=10000";
  
  // Assemble API query URL
  //var url = baseURL + date + complaint + limit;
  
  // Grab the data with d3
  d3.json(baseURL, function(response) {

    console.log(response);
  
    // Create a new marker cluster group
    //var markers = L.markerClusterGroup();

  
      // Set the data location property to a variable

  
      for (var i = 0; i < response.length; i++) {
        var location = response[i].geometry.location;
        
        L.circle([location.coordinates[1], location.coordinates[0]], {
          fillOpacity: 0.75,
          color: "white",
          fillColor: "purple",
          // Setting our circle's radius equal to the output of our markerSize function
          // This will make our marker's size proportionate to its population
          radius: markerSize(response[i].mag)
        }).bindPopup("<h1>" + response[i].mag + "</h1> <hr> <h3>Population: " + response[i].place + "</h3>").addTo(myMap);
    }}
      

  );
  