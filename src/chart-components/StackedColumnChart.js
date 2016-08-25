import React from 'react';
import ReactDOM from 'react-dom';

class StackedColumnChart extends React.Component {
  render() {
    return (
      <div className="vis">

      </div>
    )
  }

  //create chart
  componentDidMount() {
    //dimensions of data points area
    const vars = this.globals();
    const innerW = vars.width - vars.margin.left - vars.margin.right;
    const innerH = vars.height - vars.margin.top - vars.margin.bottom;
    const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']).domain(this.props.yReal);
    const color2 = d3.scale.ordinal().range(['half-blue', 'half-orange', 'half-teal', 'half-purple', 'half-green', 'half-brown']).domain(this.props.yReal);
    const normalized = this.props.normalized;
    console.log(normalized);
    //container to hold everything
    const cont = d3.select(ReactDOM.findDOMNode(this));

    //svg to work with
    const svg = cont.selectAll('svg').data([vars.data]);

    //group that holds all data points and axes and legend
    const gEnter = svg.enter().append('svg')
                        // .attr('width', vars.width)
                        // .attr('height', vars.height)
                        .attr('viewBox', '0 0 ' + vars.width + ' ' + vars.height)
                        .attr("preserveAspectRatio", "xMinYMin meet")
                        .append('g');

    //position gEnter
    gEnter.attr('class', 'gEnter')
          // .attr('width', innerW)
          // .attr('height', innerH)
          .attr('transform', 'translate(' + vars.margin.left + ', ' + vars.margin.top + ')');

    //group for x axis
    gEnter.append('g').attr('class', 'x axis');

    //group for y axis
    gEnter.append('g').attr('class', 'y axis');

    //text for title
    gEnter.append('text').attr('class', 'title-text').attr('transform', 'translate(0, -25)').text(vars.title);

    /*---------------set scales and format data---------------------------*/
    //x scale
    const xValues = vars.data.map(d => {return d[vars.xVal]});
    const xScale = this.getXScale(innerW).domain(xValues);
    //format data
    vars.data.forEach(d => {
      let y0 = 0;
      d.segments = vars.yVal.map(type => {return {name: type, y0: y0, y1: y0 += +d[type]};});
      if (normalized) {
        d.segments.forEach(d => {d.y0 /= y0; d.y1 /= y0;});
      } else {
        d.total = d.segments[d.segments.length - 1].y1;
      }
    });
    if (!normalized) {
      vars.data.forEach(d => {
        let y0 = 0;
        d.segReal = this.props.yReal.map(type => {return {name: type, y0: y0, y1: y0 += +d[type]};});
        d.total = d.segReal[d.segReal.length - 1].y1;
      });
    }

    //y scale
    const yScale = this.getYScale(innerH);
    if (!normalized) {
      yScale.domain([0, d3.max(vars.data, d => {return +d.total}) + 5]);
    }

    /*---------------set axes-----------------------------*/
    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').outerTickSize(0).tickPadding(10);

    gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
            .transition().duration(1000).call(xAxis);

    const yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(5).innerTickSize(-innerW).outerTickSize(0).tickPadding(10);
    if (normalized) {
      yAxis.tickFormat(d3.format('.0%'));
    }

    gEnter.select('.y').transition().duration(1000).call(yAxis);
    /*---------------make stacks----------------------------*/
    //reselect data points container, gEnter
    const g = svg.select('.gEnter');

    //'stacks'
    const groups = g.selectAll('.groups').data(vars.data)
                    .enter().append('g')
                    .attr('class', 'groups')
                    .attr('transform', d => {return 'translate(' + xScale(d[vars.xVal]) + ', 0)'});

    const segs = groups.selectAll('.rect').data(d => {return d.segments});

    segs.enter().append('rect')
        .attr('class', d => {return 'rect ' + color(d.name)})
        .attr('x', d => {return xScale(d[vars.xVal])})
        .attr('y', d => {return yScale(d.y0)})
        .attr('width', xScale.rangeBand())
        .attr('height', 0);

    // segs.on('mouseover', function(d) {
    //   segs.attr('class', d => {return 'rect ' + color2(d.name)});
    //   d3.select(this).attr('class', 'rect ' + color(d.name));
    // });
    //
    // segs.on('mouseout', function(d) {
    //   segs.attr('class', d => {return 'rect ' + color(d.name)});
    // });

    segs.transition().delay(function(d, i) {return i * 330}).duration(330)
            .attr('y', d => {return yScale(d.y1)})
            .attr('height', d => {return yScale(d.y0) - yScale(d.y1)});


  }

