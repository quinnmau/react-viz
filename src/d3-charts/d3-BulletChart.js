const create = (elem, props) => {
  //variables
  const margin = {left: 40, bottom: 40, right: 40, top: 75};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']);
  const color2 = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']);
  const color3 = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']);

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
  gEnter.append('g').attr('class', 'x-bullet');
  gEnter.append('g').attr('class', 'y axis');
  gEnter.append('text').attr('class', 'title').attr('transform', 'translate(0, -40)').text(props.title);

  const yValues = props.data.map(d => {return d[props.yVal]});
  const yScale = d3.scale.ordinal().rangeRoundBands([innerH, 0], 0.2).domain(yValues);

  const xValues = [];
  xValues.push(d3.max(props.data, d => {return d[props.target]}));
  xValues.push(d3.max(props.data, d => {return d[props.range]}));
  xValues.push(d3.max(props.data, d => {return d[props.actual]}));
  const xScale = d3.scale.linear().range([0, innerW]).domain([0, d3.max(xValues)]);

  const xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(2);
  // gEnter.select('.x-bullet').attr('transform', 'translate(0, ' + innerH + ')')
  //                     .transition().duration(1000)
  //                     .call(xAxis);

  // const yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(2);
  // gEnter.select('.y').call(yAxis);

  const g = svg.select('.gEnter');

  const secondaryBars = g.selectAll('.second-bar').data(props.data);

  secondaryBars.enter().append('rect')
              .attr('class', d => {console.log(d); return 'second-bar ' + color(d[props.yVal])})
              .attr('x', 0)
              .attr('y', d => {return yScale(d[props.yVal])})
              .attr('width', 0)
              .attr('height', yScale.rangeBand())
              .attr('opacity', 0.25);

  secondaryBars.transition().duration(1000)
                .attr('width', d => {return xScale(d[props.range])});

  const actualBars = g.selectAll('.actual-bar').data(props.data);

  actualBars.enter().append('rect')
              .attr('class', d => {console.log(d); return 'actual-bar ' + color2(d[props.yVal])})
              .attr('x', 0)
              .attr('y', d => {return yScale(d[props.yVal]) + yScale.rangeBand() * 0.25})
              .attr('width', 0)
              .attr('height', yScale.rangeBand() * 0.5);

  actualBars.transition().duration(1000)
              .attr('width', d => {return xScale(d[props.actual])});

  const targetBar = g.selectAll('.target-bar').data(props.data);

  targetBar.enter().append('rect')
            .attr('class', d => {console.log(d); return 'targer-bar ' + color3(d[props.yVal])})
            .attr('y', d => {return yScale(d[props.yVal]) + yScale.rangeBand() * (1 / 6) * .5})
            .attr('x', 0)
            .attr('height', yScale.rangeBand() * (5 / 6))
            .attr('width', 0);

  targetBar.transition().duration(1000)
              .attr('x', d => {return xScale(d[props.target])})
              .attr('width', yScale.rangeBand() * (1 / 3) * 0.5);

}

export {create};
