import React from 'react';

class Checkbox extends React.Component {
  constructor() {
    super();
    this.clickHandle = this.clickHandle.bind(this);
    this.state = {isChecked: true}
  }

  //handles change to checkbox
  clickHandle() {
    this.props.checkHandle(this.props.value, !this.state.isChecked);
    this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    return (
      <input type="checkbox" value={this.props.value} className={this.props.currClass} onChange={this.clickHandle} checked={this.state.isChecked} />
    )
  }
}

export default Checkbox;
