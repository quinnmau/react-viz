import React from 'react';
import ReactDOM from 'react-dom';

class StackedBarChart extends React.Component {
  render() {
    return (
      <div className="vis">

      </div>
    );
  }

  //create
  componentDidMount() {
    const vars = this.vars();
    const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']).domain(this.props.yReal);
    const color2 = d3.scale.ordinal().range(['half-blue', 'half-orange', 'half-teal', 'half-purple', 'half-green', 'half-brown']).domain(this.props.yReal);
    const innerW = vars.width - vars.margin.left - vars.margin.right;
    const innerH = vars.height - vars.margin.top - vars.margin.bottom;
    const normalized = this.props.normalized;

    //container
    const cont = d3.select(ReactDOM.findDOMNode(this));

    //svg to work with
    const svg = cont.selectAll('svg').data([vars.data]);

    //main group to hold actual data points
    const gEnter = svg.enter().append('svg')
                    // .attr('width', vars.width)
                    // .attr('height', vars.height)
                    .attr('viewBox', '0 0 ' + vars.width + ' ' + vars.height)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append('g');

    //positioning and size
    gEnter.attr('width', innerW)
          .attr('height', innerH)
          .attr('class', 'gEnter')
          .attr('transform', 'translate(' + vars.margin.left + ', ' + vars.margin.top + ')');

    //add groups for axes
    gEnter.append('g').attr('class', 'x axis');

    gEnter.append('g').attr('class', 'y axis');

    //add text for title
    gEnter.append('text').attr('class', 'title-text')
            .text(vars.title)
            .attr('transform', 'translate(0, -25)');

    /*---------------------set scales, format data---------------------------------------*/
    //y scale
    const yValues = vars.data.map(d => {return d[vars.yVal]});
    const yScale = this.getYScale(innerH).domain(yValues);


    //format data
    vars.data.forEach(d => {
      let x0 = 0;
      d.segments = vars.xVal.map(type => {return {name: type, x0: x0, x1: x0 += +d[type]};});
      if (normalized) {
        d.segments.forEach(d => {d.x0 /= x0; d.x1 /= x0;});
      } else {
        d.total = d.segments[d.segments.length - 1].x1;
      }
    });
    if (!normalized) {
      vars.data.forEach(d => {
        let x0 = 0;
        d.segReal = this.props.yReal.map(type => {return {name: type, x0: x0, x1: x0 += +d[type]};});
        d.total = d.segReal[d.segReal.length - 1].x1;
      });
    }

    //y scale
    const xScale = this.getXScale(innerH);
    if (!normalized) {
      xScale.domain([0, d3.max(vars.data, d => {return +d.total})]);
    }

    /*------------------------set axes-------------------------------------*/
    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(5).innerTickSize(-innerW).outerTickSize(0).tickPadding(10);
    if (normalized) {
      xAxis.tickFormat(d3.format('.0%'));
    }

    gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                    .transition()
                    .duration(1000)
                    .call(xAxis);

    const yAxis = d3.svg.axis()
                    .orient('left')
                    .scale(yScale)
                    .outerTickSize(0)
                    .tickPadding(10);
    gEnter.select('.y')
                    .transition()
                    .duration(1000)
                    .call(yAxis);



    /*--------------------------actual data points--------------------------*/
    //reselect gEnter
    const g = svg.select('.gEnter');

    const stacks = g.selectAll('.groups').data(vars.data)
                      .enter().append('g')
                      .attr('class', 'groups')
                      .attr('transform', d => {return 'translate(0, ' + yScale(d[vars.yVal]) + ')'});

    const segs = stacks.selectAll('.rect').data(d => {return d.segments});

    segs.enter().append('rect')
        .attr('class', d => {return 'rect ' + color(d.name)})
        .attr('y', d => {return yScale(d[vars.yVal])})
        .attr('x', d => {return xScale(d.x0)})
        .attr('width', 0)
        .attr('height', yScale.rangeBand());

      // segs.on('mouseover', function(d) {
      //   segs.attr('class', d => {return 'rect ' + color2(d.name)});
      //   d3.select(this).attr('class', 'rect ' + color(d.name));
      // });
      //
      // segs.on('mouseout', function(d) {
      //   segs.attr('class', d => {return 'rect ' + color(d.name)});
      // });

    segs.transition().delay(function(d, i) {return i * 330}).duration(330)
            .attr('x', d => {return xScale(d.x0)})
            .attr('width', d => {return xScale(d.x1) - xScale(d.x0)});


  }

