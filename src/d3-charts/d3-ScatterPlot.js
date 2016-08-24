const create = (elem, props) => {
  //global variables
  const margin = {left: 40, bottom: 40, right: 40, top: 75};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']).domain(props.yReal);
  const color2 = d3.scale.ordinal().range(['trendline-blue', 'trendline-orange', 'trendline-teal', 'trendline-purple', 'trendline-green', 'trendline-brown']).domain(props.yReal);
  const isFit = props.fit;
  console.log(isFit);

  //container
  const cont = d3.select(elem);

  //svg

  //format data to make groups for the lines of best fit
  let groupedData = d3.nest().key(d => {return d[props.iden]}).entries(props.data);

  let filteredData = groupedData.filter(d => {
    return props.curr.indexOf(d.key) != -1;
  });

  let newData = [];
  filteredData.forEach(d => {
    d.values.map(c => {
      newData.push(c);
    });
  });

  const svg = cont.selectAll('svg').data([newData]);

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
  gEnter.append('text').attr('class', 'title-text').text(props.title).attr('transform', 'translate(0, -25)');

  /*---------------- set scales----------------*/


  const xMax = d3.max(newData, d => {return d[props.x]});

  const xScale = getXScale(innerW).domain([d3.min(props.data, d => {return d[props.x]}), d3.max(props.data, d => {return d[props.x]})]);
  const yScale = getYScale(innerH).domain([d3.min(props.data, d => {return d[props.y]}), d3.max(props.data, d => {return d[props.y]})]);

  /*--------------- set axes ------------------*/
  const xAxis = d3.svg.axis().orient('bottom').scale(xScale).innerTickSize(-innerH).tickPadding(10).ticks(5);
  const yAxis = d3.svg.axis().orient('left').scale(yScale).innerTickSize(-innerW).tickPadding(10).ticks(5);

  gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                      .transition().duration(1000).call(xAxis);
  gEnter.select('.y').transition().duration(1000).call(yAxis);

  /*--------------- data points ------------------*/

  //re-select main area where data points go
  const g = svg.select('.gEnter');




  //select all the nonexistent lines of best fit and data join them to newly formatted data
  const bestFit = g.selectAll('.trendline').data(groupedData);

  //append lines of best fit
  bestFit.enter().append('line')
                  .attr('class', d => {return 'trendline ' + color2(d.key)})
                  // .attr('x1', d => {let max = d.values.map(d => {return d[props.x]}); return xScale(d3.min(max))})
                  .attr('x1', d => {
                    let pointInfo = linearRegression(d.values.map(d => {return d[props.x]}), d.values.map(d => {return d[props.y]}));
                    let max = d3.max(d.values.map(d => {return d[props.x]}));
                    if (yScale(pointInfo.intercept) < 0) {
                      console.log(((d3.max(yScale.domain()) - pointInfo.intercept) / pointInfo.slope));
                      return ((d3.max(yScale.domain()) - pointInfo.intercept) / pointInfo.slope);
                    } else {
                      return 0;
                    }
                  })
                  .attr('x2', d => {let max = d.values.map(d => {return d[props.x]}); return xScale(d3.max(max))})
                  .attr('y1', d => {
                    let pointInfo = linearRegression(d.values.map(d => {return d[props.x]}), d.values.map(d => {return d[props.y]}));
                    if (pointInfo.intercept < 0) {
                      return yScale(d3.max(yScale.domain()));
                    } else {
                      return yScale(pointInfo.intercept);
                    }
                  })
                  .attr('y2', d => {
                    let pointInfo = linearRegression(d.values.map(d => {return d[props.x]}), d.values.map(d => {return d[props.y]}));
                    let max = d3.max(d.values.map(d => {return d[props.x]}));
                    return yScale((max * pointInfo.slope + pointInfo.intercept));
                  })
                  .style('opacity', () => {
                    if (isFit) {
                      return 1;
                    }
                    return 0;
                  });

  //data-join cirlces
  const circles = g.selectAll('circle').data(newData);

  //append and transition cirlces
  circles.enter().append('circle')
          .attr('cx', d => {return xScale(d[props.x])})
          .attr('cy', innerH)
          .attr('r', 7)
          .attr('opacity', 0)
          .attr('title', d => {return d[props.iden]})
          .attr('class', d => {return color(d[props.iden])});

  circles.transition().duration(1000)
          .attr('opacity', 1)
          .attr('cy', d => {return yScale(d[props.y])})
          .attr('r', 7)
          .attr('cx', d => {return xScale(d[props.x])})
          .attr('class', d => {return color(d[props.iden])});

  circles.exit().remove();
}

