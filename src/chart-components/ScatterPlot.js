import React from 'react';
import ReactDOM from 'react-dom';
import { create, update } from '../d3-charts/d3-ScatterPlot';

class ScatterPlot extends React.Component {
  render() {
    return (
      <div className="vis">

      </div>
    );
  }

  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this);
    create(elem, this.props);
  }

  componentDidUpdate() {
    const elem = ReactDOM.findDOMNode(this);
    update(elem, this.props);
  }
}

export default ScatterPlot;
