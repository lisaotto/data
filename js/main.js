       var colors = {
        "Sanitation" : "#CFBB4A",
        "Food" : "#8E9650",
        "Construction" : "#7B8B88",
        "Infestation" : "#B07242"
       };

        var canvas = d3.select("body").append("svg")
          .attr("width", 1200)
          .attr("height", 400);

          var bars = canvas.selectAll("rect.A")
          .data(data)
          .enter()
          .append("rect")

          .attr("width", 4)
          .attr("height", 100)
          .attr("y", 0)
          .attr("x", function (d) {return 130 + d['Rate of A']*990/100;})
          .attr("fill", function(d) {
            console.log(d.CATEGORY)
            return colors[d.CATEGORY];
          });

          var bars = canvas.selectAll("rect.B")
          .data(data)
          .enter()
          .append("rect")

          .attr("width", 4)
          .attr("height", 100)
          .attr("y", 140)
          .attr("x", function (d) {return 130 + d['Rate B']*990/100;})
          .attr("fill", function(d) {
            console.log(d.CATEGORY)
            return colors[d.CATEGORY];
          });


          var bars = canvas.selectAll("rect.C")
          .data(data)
          .enter()
          .append("rect")

          .attr("width", 4)
          .attr("height", 100)
          .attr("y", 280)
          .attr("x", function (d) {return 130 + d['Rate of C']*990/100;})
          .attr("fill", function(d) {
            console.log(d.CATEGORY)
            return colors[d.CATEGORY];
          });







   