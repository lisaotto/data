       var colors = {
        "Sanitation" : "#d1af1c",
        "Food" : "#bc753b",
        "Construction" : "#628985",
        "Infestation" : "#b2bc28"
       };

       var strikeColor = '#464c20'


        var canvas = d3.select("body").append("svg")
          .attr("class", "data")
          .attr("width", 1200)
          .attr("height", 400);
//Adding Data Points
          var strikesA = canvas.selectAll("polyline.A")
          .data(data)
          .enter()
          .append("rect")
          .attr("width", 4)
          .attr("height", 40)
          .attr("transform", function(d){
            var trs = (120 + d['Rate of A']*990/100)+ " 0"
            return "translate(" + trs +")";
          })
          .attr("fill", strikeColor)
          .attr("opacity", '0.75')


          var strikesB = canvas.selectAll("polyline.B")
          .data(data)
          .enter()
          .append("rect")
         .attr("width", 4)
          .attr("height", 40)
          .attr("transform", function(d){
            var trs = (120 + d['Rate B']*990/100)+ " 120"
            return "translate(" + trs +")";
          })
          .attr("fill", strikeColor)
          .attr("opacity", '0.75')


          var strikesC = canvas.selectAll("polyline.C")
          .data(data)
          .enter()
          .append("rect")
          .attr("width", 4)
          .attr("height", 40)
          .attr("transform", function(d){
            var trs = (120 + d['Rate of C']*990/100)+ " 240"
            return "translate(" + trs +")";
          })
          .attr("fill", strikeColor)
          .attr("opacity", '0.75')


//Connecting Data Points
          var linesAB = canvas.selectAll("line.AB")
          .data(data)
          .enter()
          .append("line")

          .attr("y1", 40)
          .attr("y2", 122)
          .attr("x1", function(d){return 122 + d['Rate of A']*990/100})
          .attr("x2", function(d){return 124 + d['Rate B']*990/100})
          .attr("stroke", 'transparent')
          .attr("opacity", '0.5')

      var linesBC = canvas.selectAll("line.BC")
          .data(data)
          .enter()
          .append("line")

          .attr("y1", 160)
          .attr("y2", 242)
          .attr("x1", function(d){return 124 + d['Rate B']*990/100})
          .attr("x2", function(d){return 122 + d['Rate of C']*990/100})
          .attr("stroke", 'transparent')
          .attr("opacity", '0.5')

