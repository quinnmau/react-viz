//create chart
const create = (elem, props) => {
  //variables
  const margin = {left: 40, bottom: 40, right: 40, top: 75};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['line-blue', 'line-orange', 'line-teal', 'line-purple', 'line-green', 'line-brown']).domain(props.yReal);
  const color2 = d3.scale.ordinal().range(['circle-blue', 'circle-orange', 'circle-teal', 'circle-purple', 'circle-green', 'circle-brown']).domain(props.yReal);
  const color3 = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']).domain(props.yReal);

  //container
  const cont = d3.select(elem);

  //svg
  const svg = cont.selectAll('svg').data([props.data]);

  //area for data points
  const gEnter = svg.enter().append('svg')
                    // .attr('width', props.width)
                    // .attr('height', props.height)
                    .attr('viewBox', '0 0 ' + props.width + ' ' + props.height)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append('g');

  //position area for data points
  gEnter.attr('class', 'gEnter')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .attr('width', innerW)
        .attr('height', innerH);

  //groups for axes and title
  gEnter.append('g').attr('class', 'x axis');
  gEnter.append('g').attr('class', 'y axis');
  gEnter.append('text').attr('class', 'title-text').attr('transform', 'translate(0, -25)').text(props.title);

  /*-------------------set scales---------------------------*/
  const xValues = props.data.map(d => {
    return d3.time.format('%Y-%m').parse(d[props.xVal]);
  });
  const xScale = getXScale(innerW - 50).domain(d3.extent(xValues, d => {return d}));

  const yValues = [];
  props.data.forEach(d => {
    for (let i in d) {
      if (props.yVal.indexOf(i) !== -1) {
        yValues.push(d[i]);
      }
    }
  });

  const yScale = getYScale(innerH).domain([0, d3.max(yValues, d => {return d}) + 5]);
  /*-------------------set axes---------------------------*/
  const xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(4).tickPadding(10);
  const yAxis = d3.svg.axis().scale(yScale).orient('left').innerTickSize(-innerW).tickPadding(10).ticks(5);

  gEnter.select('.x').attr('transform', 'translate(25, ' + innerH + ')')
                      .transition().duration(1000)
                      .call(xAxis);

  gEnter.select('.y').transition().duration(1000).call(yAxis);
  /*-------------------plot data---------------------------*/
  const line = d3.svg.line()
                  // .interpolate('basis')
                  .x(d => {return xScale(d.x) + 25})
                  .y(d => {return yScale(d.y)});

  // const deps = d3.keys(props.data[0]).filter(key => {return key !== props.xVal}).map(name => {
  //   return {
  //     name: name,
  //     values: props.data.map(a => {
  //       return {x: d3.time.format('%Y-%m').parse(a[props.xVal]), y: +a[name], name: name};
  //     })
  //   };
  // });

  const deps = props.yVal.map(name => {
    return {
      name: name,
      values: props.data.map(a => {
        return {x: d3.time.format('%Y-%m').parse(a[props.xVal]), y: +a[name], name: name};
      })
    }
  });


  const g = svg.select('.gEnter');

  const paths = g.selectAll('.a-path').data(deps);

  paths.enter().append('path')
        .attr('class', d => {return 'a-path ' + color(d.name)})
        .attr('d', d => {
          let arr = [];
          for (let i = 0; i < d.values.length; i++) {
            let obj = {x: (+d.values[i].x), y: d3.min(yValues)};
            arr.push(obj);
          }
          return line(arr);
        });

  paths.transition().duration(1000)
        .attr('d', d => {return line(d.values)});

  const circlesG = g.selectAll('.circle-g').data(deps);

  circlesG.enter().append('g')
          .attr('class', 'circle-g');

  const circles = circlesG.selectAll('circle').data(d => {return d.values});

  circles.enter().append('circle')
          .attr('class', d => {return 'connectors ' + color2(d.name)})
          .attr('r', 4)
          .attr('cx', d => {return xScale(+d.x) + 25})
          .attr('cy', innerH);

  circles.transition().duration(1000)
            .attr('cy', d => {return yScale(d.y)});
}


