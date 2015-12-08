       var colors = {
        "Sanitation" : "#d3a14a",
        "Food" : "#717f34",
        "Construction" : "#618d80",
        "Infestation" : "#b24041"
       };

       var linesvg ="3.053,-0.223 2.789,0.49 2.408,1.202 2.436,1.913 2.51,2.624 2.475,3.333 2.19,4.043 3.115,4.753 3.105,5.462 2.421,6.172 2.876,6.882 2.773,7.593 2.283,8.303 2.559,9.015 2.234,9.727 3.078,10.441 2.313,11.156 2.201,11.871 2.975,12.584 2.619,13.298 2.699,14.01 2.157,14.723 3.109,15.435 2.223,16.147 2.869,16.86 2.559,17.574 2.896,18.289 2.931,19.005 2.317,19.72 2.441,20.434 2.721,21.148 2.944,21.861 2.85,22.576 2.615,23.291 2.862,24.008 2.295,24.723 3.088,25.438 2.838,26.154 2.529,26.863 2.538,27.574 2.89,28.287 2.848,29.002 3.078,29.719 2.244,30.434 2.844,31.148 2.256,31.863 2.816,32.582 2.571,33.299 2.49,34.018 2.869,34.736 2.312,35.455 2.695,36.172 2.421,36.889 2.432,37.609 2.581,38.33 2.39,39.053 2.938,39.777"
    

        var canvas = d3.select("body").append("svg")
          .attr("class", "data")
          .attr("width", 1200)
          .attr("height", 400);
//Adding Data Points
          var bars = canvas.selectAll("polyline.A")
          .data(data)
          .enter()
          .append("polyline")

          
          .attr("stroke-width", 3)
          .attr("stroke-miterlimit", 10)
          .attr("points", linesvg)
          .attr("transform", function(d){
            var trs = (120 + d['Rate of A']*990/100)+ " 0"
            return "translate(" + trs +")";
          })
          .attr("stroke", function(d) {
            console.log(d.CATEGORY)
            return colors[d.CATEGORY];
          });


          var bars = canvas.selectAll("polyline.B")
          .data(data)
          .enter()
          .append("polyline")

         .attr("stroke-width", 3)
          .attr("stroke-miterlimit", 10)
          .attr("points", linesvg)
          .attr("transform", function(d){
            var trs = (120 + d['Rate B']*990/100)+ " 100"
            return "translate(" + trs +")";
          })
     
          .attr("stroke", function(d) {
            console.log(d.CATEGORY)
            return colors[d.CATEGORY];
          });


          var bars = canvas.selectAll("polyline.C")
          .data(data)
          .enter()
          .append("polyline")

          .attr("stroke-width", 3)
          .attr("stroke-miterlimit", 10)
          .attr("points", linesvg)
          .attr("transform", function(d){
            var trs = (120 + d['Rate of C']*990/100)+ " 200"
            return "translate(" + trs +")";
          })
          .attr("stroke", function(d) {
            console.log(d.CATEGORY)
            return colors[d.CATEGORY];
          });

//Connecting Data Points
          var linesAB = canvas.selectAll("line.AB")
          .data(data)
          .enter()
          .append("line")

          .attr("y1", 40)
          .attr("y2", 100)
          .attr("x1", function(d){return 122 + d['Rate of A']*990/100})
          .attr("x2", function(d){return 122 + d['Rate B']*990/100})
          .attr("stroke", function(d) {
            console.log(d.CATEGORY)
            return colors[d.CATEGORY];
          });

      var lineBC = canvas.selectAll("line.BC")
          .data(data)
          .enter()
          .append("line")

          .attr("y1", 140)
          .attr("y2", 200)
          .attr("x1", function(d){return 122 + d['Rate B']*990/100})
          .attr("x2", function(d){return 122 + d['Rate of C']*990/100})
          .attr("stroke", function(d) {
            console.log(d.CATEGORY)
            return colors[d.CATEGORY];
          });

/*Filling in with a bar on hover
      function mouseover(d, change){
        var $this = d3.select(this),
        index = 

      }

*/




   