//Filling in strike w/ color & a bar on hover
      var elements = [strikesA, strikesB, strikesC, linesAB, linesBC]

      function mouseover(d, group){
        var $this = d3.select(this),
            index = group[0].indexOf(this);

            var j = 0
            var rates = ["Rate of A", "Rate B", "Rate of C"]
        if (activeCategory.indexOf(d.CATEGORY)>-1 || activeCategory.length===0) {
          elements.forEach(function(set, groupIndex){
            set.forEach(function(strike){
              strike.forEach(function(actualStrike, i) {
                if (i===index){
                  d3.select(actualStrike).attr("fill", colors[d.CATEGORY]).attr("opacity", '1')

                  if (groupIndex < 3){
                    var indicator = canvas.append('rect')
                    .attr("x",120)
                    .attr("height", 27)
                    .attr("fill", colors[d.CATEGORY])
                    .attr("opacity", '0.5')
                    .attr("y", j + 6)
                    .attr("width", function(){return 120 + d[rates[groupIndex]]*990/100 - 120} )

                    j+=120;

                   actualStrike.indicator = indicator;
                  } else {
                    var connector = actualStrike;
                    d3.select(connector).attr('stroke', colors[d.CATEGORY])
                    connector.isconnector = true;
                  }
                }  else if (activeCategory.length===0){
                   d3.select(actualStrike).attr("opacity", '.5')

                }
              })
            })
          });
       //MODALS!!!!!!

          d3.select('.modal-category').text(d.CATEGORY).style({
            'background-color': colors[d.CATEGORY]
          });
          d3.select('.modal-text').text(d.DESCRIPTION);
          var x = +$this.attr('transform').split(' ')[0].replace('translate(', '') + 20
          var y = +$this.attr('transform').split(' ')[1].replace(')', '') + 70
          d3.select('.modal').style({
            display: 'block',
            left: x + 'px',
            top: y + 'px',

          })
          console.log($this.attr('transform'))

        }
      }

        function mouseout(d, group){
          var $this = d3.select(this),
            index = group[0].indexOf(this);


          elements.forEach(function(set){
            set.forEach(function(strike){
              strike.forEach(function(actualStrike, i) {
                if (i===index){
                  if (activeCategory.length===0){
                  d3.select(actualStrike).attr("fill", strikeColor).attr("opacity", '0.75')
                  }
                  if(actualStrike.indicator){
                      actualStrike.indicator.remove();
                  }
                  if(actualStrike.isconnector && activeCategory.length===0){
                    d3.select(actualStrike).attr("stroke", 'transparent')
                  }
                }  else if (activeCategory.length===0) {
                   d3.select(actualStrike).attr("opacity", '.75')
                 }
              })
            })
          });


          // get ride of modal 
          d3.select('.modal').style({
            display: 'none'
          })

        }


      strikesA.on('mouseover', function(d){
        mouseover.call(this, d, strikesA);
      });

      strikesA.on('mouseout', function(d){
        mouseout.call(this, d, strikesA)
      })

      strikesB.on('mouseover', function(d){
        mouseover.call(this, d, strikesB);
      });

      strikesB.on('mouseout', function(d){
        mouseout.call(this, d, strikesB)
      })

     strikesC.on('mouseover', function(d){
        mouseover.call(this, d, strikesC);
      });

      strikesC.on('mouseout', function(d){
        mouseout.call(this, d, strikesC)
      })

///CATEGORY TOGGLES!!!!!


var activeCategory=[];

function showCategory(){
  var $this = d3.select(this),
    category = $this.attr('data-category')
          elements.forEach(function(set, groupIndex){
            set.forEach(function(strike){
              strike.forEach(function(actualStrike, i) {
                if (data[i].CATEGORY===category){
                  d3.select(actualStrike).attr('fill', colors[category]).attr("opacity", '1')
                }  else {
                   d3.select(actualStrike).attr("opacity", '.5')
                }
              })
          })
  });
}

function reset(){

  elements.forEach(function(set, groupIndex){
  set.forEach(function(strike){
    strike.forEach(function(actualStrike, i) {
        d3.select(actualStrike).attr("opacity", '.75')
        if (activeCategory.indexOf(data[i].CATEGORY)===-1){
            d3.select(actualStrike).attr('fill', strikeColor).attr("opacity", '.5')
        } else {
          d3.select(actualStrike).attr("opacity", '1')
        }
    })
  })
});
}

d3.selectAll('.categories li').on('mouseover', showCategory)
d3.selectAll('.categories li').on('mouseout', reset)

function activateCategory(){
  var hasClass = d3.select(this).classed('active')


  var $this = d3.select(this),
    category = $this.attr('data-category')
      if (!hasClass) {
        activeCategory.push(category)
      } else {
        activeCategory=activeCategory.filter(function(cat){
          return cat !== category;
        })
      }
          elements.forEach(function(set, groupIndex){
            set.forEach(function(strike){
              strike.forEach(function(actualStrike, i) {
                if (data[i].CATEGORY===category && groupIndex>=3){

                  d3.select(actualStrike).attr('stroke', !hasClass ? colors[category] : 'transparent')
                }
              })
          })
  });

  d3.select(this).classed({
    active:!hasClass
  })

}

d3.selectAll('.categories li').on('click', activateCategory)


/* FILL WITH COLOR OF MY CHOOSING 

         .attr("stroke", function(d) {
            return colors[d.CATEGORY];
          });

       */




   