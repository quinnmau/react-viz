import React from 'react';
import ReactDOM from 'react-dom';
import {create} from '../d3-charts/d3-Legend';
import ColumnChart from './ColumnChart';

class Legend extends React.Component {
  render() {
    return (
      <div className="solo-legend">

      </div>
    )
  }

// <ColumnChart data={this.props.data} width={500} height={500} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} title={'This is a title'} />


  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    create(el, this.props);
  }
}

export default Legend;
