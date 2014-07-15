 map.addPlugin('pins', function ( layer, data, options ) {
    var self = this,
        fillData = this.options.fills,
        svg = this.svg;

    if ( !data || (data && !data.slice) ) {
      throw "Datamaps Error - bubbles must be an array";
    }

    var bubbles = layer.selectAll('image.datamaps-pins').data( data, JSON.stringify );

    bubbles
      .enter()
        .append('image')
        .attr('class', 'datamaps-pin')
        .attr('xlink:href', 'http://www.clker.com/cliparts/o/o/b/g/O/i/map-pin.svg')
        .attr('height', 40)
        .attr('width', 40)
        .attr('x', function ( datum ) {
          var latLng;
          if ( datumHasCoords(datum) ) {
            latLng = self.latLngToXY(datum.latitude, datum.longitude);
          }
          else if ( datum.centered ) {
            latLng = self.path.centroid(svg.select('path.' + datum.centered).data()[0]);
          }
          if ( latLng ) return latLng[0];
        })
        .attr('y', function ( datum ) {
          var latLng;
          if ( datumHasCoords(datum) ) {
            latLng = self.latLngToXY(datum.latitude, datum.longitude);
          }
          else if ( datum.centered ) {
            latLng = self.path.centroid(svg.select('path.' + datum.centered).data()[0]);
          }
          if ( latLng ) return latLng[1];;
        })

        .on('mouseover', function ( datum ) {
          console.log('mousover!');
          var $this = d3.select(this);

          if (options.popupOnHover) {
            console.log('going', datum)
            self.updatePopup($this, datum, options, svg);
          }
        })
        .on('mouseout', function ( datum ) {
          var $this = d3.select(this);

          if (options.highlightOnHover) {
            //reapply previous attributes
            var previousAttributes = JSON.parse( $this.attr('data-previousAttributes') );
            for ( var attr in previousAttributes ) {
              $this.style(attr, previousAttributes[attr]);
            }
          }

          d3.selectAll('.datamaps-hoverover').style('display', 'none');
        })


    bubbles.exit()
      .transition()
        .delay(options.exitDelay)
        .attr("height", 0)
        .remove();

    function datumHasCoords (datum) {
      return typeof datum !== 'undefined' && typeof datum.latitude !== 'undefined' && typeof datum.longitude !== 'undefined';
    }

    });


       //bubbles, custom popup on hover template
     map.pins([
       {name: 'Hot', latitude: 21.32, longitude: 5.32, radius: 10, fillKey: 'pin'},
       {name: 'Chilly', latitude: -25.32, longitude: 120.32, radius: 10, fillKey: 'pin'},
       {name: 'Hot again', latitude: 21.32, longitude: -84.32, radius: 20, fillKey: 'pin'},


     ], {
       popupOnHover: true,
       popupTemplate: function(data) {
         return "<div class='hoverinfo'>It is " + data.name + "</div>";
       }
     });
