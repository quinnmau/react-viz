import React from 'react';
import ReactDOM from 'react-dom';
import CheckText from './CheckText';

class LegComp extends React.Component {
  //set state of data. Initially all checkboxes are checked data is unfilitered
  constructor(props) {
    super(props);
    this.state = {data: props.data};

    //checkboxes initially marked 'true' as checked. Unchecked when false
    props.yVal.forEach(d => {
      this.state[d] = true;
    });
  }

  handleCheckBox() {
    
  }

  render() {
    console.log(this.state);
    return (
      <div className="shared-legend">
        {this.props.yVal.map((item) => {
          return <CheckText value={item} />
        })}
      </div>
    )
  }
}

export default LegComp;