  //update
  componentDidUpdate() {
    const vars = this.vars();
    const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']).domain(this.props.yReal);
    const color2 = d3.scale.ordinal().range(['half-blue', 'half-orange', 'half-teal', 'half-purple', 'half-green', 'half-brown']).domain(this.props.yReal);
    const innerW = vars.width - vars.margin.left - vars.margin.right;
    const innerH = vars.height - vars.margin.top - vars.margin.bottom;
    const normalized = this.props.normalized;

    //container
    const cont = d3.select(ReactDOM.findDOMNode(this));

    const svg = cont.selectAll('svg');

    const gEnter = svg.select('.gEnter');

    const yValues = vars.data.map(d => {return d[vars.yVal]});
    const yScale = this.getYScale(innerH).domain(yValues);

    //format data
    vars.data.forEach(d => {
      let x0 = 0;
      d.segments = vars.xVal.map(type => {return {name: type, x0: x0, x1: x0 += +d[type]};});
      if (normalized) {
        d.segments.forEach(d => {d.x0 /= x0; d.x1 /= x0;});
      } else {
        d.total = d.segments[d.segments.length - 1].x1;
      }
    });
    if (!normalized) {
      vars.data.forEach(d => {
        let x0 = 0;
        d.segReal = this.props.yReal.map(type => {return {name: type, x0: x0, x1: x0 += +d[type]};});
        d.total = d.segReal[d.segReal.length - 1].x1;
      });
    }

    //y scale
    const xScale = this.getXScale(innerH);
    if (!normalized) {
      xScale.domain([0, d3.max(vars.data, d => {return +d.total})]);
    }

    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(5).innerTickSize(-innerW).outerTickSize(0).tickPadding(10);
    if (normalized) {
      xAxis.tickFormat(d3.format('.0%'));
    }

    gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                    .transition()
                    .duration(1000)
                    .call(xAxis);

    const yAxis = d3.svg.axis()
                    .orient('left')
                    .scale(yScale)
                    .outerTickSize(0)
                    .tickPadding(10);
    gEnter.select('.y')
                    .transition()
                    .duration(1000)
                    .call(yAxis);
                    const g = svg.select('.gEnter');

    const stacks = g.selectAll('.groups').data(vars.data);

    stacks.exit().remove();

    stacks.enter().append('g')
          .attr('class', 'groups')
          .attr('transform', d => {return 'translate(0, ' + yScale(d[vars.yVal]) + ')'});

    const segs = stacks.selectAll('.rect').data(d => {return d.segments});

    segs.exit().remove();

    segs.enter().append('rect')
        .attr('class', d => {return 'rect ' + color(d.name)})
        .attr('y', d => {return yScale(d[vars.yVal])})
        .attr('x', d => {return xScale(d.x0)})
        .attr('width', 0)
        .attr('height', yScale.rangeBand());

      // segs.on('mouseover', function(d) {
      //   segs.attr('class', d => {return 'rect ' + color2(d.name)});
      //   d3.select(this).attr('class', 'rect ' + color(d.name));
      // });
      //
      // segs.on('mouseout', function(d) {
      //   segs.attr('class', d => {return 'rect ' + color(d.name)});
      // });

    segs.transition().duration(0)
            .attr('x', d => {return xScale(d.x0)})
            .attr('width', d => {return xScale(d.x1) - xScale(d.x0)})
            .attr('class', d => {return 'rect ' + color(d.name)});


  }

  componentWillUnmount() {

  }

/*-------------const and scales functions------------------*/

  //returns all props in obj
  vars() {
    return {
      width: this.props.width,
      height: this.props.height,
      margin: {top: 75, left: 60, bottom: 40, right: 40},
      data: this.props.data,
      title: this.props.title,
      xVal: this.props.yVal,
      yVal: this.props.xVal
    };
  }

  //sets x scale with given width passed in for range.
  getXScale(w) {
    return d3.scale.linear().rangeRound([0, w]);
  }

  //sets y scale w/ given height passed for range. Set domain later
  getYScale(h) {
    return d3.scale.ordinal().rangeRoundBands([h, 0], 0.4);
  }
}

export default StackedBarChart;
