var map = new Datamap({
  scope: 'world',
  element: document.getElementById('container1'),
  projection: 'equirectangular',

  fills: {
    defaultFill: '#383838',
    lt50: 'rgba(0,244,244,0.9)',
    gt50: 'rgb(18, 5, 95)',
    ocean: 'rgb(48, 75, 222)',
    pin: 'rgb(255,104,57)'
  },

  data: {
    USA: {fillKey: 'gt50' },

  }
})


//sample of the arc plugin

var trade_partners = [

// map.arc([
// israel
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 31.76666667,
     longitude: 35.233333
 }
},
//canada
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 45.41666667,
     longitude: -75.7
 }
},
//mexico
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 19.43333333,
     longitude: -99.133333
 }
},
//jordan
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 31.95,
     longitude: 35.933333
 }
},
//australia
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: -35.26666667,
     longitude: 149.133333
 }
},
//chile
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: -33.45,
     longitude: -70.666667
 }
},
//singapore
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 1.283333333,
     longitude: 103.85
 }
},
//bahrain
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
//morocco
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 34.01666667,
     longitude: -6.816667
 }
},
//oman
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 23.61666667,
     longitude: 58.583333
 }
},
//peru
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: -12.05,
     longitude: -77.05
 }
},

//costa rica
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 9.933333333,
     longitude: -84.083333
 }
},
//dominica rep
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 18.46666667,
     longitude: -69.9
 }
},
//el salv
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 13.7,
     longitude: -89.2
 }
},
//guatemala
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 14.61666667,
     longitude: -90.516667
 }
},
//honduras
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 14.1,
     longitude: -87.216667
 }
},
//nicaragua
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 12.13333333,
     longitude: -86.25
 }
},
//panama
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 8.966666667,
     longitude: -79.533333
 }
},
//colombia
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 4.6,
     longitude: -74.083333
 }
},
//south korea
{
 origin: {
     latitude: 38.883333,
     longitude: -77
 },
 destination: {
     latitude: 37.55,
     longitude: 126.983333
 }
},
// ], {strokeWidth: 2});
]

// map.arc(trade_partners,{strokeWidth:2, animationSpeed:1000});
    function addArcs(index) {
        map.arc( trade_partners.slice(0, index) , {strokeWidth: 2});
        if ( index < trade_partners.length ) {
            window.setTimeout(function() {
                addArcs(++index)
            }, 750);
        }
    }

  addArcs(1);


 //bubbles, custom popup on hover template
map.bubbles([
{name: "Canberra", latitude: "-35.26666667", longitude: "149.133333", radius: 6, fillKey: "gt50"},
{name: "Manama", latitude: "26.23333333", longitude: "50.566667", radius: 6, fillKey: "gt50"},
{name: "Ottawa", latitude: "45.41666667", longitude: "-75.7", radius: 6, fillKey: "gt50"},
{name: "Santiago", latitude: "-33.45", longitude: "-70.666667", radius: 6, fillKey: "gt50"},
{name: "Bogota", latitude: "4.6", longitude: "-74.083333", radius: 6, fillKey: "gt50"},
{name: "San Jose", latitude: "9.933333333", longitude: "-84.083333", radius: 6, fillKey: "gt50"},
{name: "Santo Domingo", latitude: "18.46666667", longitude: "-69.9", radius: 6, fillKey: "gt50"},
{name: "San Salvador", latitude: "13.7", longitude: "-89.2", radius: 6, fillKey: "gt50"},
{name: "Guatemala City", latitude: "14.61666667", longitude: "-90.516667", radius: 6, fillKey: "gt50"},
{name: "Tegucigalpa", latitude: "14.1", longitude: "-87.216667", radius: 6, fillKey: "gt50"},
{name: "Jerusalem", latitude: "31.76666667", longitude: "35.233333", radius: 6, fillKey: "gt50"},
{name: "Amman", latitude: "31.95", longitude: "35.933333", radius: 6, fillKey: "gt50"},
{name: "Seoul", latitude: "37.55", longitude: "126.983333", radius: 6, fillKey: "gt50"},
{name: "Mexico City", latitude: "19.43333333", longitude: "-99.133333", radius: 6, fillKey: "gt50"},
{name: "Rabat", latitude: "34.01666667", longitude: "-6.816667", radius: 6, fillKey: "gt50"},
{name: "Managua", latitude: "12.13333333", longitude: "-86.25", radius: 6, fillKey: "gt50"},
{name: "Muscat", latitude: "23.61666667", longitude: "58.583333", radius: 6, fillKey: "gt50"},
{name: "Panama City", latitude: "8.966666667", longitude: "-79.533333", radius: 6, fillKey: "gt50"},
{name: "Lima", latitude: "-12.05", longitude: "-77.05", radius: 6, fillKey: "gt50"},
{name: "Singapore", latitude: "1.283333333", longitude: "103.85", radius: 6, fillKey: "gt50"},
{name: "Washington DC", latitude: "38.883333", longitude: "-77", radius: 6, fillKey: "gt50"}



], {
 popupTemplate: function(geo, data) {
   return "<div class='hoverinfo'>It is " + data.name + "</div>";
}
});


  // d3.csv("country-capitals.csv", function(err, capitals) {
  //
  //
  //     map.bubbles([
  //       {name: capitals[1].CapitalName, latitude: capitals[1].CapitalLatitude, longitude: capitals[1].CapitalLongitude, radius: 10, fillKey: 'gt50'},
  //       ])
  //
  //
  // });