  //update chart
  componentDidUpdate() {
    const vars = this.globals();
    const innerW = vars.width - vars.margin.left - vars.margin.right;
    const innerH = vars.height - vars.margin.top - vars.margin.bottom;
    const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']).domain(this.props.yReal);
    const color2 = d3.scale.ordinal().range(['half-blue', 'half-orange', 'half-teal', 'half-purple', 'half-green', 'half-brown']).domain(this.props.yReal);
    const normalized = this.props.normalized;
    //container to hold everything
    const cont = d3.select(ReactDOM.findDOMNode(this));

    const svg = cont.selectAll('svg');

    const gEnter = svg.select('.gEnter');

    const xValues = vars.data.map(d => {return d[vars.xVal]});
    const xScale = this.getXScale(innerW).domain(xValues);


    //format data
    vars.data.forEach(d => {
      let y0 = 0;
      d.segments = vars.yVal.map(type => {return {name: type, y0: y0, y1: y0 += +d[type]};});
      if (normalized) {
        d.segments.forEach(d => {d.y0 /= y0; d.y1 /= y0;});
      } else {
        d.total = d.segments[d.segments.length - 1].y1;
      }
    });
    if (!normalized) {
      vars.data.forEach(d => {
        let y0 = 0;
        d.segReal = this.props.yReal.map(type => {return {name: type, y0: y0, y1: y0 += +d[type]};});
        d.total = d.segReal[d.segReal.length - 1].y1;
      });
    }

    //y scale
    const yScale = this.getYScale(innerH);
    if (!normalized) {
      yScale.domain([0, d3.max(vars.data, d => {return +d.total + 5})]);
    }
    console.log(vars.data);

    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').outerTickSize(0).tickPadding(10);

    gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
            .transition().duration(1000).call(xAxis);

    const yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(5).innerTickSize(-innerW).outerTickSize(0).tickPadding(10);
    if (normalized) {
      yAxis.tickFormat(d3.format('.0%'));
    }

    gEnter.select('.y').transition().duration(1000).call(yAxis);

    const g = svg.select('.gEnter');

    //'stacks'
    const groups = g.selectAll('.groups').data(vars.data);

    groups.exit().remove();

    groups.enter().append('g')
                  .attr('class', 'groups')
                  .attr('transform', d => {return 'translate(' + xScale(d[vars.xVal]) + ', 0)'});

    const segs = groups.selectAll('.rect').data(d => {return d.segments});

    segs.exit().remove();

    segs.enter().append('rect')
        .attr('class', d => {return 'rect ' + color(d.name)})
        .attr('x', d => {return xScale(d[vars.xVal])})
        .attr('y', d => {return yScale(d.y0)})
        .attr('width', xScale.rangeBand())
        .attr('height', 0);

    // segs.on('mouseover', function(d) {
    //   segs.attr('class', d => {return 'rect ' + color2(d.name)});
    //   d3.select(this).attr('class', 'rect ' + color(d.name));
    // });
    //
    // segs.on('mouseout', function(d) {
    //   segs.attr('class', d => {return 'rect ' + color(d.name)});
    // });

    segs.transition().duration(0)
            .attr('y', d => {return yScale(d.y1)})
            .attr('height', d => {return yScale(d.y0) - yScale(d.y1)})
            .attr('class', d => {return 'rect ' + color(d.name)});


  }

  //remove chart
  componentWillUnmount() {

  }

  /*--------------scales, axes, props functions--------------*/

  //returns all props in an obj
  globals() {
    return {
      width: this.props.width,
      height: this.props.height,
      margin: {top: 75, left: 60, bottom: 40, right: 40},
      data: this.props.data,
      title: this.props.title,
      yVal: this.props.yVal,
      xVal: this.props.xVal
    };
  }

  //returns x scale without domain-- set that later
  getXScale(w) {
    return d3.scale.ordinal().rangeRoundBands([0, w], 0.4);
  }

  //returns y scale without domain-- set that later
  getYScale(h) {
    return d3.scale.linear().rangeRound([h, 0]);
  }
}

export default StackedColumnChart;
