import React from 'react';
import ReactDOM from 'react-dom';
import { create} from '../d3-charts/d3-SparklineChart';

class SparklineChart extends React.Component {
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

  componentDidUpdate() {
    // update();
  }

  componentWillUnmount() {

  }
}

export default SparklineChart;
