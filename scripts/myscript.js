function LoadMap() {
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  osm = L.tileLayer(osmUrl, {
    maxZoom: 18,
    attribution: osmAttrib
  }),
  map = new L.Map('map', {
    layers: [osm],
    center: new L.LatLng(-37.7772, 175.2756),
    zoom: 15
  });

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
  draw: {
    position: 'topleft',
    polygon: {
      allowIntersection: false,
      drawError: {
        color: '#b00b00',
        timeout: 1000
      },
      shapeOptions: {
        color: '#bada55'
      },
      showArea: true
    },
    polyline: {
      metric: false
    },
    circle: {
      shapeOptions: {
        color: '#662d91'
      }
    }
  },
  edit: {
    featureGroup: drawnItems
  }
});
map.addControl(drawControl);

map.on('draw:created', function(e) {
  var type = e.layerType;
  var layer = e.layer;
  var coords;
  console.log(e);
  if (type === 'marker') {
    coords = JSON.stringify(layer._latlng);
  }
  if (type === 'circle') {
    coords = JSON.stringify(layer._latlng) + " " + layer._mRadius;
  }
  if (type === 'rectangle') {
    coords = JSON.stringify(layer._latlngs);
  }
  if (type === 'polygon') {
    coords = JSON.stringify(layer._latlngs);
  }
  if (type === 'polyline') {
    coords = JSON.stringify(layer._latlngs);
  }
  document.getElementById("coords").innerHTML = coords;
  drawnItems.addLayer(layer);
});

}

