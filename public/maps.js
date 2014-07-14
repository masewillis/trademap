var map = new Datamap({
  scope: 'world',
  element: document.getElementById('container1'),
  projection: 'equirectangular',

  fills: {
    defaultFill: '#383838',
    lt50: 'rgba(0,244,244,0.9)',
    gt50: 'rgb(18, 5, 95)',
    ocean: 'rgb(48, 75, 222)'
  },

  data: {
    USA: {fillKey: 'gt50' },

  }
})


//sample of the arc plugin
map.arc([
 {
  origin: {
      latitude: 38.883333,
      longitude: -77
  },
  destination: {
      latitude: 26.23333333,
      longitude: 50.566667
  }
},
{
    origin: {
        latitude: 38.883333,
        longitude: -77
    },
    destination: {
        latitude: -33.45,
        longitude: -70.666667
    }
}
], {strokeWidth: 2});


 //bubbles, custom popup on hover template
map.bubbles([
 {name: 'Canberra', latitude: -35.26666667, longitude: 149.133333, radius: 10, fillKey: 'gt50'},
 {name: 'Manama', latitude: 26.23333333, longitude: 50.566667, radius: 10, fillKey: 'gt50'},
 {name: 'Santiago', latitude: -33.45, longitude: -70.666667, radius: 10, fillKey: 'gt50'},
 {name: 'Washington D.C', latitude: 38.883333, longitude: -77, radius: 10, fillKey: 'gt50'}



], {
 popupTemplate: function(geo, data) {
   return "<div class='hoverinfo'>It is " + data.name + "</div>";
 }
});
