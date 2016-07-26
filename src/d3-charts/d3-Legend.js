const create = (el, props) => {
  const margin = {left: 10, bottom: 20, right: 30, top: 20};
  const color = d3.scale.ordinal().range(['#2975E9', '#37dad3', '#fd810e', '#ffcf3z']);
  const cont = d3.select(el);
  const svg = cont.selectAll('svg').data([props.data]);

  const gEnter = svg.enter().append('svg')
                    .attr('viewBox', '0 0 ' + props.width + ' ' + props.height)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append('g')
                    .attr('class', 'gEnter');

  gEnter.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .attr('width', (props.width - margin.left - margin.right))
        .attr('height', (props.height - margin.top - margin.bottom));

  const g = svg.select('.gEnter');

  const rects = g.selectAll('rect').data(props.data);

  rects.enter().append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => {return i * 20})
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', d => {return color(d[props.dep])});

  const checks = g.selectAll('.check').data(props.yVal);

  checks.enter().append('path')
        .attr('d', function(d, i) {
          return 'M 3 ' + (9 + (20 * i)) + ' L 9 ' + (15 + (20 * i)) + ' L 15 ' + (3 + (20 * i));
        })
        .attr('title', d => {return d})
        .attr('class', 'check')
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

  // checks.on('click', function() {
  //   if (d3.select(this).attr('opacity') == 1) {
  //     d3.select(this).attr('opacity', 0);
  //     console.log(d3.select(this));
  //     props.yVal = props.yVal.filter(d => {
  //       return d != d3.select(this).attr('title');
  //     });
  //     console.log(props.yVal);
  //   } else {
  //     d3.select(this).attr('opacity', 1);
  //   }
  // });

  const text = g.selectAll('text').data(props.yVal);

  text.enter().append('text')
      .attr('x', 23)
      .attr('y', (d, i) => {return i * 20 + 7})
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text(d => {return d});
}

export {create};
