import React from 'react';
import ReactDOM from 'react-dom';
// import d3 from 'd3';

class ColumnChart extends React.Component {
  render() {
    return (
      <div className="vis">

      </div>
    );
  }

  //enter
  componentDidMount() {
    //component globals
    const data = this.props.data;
    const width = this.props.width;
    const height = this.props.height;
    const margin = {
      left: 40,
      bottom: 40,
      right: 40,
      top: 75
    };
    const demo = this.props.demo;

    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    //element in which to put the chart(s)
    const cont = d3.select(ReactDOM.findDOMNode(this));

    //svg to work with
    const svg = cont.selectAll('svg').data([data]);

    //group for data and axes
    const gEnter = svg.enter().append('svg')
                      // .attr('width', width)
                      // .attr('height', height)
                      .attr('viewBox', '0 0 ' + width + ' ' + height)
                      .attr("preserveAspectRatio", "xMinYMin meet")
                      .attr('class', 'canvas')
                      .append('g');

    //position group
    gEnter.attr('width', innerW)
          .attr('height', innerH)
          .attr('class', 'gEnter')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    //group for x axis
    gEnter.append('g').attr('class', 'x axis');

    //group for y axis
    gEnter.append('g').attr('class', 'y axis');

    //title
    gEnter.append('text').attr('class', 'title-text').text(this.props.title)
                  .attr('transform', 'translate(0, -25)');

    //group scale
    /* format x values to start with capitals */
    const xGroups = data.map(d => {return d[this.props.xVal]});
    const groupScale = d3.scale.ordinal().rangeRoundBands([0, innerW], 0.4).domain(xGroups);

    //within group scale
    const xValues = this.props.yVal.map(d => {return d});
    const xScale = d3.scale.ordinal().domain(xValues).rangeRoundBands([0, groupScale.rangeBand()]);

    //format data to make groups of bars
    data.forEach(d => {
      d.groupDetails = xValues.map(name => {return {name: name, value: +d[name]}});
    });

    const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']).domain(this.props.yReal);
    const color2 = d3.scale.ordinal().range(['half-blue', 'half-orange', 'half-teal', 'half-purple', 'half-green', 'half-brown']).domain(this.props.yReal);

    //y scale
    const yScale = d3.scale.linear()
                    .domain([0, d3.max(data, d => {return d3.max(d.groupDetails, d => {return d.value})}) + 5])
                    .range([innerH, 0]);

    //set axes
    const xAxis = d3.svg.axis().orient('bottom').scale(groupScale).tickPadding(10);
    const yAxis = d3.svg.axis().orient('left').scale(yScale).innerTickSize(-innerW).ticks(5).tickPadding(10);

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

    const groups = g.selectAll('.groups').data(data);

    groups.enter().append('g')
            .attr('class', 'groups')
            .attr('transform', d => {return 'translate(' + groupScale(d[this.props.xVal]) + ', 0)'});

    const bars = groups.selectAll('.rect').data(d => {return d.groupDetails});

    let count = 0;
    bars.enter().append('rect')
        .attr('x', d => {return xScale(d.name)})
        .attr('y', innerH)
        .attr('class', d => {
          if (demo && count == 4) {
            count++;
            console.log('shoes');
            return 'rect orange';
          } else {
            count++;
            return 'rect ' + color(d.name);
          }
        })
        .attr('width', xScale.rangeBand())
        .attr('height', 0);

    // bars.attr('fill', d => {return color(d.name)});

    bars.exit().remove();

    bars.transition().duration(1000)
        .attr('y', d => {return yScale(d.value)})
        .attr('height', d => {return (innerH - yScale(d.value))});

    // bars.on('mouseover', function(d) {
    //   bars.attr('class', d => {return 'rect ' + color2(d.name)});
    //   d3.select(this).attr('class', 'rect ' + color(d.name));
    // });
    //
    // bars.on('mouseout', function(d) {
    //   bars.attr('class', d => {return 'rect ' + color(d.name)});
    // });
  }

  //update
  componentDidUpdate() {
    const data = this.props.data;
    const width = this.props.width;
    const height = this.props.height;
    const demo = this.props.demo;
    const margin = {
      left: 40,
      bottom: 40,
      right: 40,
      top: 75
    };

    const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']).domain(this.props.yReal);
    const color2 = d3.scale.ordinal().range(['half-blue', 'half-orange', 'half-teal', 'half-purple', 'half-green', 'half-brown']).domain(this.props.yReal);

    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    //element in which to put the chart(s)
    const cont = d3.select(ReactDOM.findDOMNode(this));

    //svg to work with
    const svg = cont.selectAll('svg');

    //update scales
    const xGroups = data.map(d => {return d[this.props.xVal]});
    const groupScale = d3.scale.ordinal().rangeRoundBands([0, innerW], 0.4).domain(xGroups);

    const xValues = this.props.yVal.map(d => {return d});
    const xScale = d3.scale.ordinal().domain(xValues).rangeRoundBands([0, groupScale.rangeBand()]);

    data.forEach(d => {
      d.groupDetails = xValues.map(name => {return {name: name, value: +d[name]}});
    });
    console.log(xValues);
    console.log(data);

    const allVals = [];
    data.forEach(d => {
      this.props.yReal.map(name => {
        allVals.push(d[name]);
      })
    });

    const yScale = d3.scale.linear()
                    .domain([0, d3.max(data, d => {return d3.max(allVals)})])
                    .range([innerH, 0]);

    //update axes
    const xAxis = d3.svg.axis().orient('bottom').scale(groupScale);
    const yAxis = d3.svg.axis().orient('left').scale(yScale).innerTickSize(-innerW);

    // svg.select('.x').attr('transform', 'translate(' + 0 + ', ' + innerH + ')')
    //                 .transition().duration(1000)
    //                 .call(xAxis);
    //
    // svg.select('.y')
    //     .transition().duration(1000)
    //     .call(yAxis);

    //update bars
    const g = svg.select('.gEnter');

    const groups = g.selectAll('.groups').data(data);

    groups.transition().duration(0)
            .attr('transform', d => {return 'translate(' + groupScale(d[this.props.xVal]) + ', 0)'});

    const bars = groups.selectAll('.rect').data(d => {return d.groupDetails});

    //make bars transition out!!!!!!!!!!!!!!!!
    bars.exit().transition().duration(0).attr('height', 0).attr('y', innerH).remove();

    bars.enter().append('rect')
        .attr('class', d => {return 'rect ' + color(d.name);})
        .attr('height', 0)
        .attr('y', innerH);

    let count = 0;
    bars.transition().duration(0)
      .attr('x', d => {return xScale(d.name)})
      .attr('y', d => {return yScale(d.value)})
      .attr('width', xScale.rangeBand())
      .attr('class', d => {return 'rect ' + color(d.name)})
      .attr('height', d => {return (innerH - yScale(d.value))});

      // bars.on('mouseover', function(d) {
      //   bars.attr('class', d => {return 'rect ' + color2(d.name)});
      //   d3.select(this).attr('class', 'rect ' + color(d.name));
      // });
      //
      // bars.on('mouseout', function(d) {
      //   bars.attr('class', d => {return 'rect ' + color(d.name)});
      // });
  }

  //exit remove
  componentWillUnmount() {

  }
}

export default ColumnChart;
