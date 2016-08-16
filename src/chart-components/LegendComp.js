import React from 'react';
import LegendItem from './LegendItem';

class LegendComp extends React.Component {

  render() {
    const boxes = ['checkbox-blue', 'checkbox-orange', 'checkbox-teal', 'checkbox-purple', 'checkbox-green', 'checkbox-brown'];
    let i = -1;
    return (
      <div className="legend-console">
        {this.props.yVal.map((item) => {
          i++;
          return <LegendItem currClass={boxes[i]} value={item} checkHandle={this.props.checkHandle}/>
        })}
      </div>
    )
  }
}

export default LegendComp;