//update chart
const update = (elem, props) => {
  const margin = {left: 40, bottom: 40, right: 40, top: 75};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['line-blue', 'line-orange', 'line-teal', 'line-purple', 'line-green', 'line-brown']).domain(props.yReal);
  const color2 = d3.scale.ordinal().range(['circle-blue', 'circle-orange', 'circle-teal', 'circle-purple', 'circle-green', 'circle-brown']).domain(props.yReal);
  const color3 = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']).domain(props.yReal);

  const cont = d3.select(elem);

  const svg = cont.selectAll('svg');

  const gEnter = svg.select('.gEnter');

  const xValues = props.data.map(d => {
    return d3.time.format('%Y-%m').parse(d[props.xVal]);
  });
  const xScale = getXScale(innerW - 50).domain(d3.extent(xValues, d => {return d}));

  const yValues = [];
  props.data.forEach(d => {
    for (let i in d) {
      if (props.yVal.indexOf(i) !== -1) {
        yValues.push(d[i]);
      }
    }
  });

  const allY = [];
  props.data.forEach(d => {
    for (let i in d) {
      if (props.yReal.indexOf(i) !== -1) {
        allY.push(d[i]);
      }
    }
  });

  const yScale = getYScale(innerH).domain([0, d3.max(allY, d => {return d}) + 5]);

  const xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(4).tickPadding(10);
  const yAxis = d3.svg.axis().scale(yScale).orient('left').innerTickSize(-innerW).tickPadding(10).ticks(5);

  gEnter.select('.x').attr('transform', 'translate(25, ' + innerH + ')')
                      .transition().duration(1000)
                      .call(xAxis);

  gEnter.select('.y').transition().duration(1000).call(yAxis);

  const line = d3.svg.line()
                  // .interpolate('basis')
                  .x(d => {return xScale(d.x) + 25})
                  .y(d => {return yScale(d.y)});

  // const deps = d3.keys(props.data[0]).filter(key => {return key !== props.xVal}).map(name => {
  //   return {
  //     name: name,
  //     values: props.data.map(a => {
  //       return {x: d3.time.format('%Y-%m').parse(a[props.xVal]), y: +a[name], name: name};
  //     })
  //   };
  // });

  const deps = props.yVal.map(name => {
    return {
      name: name,
      values: props.data.map(a => {
        return {x: d3.time.format('%Y-%m').parse(a[props.xVal]), y: +a[name], name: name};
      })
    }
  });

  const g = svg.select('.gEnter');

  const paths = g.selectAll('.a-path').data(deps);

  paths.exit().remove()

  paths.enter().append('path')
        .attr('class', d => {return 'a-path ' + color(d.name)})
        .attr('d', d => {
          let arr = [];
          for (let i = 0; i < d.values.length; i++) {
            let obj = {x: (+d.values[i].x), y: d3.min(yValues)};
            arr.push(obj);
          }
          return line(arr);
        });

  paths.transition().duration(0)
        .attr('d', d => {return line(d.values)})
        .attr('class', d => {return 'a-path ' + color(d.name)});

  const circlesG = g.selectAll('.circle-g').data(deps);

  circlesG.exit().remove();

  circlesG.enter().append('g')
          .attr('class', 'circle-g');

  const circles = circlesG.selectAll('circle').data(d => {return d.values});

  circles.exit().remove();

  circles.enter().append('circle')
          .attr('class', d => {return 'connectors ' + color2(d.name)})
          .attr('r', 4)
          .attr('cx', d => {return xScale(+d.x) + 25})
          .attr('cy', innerH);

  circles.transition().duration(0)
            .attr('cy', d => {return yScale(d.y)})
            .attr('class', d => {return 'connectors ' + color2(d.name)});

}

//returns an x scale. Set domain later
const getXScale = (width) => {
  return d3.time.scale().range([0, width]);
}

//returns a y scale. set domain later
const getYScale = (height) => {
  return d3.scale.linear().range([height, 0]);
}

export { create, update };
