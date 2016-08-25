import React from 'react';
import ReactDOM from 'react-dom';

class BarChart extends React.Component {
  render() {
    return (
      <div className="vis">

      </div>
    )
  }

  globals() {
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

  //creates chart
  componentDidMount() {
    //global variables
    const globals = this.globals();
    const innerW = globals.width - globals.margin.left - globals.margin.right;
    const innerH = globals.height - globals.margin.top - globals.margin.bottom;
    const demo = this.props.demo;
    const oneSeries = this.props.yVal[0];


    // if (this.props.yVal.length == 1) {
    //   this.props.data.sort(function(a, b) {
    //     console.log(a);
    //     console.log(this.props.yVal[0]);
    //     return d3.ascending(a[oneSeries], b[oneSeries]);
    //   });
    // };

    //container
    const cont = d3.select(ReactDOM.findDOMNode(this));

    //svg to work with
    const svg = cont.selectAll('svg').data([globals.data]);

    //main group to hold actual data points
    const gEnter = svg.enter().append('svg')
                    // .attr('width', globals.width)
                    // .attr('height', globals.height)
                    .attr('viewBox', '0 0 ' + globals.width + ' ' + globals.height)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append('g');

    //positioning and size
    gEnter.attr('width', innerW)
          .attr('height', innerH)
          .attr('class', 'gEnter')
          .attr('transform', 'translate(' + globals.margin.left + ', ' + globals.margin.top + ')');

    //add groups for axes
    gEnter.append('g').attr('class', 'x axis');

    gEnter.append('g').attr('class', 'y axis');

    //add text for title
    gEnter.append('text').attr('class', 'title-text').text(globals.title).attr('transform', 'translate(0, -25)');

    /*---------------set scales --------------------*/
    //group scale
    const yGroups = globals.data.map(d => {return d[globals.yVal]});
    const groupScale = this.getGroupScale(innerH).domain(yGroups);

    const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']).domain(this.props.yReal);
    const color2 = d3.scale.ordinal().range(['half-blue', 'half-orange', 'half-teal', 'half-purple', 'half-green', 'half-brown']).domain(this.props.yReal);

    //within group scale
    const yValues = globals.xVal.map(d => {return d});
    const yScale = d3.scale.ordinal().rangeRoundBands([groupScale.rangeBand(), 0])
                                  .domain(yValues);

    globals.data.forEach(function(d) {
      d.groupDetails = yValues.map(function(a) {
        return {name: a, value: d[a]};
      });
    });

    console.log(globals.data);

    const xScale = this.getXScale(innerW).domain([0, d3.max(globals.data, d => {
      return d3.max(d.groupDetails, d => {
        return d.value + 5;
      });
    })]);


    /*----------set axes --------------*/
    const xAxis = this.getXAxis(xScale).innerTickSize(-innerH).ticks(5).tickPadding(10);
    gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                       .transition()
                       .duration(1000)
                       .call(xAxis);

    const yAxis = this.getYAxis(groupScale).tickPadding(10);
    gEnter.select('.y').transition()
                       .duration(1000)
                       .call(yAxis);

    //reselect gEnter
    const g = svg.select('.gEnter');

    const groups = g.selectAll('.groups').data(globals.data);

    groups.enter().append('g')
          .attr('class', 'groups')
          .attr('transform', d => {return 'translate(0, ' + groupScale(d[globals.yVal]) + ')'});

    // //actual data bars

    const bars = groups.selectAll('.rect').data(d => {return d.groupDetails});

    let count = 0;
    bars.enter().append('rect')
        .attr('class', d => {
          if (demo && count == 4) {
            count++;
            console.log('im in');
            return 'rect orange';
          } else {
            count++;
            return 'rect ' + color(d.name);
          }
        })
        .attr('x', 0)
        .attr('y', d => {return yScale(d.name)})
        .attr('width', 0)
        .attr('height', yScale.rangeBand());

    // bars.on('mouseover', function(d) {
    //   bars.attr('class', d => {return 'rect ' + color2(d.name)});
    //   d3.select(this).attr('class', 'rect ' + color(d.name));
    // });
    //
    // bars.on('mouseout', function(d) {
    //   bars.attr('class', d => {return 'rect ' + color(d.name)});
    // });

    bars.exit().remove();

    bars.transition().duration(1000)
        .attr('width', d => {return xScale(d.value)});


    // const legend = g.selectAll('.legend').data(yValues);
    //
    // legend.enter().append('rect')
    //       .attr('transform', function(d, i) {return 'translate(0, ' + (i * 25) + ')'})
    //       .attr('x', innerW + 25)
    //       .attr('width', 20)
    //       .attr('height', 20)
    //       .attr('class', d => {return 'legend ' + color(d)})
    //       .attr('opacity', 0);
    //
    // legend.transition().duration(1000).attr('opacity', 1);
    //
    // const words = g.selectAll('.legend-text').data(yValues);
    //
    // words.enter().append('text')
    //       .attr('transform', function(d, i) {return 'translate(0, ' + (i * 25) + ')'})
    //       .attr('x', innerW + 50)
    //       .attr('y', 9)
    //       .attr('dy', '.35em')
    //       .style('text-anchor', 'start')
    //       .text(d => {return d})
    //       .attr('class', 'legend-text')
    //       .attr('opacity', 0);
    //
    // words.transition().duration(1000).attr('opacity', 1);
  }

  //updates chart
  componentDidUpdate() {
    //global variables
    const globals = this.globals();
    const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']).domain(this.props.yReal);
    const color2 = d3.scale.ordinal().range(['half-blue', 'half-orange', 'half-teal', 'half-purple', 'half-green', 'half-brown']).domain(this.props.yReal);
    const innerW = globals.width - globals.margin.left - globals.margin.right;
    const innerH = globals.height - globals.margin.top - globals.margin.bottom;

    const cont = d3.select(ReactDOM.findDOMNode(this));
    const svg = cont.selectAll('svg');
    const gEnter = svg.select('.gEnter');

    //update scales
    const yGroups = globals.data.map(d => {return d[globals.yVal]});
    const groupScale = this.getGroupScale(innerH).domain(yGroups);

    const yValues = globals.xVal.map(d => {return d});
    const yScale = d3.scale.ordinal().rangeRoundBands([groupScale.rangeBand(), 0])
                                  .domain(yValues);

    globals.data.forEach(function(d) {
      d.groupDetails = yValues.map(function(a) {
        return {name: a, value: d[a]};
      });
    });

    const allX = [];
    globals.data.forEach(d => {
      this.props.yReal.map(name => {
        allX.push(d[name]);
      })
    })

    const xScale = this.getXScale(innerW).domain([0, d3.max(allX) + 5]);
    //
    //update axes
    const xAxis = this.getXAxis(xScale).innerTickSize(-innerH).ticks(5);
    gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                       .transition()
                       .duration(1000)
                       .call(xAxis);

    const yAxis = this.getYAxis(groupScale);
    gEnter.select('.y').transition()
                       .duration(1000)
                       .call(yAxis);

     //update groups and bars
     const g = svg.select('.gEnter');

     const groups = g.selectAll('.groups').data(globals.data);

     groups.exit().remove();

     groups.transition().duration(0)
           .attr('transform', d => {return 'translate(0, ' + groupScale(d[globals.yVal]) + ')'});

     //actual data bars
     const bars = groups.selectAll('rect').data(d => {return d.groupDetails});

     bars.exit().transition()
                .duration(0)
                .attr('width', 0)
                .remove();

     bars.enter().append('rect')
         .attr('width', 0);

    //  bars.on('mouseover', function(d) {
    //    bars.attr('class', d => {return 'rect ' + color2(d.name)});
    //    d3.select(this).attr('class', 'rect ' + color(d.name));
    //  });
     //
    //  bars.on('mouseout', function(d) {
    //    bars.attr('class', d => {return 'rect ' + color(d.name)});
    //  });

     bars.transition().duration(0)
          .attr('width', d => {return xScale(d.value)})
          .attr('x', 0)
          .attr('y', d => {return yScale(d.name)})
          .attr('height', yScale.rangeBand())
          .attr('class', d => {return 'rect ' + color(d.name)});

  }

  //removes chart
  componentWillUnmount() {

  }

  /*--------------------getter functions----------------*/

  //returns x scale without domain
  getXScale(w) {
    return d3.scale.linear().range([0, w]);
  }

  //returns y scale without domain or range for individual bars
  //within groups
  getYScale() {
    return d3.scale.ordinal();
  }

  //scale for groups without domain
  getGroupScale(h) {
    return d3.scale.ordinal().rangeRoundBands([h, 0], 0.4);
  }

  //MAKE SURE TO MAKE MORE SPECIFIC CLASSES FOR STYLING ONLY BAR CHART AXES
  getXAxis(x) {
    return d3.svg.axis().scale(x).orient('bottom');
  }

  getYAxis(y) {
    return d3.svg.axis().scale(y).orient('left');
  }
}

export default BarChart;
