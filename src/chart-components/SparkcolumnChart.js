import React from 'react';
import ReactDOM from 'react-dom';
import { create } from '../d3-charts/d3-SparkcolumnChart';

class SparkcolumnChart extends React.Component {
  render() {
    return (
      <div className="card-block">

      </div>
    )
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    create(el, this.props);
  }


}

export default SparkcolumnChart;
