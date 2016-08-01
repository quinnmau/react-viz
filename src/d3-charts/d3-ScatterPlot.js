const create = (elem, props) => {
  const margin = {left: 40, bottom: 40, right: 100, top: 75};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']);
  const color2 = d3.scale.ordinal().range(['trendline-blue', 'trendline-orange', 'trendline-teal', 'trendline-purple', 'trendline-green', 'trendline-brown']);

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
  gEnter.append('text').attr('class', 'title').text(props.title).attr('transform', 'translate(0, -25)');

  /*---------------- set scales----------------*/
  const xMax = d3.max(props.data, d => {return d[props.xVal]});

  const xScale = getXScale(innerW).domain([d3.min(props.data, d => {return d[props.xVal]}), d3.max(props.data, d => {return d[props.xVal]})]);
  const yScale = getYScale(innerH).domain([d3.min(props.data, d => {return d[props.yVal]}), d3.max(props.data, d => {return d[props.yVal]})]);

  /*--------------- set axes ------------------*/
  const xAxis = d3.svg.axis().orient('bottom').scale(xScale).innerTickSize(-innerH).tickPadding(10);
  const yAxis = d3.svg.axis().orient('left').scale(yScale).innerTickSize(-innerW).tickPadding(10);

  gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                      .transition().duration(1000).call(xAxis);
  gEnter.select('.y').transition().duration(1000).call(yAxis);

  /*--------------- data points ------------------*/

  const g = svg.select('.gEnter');

  let groupedData = d3.nest().key(d => {return d[props.iden]}).entries(props.data);

  const bestFit = g.selectAll('.trendline').data(groupedData);

  bestFit.enter().append('line')
                  .attr('class', d => {return color2(d.key)})
                  .attr('x1', d => {let max = d.values.map(d => {return d[props.xVal]}); return xScale(d3.min(max))})
                  .attr('x2', d => {let max = d.values.map(d => {return d[props.xVal]}); return xScale(d3.max(max))})
                  .attr('y1', d => {
                    console.log(d.values);
                    console.log(d.values.map(d => {return d[props.xVal]}));
                    console.log(d.values.map(d => {return d[props.yVal]}));
                    let pointInfo = linearRegression(d.values.map(d => {return d[props.xVal]}), d.values.map(d => {return d[props.yVal]}));
                    return yScale(pointInfo.intercept);
                  })
                  .attr('y2', d => {
                    let pointInfo = linearRegression(d.values.map(d => {return d[props.xVal]}), d.values.map(d => {return d[props.yVal]}));
                    let max = d3.max(d.values.map(d => {return d[props.xVal]}));
                    return yScale((max * pointInfo.slope + pointInfo.intercept));
                  });

  const circles = g.selectAll('circle').data(props.data);

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
const update = () => {

}

const getXScale = (w) => {
  return d3.scale.linear().range([0, w]);
}

const getYScale = (h) => {
  return d3.scale.linear().range([h, 0]);
}

// const yAvg = (arr, y) => {
//   let sum = 0;
//   arr.forEach(d => {
//     sum += d[y];
//   });
//   return sum / arr.length;
// }
//
// const xAvg = (arr, x) => {
//   let sum = 0;
//   arr.forEach(d => {
//     sum += d[x];
//   });
//   return sum / arr.length;
// }
//
// const point = (val, arr, x, y) => {
//   let slope = xAvg(arr, x) / yAvg(arr, y);
//   let yInt = arr[0][y] - slope * arr[0][x];
//   console.log('line equation: y = ' + slope + ' * ' + val + ' + ' + yInt);
//   return slope * val - yInt;
// }

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
  console.log(lr);
  return lr;
}

export { create, update };
