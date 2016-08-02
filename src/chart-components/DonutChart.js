import React from 'react';
import ReactDOM from 'react-dom';
import {create, update} from '../d3-charts/d3-DonutChart';

class DonutChart extends React.Component {
  render() {
    return (
      <div className="vis">

      </div>
    )
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    create(el, this.props);
  }

  componentDidUpdate() {
    const elem = ReactDOM.findDOMNode(this);
    update(elem, this.props);
  }

}

export default DonutChart;
