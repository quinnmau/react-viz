const create = (elem, props) => {
  const margin = {left: 40, bottom: 40, right: 100, top: 75};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['#2975E9', '#37dad3', '#fd810e', '#ffcf3z']);

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
                  .attr('class', 'trendline')
                  .attr('x1', 0)
                  .attr('x2', innerW)
                  .attr('y1', d => {console.log(point(0, d.values, props.xVal, props. yVal)); return point(0, d.values, props.xVal, props. yVal)})
                  .attr('y2', d => {return point(innerW, d.values, props.xVal, props. yVal)});

  const circles = g.selectAll('circle').data(props.data);

  circles.enter().append('circle')
          .attr('cx', d => {return xScale(d[props.xVal])})
          .attr('cy', innerH)
          .attr('r', 7)
          .attr('opacity', 0)
          .attr('fill', d => {return color(d[props.iden])});

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

const yAvg = (arr, y) => {
  let sum = 0;
  arr.forEach(d => {
    sum += d[y];
  });
  return sum / arr.length;
}

const xAvg = (arr, x) => {
  let sum = 0;
  arr.forEach(d => {
    sum += d[x];
  });
  return sum / arr.length;
}

const point = (val, arr, x, y) => {
  let slope = xAvg(arr, x) / yAvg(arr, y);
  let yInt = arr[0][y] - slope * arr[0][x];
  return slope * val - yInt;
}

export { create, update };
