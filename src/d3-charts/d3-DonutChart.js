const create = (elem, props) => {
  //variables
  const margin = {left: 40, bottom: 40, right: 40, top: 40};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']);
  const radius = Math.min(innerW, innerH) / 2;
  const arc = d3.svg.arc().innerRadius(radius - (Math.min(innerW, innerH) * 0.1))
                          .outerRadius(radius - (Math.min(innerW, innerH) * 0.2));

  const donut = d3.layout.pie().sort(null).value(d => {return d[props.dep]});

  const cont = d3.select(elem);

  const svg = cont.selectAll('svg').data([props.data]);

  //svg for the donut
  const gEnter = svg.enter().append('svg')
                    // .attr('width', props.width)
                    // .attr('height', props.height)
                    .attr('viewBox', '0 0 ' + props.width + ' ' + props.height)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append('g');

  //positioning
  gEnter.attr('class', 'gEnter')
        .attr('transform', 'translate(' + (props.width / 2) + ', ' + (props.height / 2) + ')')
        .attr('width', innerW)
        .attr('height', innerH);

  /*-----------------------------------------------------*/

  const g = svg.select('.gEnter');

  const textGroup = g.append('g');

  textGroup.attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'central')
            .style('overflow', 'hidden');

  textGroup.append('text').attr('class', 'h1 hero-heading big-num')
                  .attr('dy', '.15em')
                  .style('font-size', innerW * 0.2);

  textGroup.append('text').attr('class', 'h3 small-num')
                          .attr('dy', '2em')
                          .style('font-size', innerW * 0.0575);

  //format data
  let total = 0;
  props.data.forEach(d => {
    total += d[props.dep];
  });
  props.data.total = total;

  //actual arcs
  const arcs = gEnter.selectAll('path').data(donut(props.data))
        .enter().append('path')
        .attr('d', arc)
        .attr('class', d => {return color(d.data[props.indy])})
        .each(function(d) {this._current = d});

  console.log(arcs);

  //Enlarge arc size on mouseover
  arcs.on('mouseover', function(d) {
    const cover = d3.svg.arc().innerRadius(radius - (Math.min(innerW, innerH) * 0.075))
                            .outerRadius(radius - (Math.min(innerW, innerH) * 0.225));

    const curr = d3.select(this).select('path')
                    .transition().duration(500)
                    .attr('d', cover);

    let format = d3.format('%');

    g.select('.big-num').text(format(d.data[props.dep] / props.data.total));
    g.select('.small-num').text(d.data[props.indy]);
  });

  //make size normal when mouse leaves arc
  arcs.on('mouseout', function() {
    const cover = d3.svg.arc().innerRadius(radius - (Math.min(innerW, innerH) * 0.1))
                            .outerRadius(radius - (Math.min(innerW, innerH) * 0.2));

    const curr = d3.select(this).select('path')
                    .transition().duration(500)
                    .attr('d', cover);

    g.select('.big-num').text('');
    g.select('.small-num').text('');
  });

}

//UPDATE
const update = (elem, props) => {
  const margin = {left: 40, bottom: 40, right: 40, top: 40};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['blue', 'orange', 'teal', 'purple', 'green', 'brown']);
  const radius = Math.min(innerW, innerH) / 2;
  const arc = d3.svg.arc().innerRadius(radius - (Math.min(innerW, innerH) * 0.1))
                          .outerRadius(radius - (Math.min(innerW, innerH) * 0.2));

  let total = 0;
  props.data.forEach(d => {
    total += d[props.dep];
  });
  props.data.total = total;

  const cont = d3.select(elem);

  const svg = cont.selectAll('svg');

  const g = svg.select('.gEnter');

  const donut = d3.layout.pie().sort(null).value(d => {return d[props.dep]});

  const paths = g.selectAll('path').data(donut(props.data));

  paths.transition().duration(750).attrTween("d", arcTween);

  function arcTween(a) {
    console.log(this);
    let i = d3.interpolate(this._current, a);
    this._current = i(0);
    return (t) => {
      return arc(i(t));
    };
  };
}

export {create, update};
