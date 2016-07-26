const create = (elem, props) => {
  //variables
  const margin = {left: 40, bottom: 40, right: 40, top: 20};
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

  const xValues = props.data.map(d => {
    return d3.time.format('%Y-%m-%d').parse(d[props.xVal]);
  });
  const xScale = getXScale(innerW).domain(d3.extent(xValues, d => {return d}));

  const yValues = [];
  props.data.forEach(d => {
    for (let i in d) {
      if (props.yVal.indexOf(i) !== -1) {
        yValues.push(d[i]);
      }
    }
  });

  // const yScale = getYScale(innerH).domain(d3.extent(yValues, d => {return d}));
  const yScale = getYScale(innerH).domain([0, d3.max(yValues)]);

  const xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickValues(xScale.domain()).tickFormat(d3.time.format('%B'));
  const yAxis = d3.svg.axis().scale(yScale).orient('left').innerTickSize(-innerW).ticks(3);

  // gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
  //                     .transition().duration(1000)
  //                     .call(xAxis);

  // gEnter.select('.y').transition().duration(1000).call(yAxis);

  const line = d3.svg.line()
                  // .interpolate('basis')
                  .x(d => {return xScale(d.x)})
                  .y(d => {return yScale(d.y)});

  const deps = d3.keys(props.data[0]).filter(key => {return key !== props.xVal}).map(name => {
    return {
      name: name,
      values: props.data.map(a => {
        return {x: d3.time.format('%Y-%m-%d').parse(a[props.xVal]), y: +a[name], name: name};
      })
    };
  });

  const g = svg.select('.gEnter');

  console.log(deps);

  const paths = g.selectAll('.a-path').data(deps);

  paths.enter().append('path')
        .attr('class', 'a-path')
        .attr('opacity', 0)
        .attr('d', d => {
          let arr = [];
          for (let i = 0; i < d.values.length; i++) {
            let obj = {x: d.values[i].x, y: 0};
            arr.push(obj);
          }
          return line(arr);
        })
        .style('stroke', d => {return color(d.name)});

  paths.transition().duration(1000)
        .attr('opacity', 1)
        .attr('d', d => {return line(d.values)});

  const circlesG = g.selectAll('.circle-g').data(deps);

  circlesG.enter().append('g')
          .attr('class', 'circle-g');

  const circles = circlesG.selectAll('circle').data(d => {return d.values});

  circles.enter().append('circle')
          .attr('class', 'connectors')
          .attr('r', 4)
          .attr('opacity', 0)
          .attr('cx', d => {return xScale(d.x)})
          .attr('cy', innerH)
          .attr('fill', 'white')
          .style('stroke', d => {return color(d.name)});

  circles.transition().duration(1000)
            .attr('opacity', 1)
            .attr('cy', d => {return yScale(d.y)});
}

const update = () => {
  console.log('shoes');
}

const getXScale = (width) => {
  return d3.time.scale().range([0, width]);
}

//returns a y scale. set domain later
const getYScale = (height) => {
  return d3.scale.linear().range([height, 0]);
}

export { create };
