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
  //note that spark axes need to be different!
  gEnter.append('g').attr('class', 'x axis');
  gEnter.append('g').attr('class', 'y axis');

  const xGroups = props.data.map(d => {return d[props.xVal]});
  const groupScale = d3.scale.ordinal().rangeRoundBands([0, innerW], 0.2).domain(xGroups);

  //within group scale
  const xValues = props.yVal.map(d => {return d});
  const xScale = d3.scale.ordinal().domain(xValues).rangeRoundBands([0, groupScale.rangeBand()]);

  //format data to make groups of bars
  props.data.forEach(d => {
    d.groupDetails = xValues.map(name => {return {name: name, value: +d[name]}});
  });

  //y scale
  const yScale = d3.scale.linear()
                  .domain([0, d3.max(props.data, d => {return d3.max(d.groupDetails, d => {return d.value})})])
                  .range([innerH, 0]);

  //set axes
  const xAxis = d3.svg.axis().orient('bottom').scale(groupScale);
  const yAxis = d3.svg.axis().orient('left').scale(yScale).ticks(0);

  //call axes
  svg.select('.x').attr('transform', 'translate(' + 0 + ', ' + innerH + ')')
                  .transition()
                  .duration(1000)
                  .call(xAxis);

  svg.select('.y')
            .transition()
            .duration(1000)
            .call(yAxis);

  const g = svg.select('.gEnter');

  const groups = g.selectAll('.groups').data(props.data);

  groups.enter().append('g')
          .attr('class', 'groups')
          .attr('transform', d => {return 'translate(' + groupScale(d[props.xVal]) + ', 0)'});

  const bars = groups.selectAll('rect').data(d => {return d.groupDetails});

  bars.enter().append('rect')
      .attr('x', d => {return xScale(d.name)})
      .attr('y', innerH)
      .attr('class', 'bars')
      .attr('width', xScale.rangeBand())
      .attr('height', 0)
      .attr('fill', d => {return color(d.name)});

  bars.exit().remove();

  bars.transition().duration(1000)
      .attr('y', d => {return yScale(d.value)})
      .attr('height', d => {return (innerH - yScale(d.value))});
}

export {create};