//update
const update = (elem, props) => {
  const margin = {left: 40, bottom: 40, right: 40, top: 75};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']).domain(props.yReal);
  const color2 = d3.scale.ordinal().range(['trendline-blue', 'trendline-orange', 'trendline-teal', 'trendline-purple', 'trendline-green', 'trendline-brown']).domain(props.yReal);
  const isFit = props.fit;

  const cont = d3.select(elem);

  const svg = cont.selectAll('svg');

  //format data to make groups for the lines of best fit
  let groupedData = d3.nest().key(d => {return d[props.iden]}).entries(props.data);

  let filteredData = groupedData.filter(d => {
    return props.curr.indexOf(d.key) != -1;
  });

  let newData = [];
  filteredData.forEach(d => {
    d.values.forEach(c => {
      newData.push(c);
    });
  });

  const xScale = getXScale(innerW).domain([d3.min(props.data, d => {return d[props.x]}), d3.max(props.data, d => {return d[props.x]})]);
  const yScale = getYScale(innerH).domain([d3.min(props.data, d => {return d[props.y]}), d3.max(props.data, d => {return d[props.y]})]);

  const xAxis = d3.svg.axis().orient('bottom').scale(xScale).innerTickSize(-innerH).tickPadding(10).ticks(5);
  const yAxis = d3.svg.axis().orient('left').scale(yScale).innerTickSize(-innerW).tickPadding(10).ticks(5);

  const gEnter = svg.select('.gEnter');

  gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                      .transition().duration(1000).call(xAxis);
  gEnter.select('.y').transition().duration(1000).call(yAxis);

  //re-select main area where data points go
  const g = svg.select('.gEnter');



  // //select all the nonexistent lines of best fit and data join them to newly formatted data
  const bestFit = g.selectAll('.trendline').data(filteredData);

  bestFit.exit().remove();

  //transition lines of best fit
  bestFit.enter().append('line')
                  .attr('class', d => {return 'trendline ' + color2(d.key)})
                  // .attr('x1', d => {let max = d.values.map(d => {return d[props.x]}); return xScale(d3.min(max))})
                  .attr('x1', 0)
                  .attr('x2', d => {let max = d.values.map(d => {return d[props.x]}); return xScale(d3.max(max))})
                  .attr('y1', innerH)
                  .attr('y2', innerH)
                  .attr('opacity', 0);

  bestFit.transition().duration(0)
              .attr('y1', d => {
                let pointInfo = linearRegression(d.values.map(d => {return d[props.x]}), d.values.map(d => {return d[props.y]}));
                return yScale(pointInfo.intercept);
              })
              .attr('y2', d => {
                let pointInfo = linearRegression(d.values.map(d => {return d[props.x]}), d.values.map(d => {return d[props.y]}));
                let max = d3.max(d.values.map(d => {return d[props.x]}));
                return yScale((max * pointInfo.slope + pointInfo.intercept));
              })
              .attr('opacity', () => {
                if (isFit) {
                  return 1;
                }
                return 0;
              })
              .attr('class', d => {return 'trendline ' + color2(d.key)});

  //data-join cirlces
  const circles = g.selectAll('circle').data(newData);

  circles.exit().remove();

  //append and transition cirlces
  circles.enter().append('circle')
          .attr('cx', d => {return xScale(d[props.x])})
          .attr('cy', innerH)
          .attr('r', 7)
          .attr('title', d => {return d[props.iden]})
          .attr('class', d => {return color(d[props.iden])});

  circles.transition().duration(0)
          .attr('cx', d => {return xScale(d[props.x])})
          .attr('cy', d => {return yScale(d[props.y])})
          .attr('r', 7);

  circles.attr('class', d => {return color(d[props.iden])});
}

//creates and returns x scale without domain
const getXScale = (w) => {
  return d3.scale.linear().range([0, w]);
}

//creates and returns y scale without domain
const getYScale = (h) => {
  return d3.scale.linear().range([h, 0]);
}

//calculates line of best fit
const linearRegression = (x, y) => {
  const lr = {};
  let n = y.length - 1;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  let sumYY = 0;

  for (let i = 0; i < y.length; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += (x[i] * y[i]);
    sumXX += (x[i] * x[i]);
    sumYY += (y[i] * y[i]);
  }

  lr.slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  lr.intercept = (sumXX * sumY - sumX * sumXY) / (n * sumXX - sumX * sumX);
  return lr;
}

export { create, update };
