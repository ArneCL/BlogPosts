title: Quick introduction leaflet.js
tags: leaflet-js,javascript

Let's create a HTML file:

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
    <style>
      #mapid { height: 380px;
               width: 380px;
      }
    </style>
    <script src="https://unpkg.com/leaflet@1.0.1/dist/leaflet.js"></script>
    <div id="mapid"></div>
    <script>
      ...
    </script>

We're  fetching leaflet.js from the internet somewhere, and we have a mapid div, along with explicit hight on that div, which leaflet demands.

Now in the script tag, let's create a leaflet object, with a zoom level and lat lon:

    var mymap = L.map('mapid').setView([51.379959, -1.144644], 13);

Let's now create a tile layer, using mapbox's streets layer, passing in a max zoom level, attribution, id of layer and token.

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}', {
      maxZoom: 18,
      attribution: '',
      id: 'mapbox.streets',
      token: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw'
    }).addTo(mymap);

Finally let's create a marker, and give it a name.

    var marker = L.marker([51.379959, -1.144644]).addTo(mymap);
    marker.bindPopup("Some company here").openPopup();

And that's as simple as it gets.
