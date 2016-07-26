import React from 'react';
import LegendItem from './LegendItem';

class LegendComp extends React.Component {

  render() {
    return (
      <div>
        {this.props.yVal.map((item) => {
          return <LegendItem value={item} checkHandle={this.props.checkHandle}/>
        })}
      </div>
    )
  }
}

export default LegendComp;
