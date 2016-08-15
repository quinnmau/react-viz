const create = (elem, props) => {
  //global variables
  const margin = {left: 40, bottom: 40, right: 100, top: 75};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']);
  const color2 = d3.scale.ordinal().range(['trendline-blue', 'trendline-orange', 'trendline-teal', 'trendline-purple', 'trendline-green', 'trendline-brown']);
  const isFit = props.fit;

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
  gEnter.append('text').attr('class', 'title-text').text(props.title).attr('transform', 'translate(0, -25)');

  /*---------------- set scales----------------*/
  const xMax = d3.max(props.data, d => {return d[props.xVal]});

  const xScale = getXScale(innerW).domain([d3.min(props.data, d => {return d[props.xVal]}), d3.max(props.data, d => {return d[props.xVal]})]);
  const yScale = getYScale(innerH).domain([d3.min(props.data, d => {return d[props.yVal]}), d3.max(props.data, d => {return d[props.yVal]})]);

  /*--------------- set axes ------------------*/
  const xAxis = d3.svg.axis().orient('bottom').scale(xScale).innerTickSize(-innerH).tickPadding(10).ticks(5);
  const yAxis = d3.svg.axis().orient('left').scale(yScale).innerTickSize(-innerW).tickPadding(10).ticks(5);

  gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                      .transition().duration(1000).call(xAxis);
  gEnter.select('.y').transition().duration(1000).call(yAxis);

  /*--------------- data points ------------------*/

  //re-select main area where data points go
  const g = svg.select('.gEnter');

  //format data to make groups for the lines of best fit
  let groupedData = d3.nest().key(d => {return d[props.iden]}).entries(props.data);

  //select all the nonexistent lines of best fit and data join them to newly formatted data
  const bestFit = g.selectAll('.trendline').data(groupedData);

  //append lines of best fit
  bestFit.enter().append('line')
                  .attr('class', d => {return 'trendline ' + color2(d.key)})
                  // .attr('x1', d => {let max = d.values.map(d => {return d[props.xVal]}); return xScale(d3.min(max))})
                  .attr('x1', 0)
                  .attr('x2', d => {let max = d.values.map(d => {return d[props.xVal]}); return xScale(d3.max(max))})
                  .attr('y1', d => {
                    let pointInfo = linearRegression(d.values.map(d => {return d[props.xVal]}), d.values.map(d => {return d[props.yVal]}));
                    return yScale(pointInfo.intercept);
                  })
                  .attr('y2', d => {
                    let pointInfo = linearRegression(d.values.map(d => {return d[props.xVal]}), d.values.map(d => {return d[props.yVal]}));
                    let max = d3.max(d.values.map(d => {return d[props.xVal]}));
                    return yScale((max * pointInfo.slope + pointInfo.intercept));
                  })
                  .attr('opacity', 0);

  if (isFit) {
    bestFit.attr('opacity', 1);
  }

  //data-join cirlces
  const circles = g.selectAll('circle').data(props.data);

  //append and transition cirlces
  circles.enter().append('circle')
          .attr('cx', d => {return xScale(d[props.xVal])})
          .attr('cy', innerH)
          .attr('r', 7)
          .attr('opacity', 0)
          .attr('class', d => {return color(d[props.iden])});

  circles.transition().delay(300).duration(1000)
          .attr('opacity', 1)
          .attr('cy', d => {return yScale(d[props.yVal])});
}

//update
const update = (elem, props) => {
  const margin = {left: 40, bottom: 40, right: 100, top: 75};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']);
  const color2 = d3.scale.ordinal().range(['trendline-blue', 'trendline-orange', 'trendline-teal', 'trendline-purple', 'trendline-green', 'trendline-brown']);
  const isFit = props.fit;

  const cont = d3.select(elem);

  const svg = cont.selectAll('svg');

  const xScale = getXScale(innerW).domain([d3.min(props.data, d => {return d[props.xVal]}), d3.max(props.data, d => {return d[props.xVal]})]);
  const yScale = getYScale(innerH).domain([d3.min(props.data, d => {return d[props.yVal]}), d3.max(props.data, d => {return d[props.yVal]})]);

  const xAxis = d3.svg.axis().orient('bottom').scale(xScale).innerTickSize(-innerH).tickPadding(10).ticks(5);
  const yAxis = d3.svg.axis().orient('left').scale(yScale).innerTickSize(-innerW).tickPadding(10).ticks(5);

  const gEnter = svg.select('.gEnter');

  gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                      .transition().duration(1000).call(xAxis);
  gEnter.select('.y').transition().duration(1000).call(yAxis);

  //re-select main area where data points go
  const g = svg.select('.gEnter');

  //format data to make groups for the lines of best fit
  let groupedData = d3.nest().key(d => {return d[props.iden]}).entries(props.data);

  //select all the nonexistent lines of best fit and data join them to newly formatted data
  const bestFit = g.selectAll('.trendline').data(groupedData);

  bestFit.exit().remove();

  //transition lines of best fit
  bestFit.enter().append('line')
                  .attr('class', d => {return 'trendline ' + color2(d.key)})
                  // .attr('x1', d => {let max = d.values.map(d => {return d[props.xVal]}); return xScale(d3.min(max))})
                  .attr('x1', 0)
                  .attr('x2', d => {let max = d.values.map(d => {return d[props.xVal]}); return xScale(d3.max(max))})
                  .attr('y1', innerH)
                  .attr('y2', innerH)
                  .attr('opacity', 0);

  bestFit.transition().duration(1000)
              .attr('y1', d => {
                let pointInfo = linearRegression(d.values.map(d => {return d[props.xVal]}), d.values.map(d => {return d[props.yVal]}));
                return yScale(pointInfo.intercept);
              })
              .attr('y2', d => {
                let pointInfo = linearRegression(d.values.map(d => {return d[props.xVal]}), d.values.map(d => {return d[props.yVal]}));
                let max = d3.max(d.values.map(d => {return d[props.xVal]}));
                return yScale((max * pointInfo.slope + pointInfo.intercept));
              })
              .attr('opacity', 1);
  //data-join cirlces
  const circles = g.selectAll('circle').data(props.data);

  circles.exit().remove();

  //append and transition cirlces
  circles.enter().append('circle')
          .attr('cx', d => {return xScale(d[props.xVal])})
          .attr('cy', innerH)
          .attr('r', 7)
          .attr('opacity', 0)
          .attr('filter', 'blur(10px)')
          .attr('class', d => {return color(d[props.iden])});

  circles.transition().delay(300).duration(1000)
          .attr('opacity', 1)
          .attr('cy', d => {return yScale(d[props.yVal])});
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
  let n = y.length;
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
  lr.intercept = (sumY - lr.slope * sumX) / n;
  return lr;
}

export { create, update };
