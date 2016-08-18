import React from 'react';

//import all other charts besides line....
import LineChart from './LineChart';
import ColumnChart from './ColumnChart';
import LegendComp from './LegendComp';

//takes data, xval, yREal and yval as props
class ChartHousing extends React.Component {
  constructor(props) {
    super(props);
    this._checkHandler = this._checkHandler.bind(this);

    //initialize checks as empty, populate after
    this.state = {
      data: props.data,
      checks: {},
      currY: []
    };

    props.yVal.forEach(d => {
      //push an object containing check id and its state (checked vs unchecked)
      this.state.checks[d] = true;
      this.state.currY.push(d);
    });
  }

  //callback function passed down to children components to change state
  _checkHandler(name, val) {

    //filter currY
    let currChecks = this.state.checks;
    currChecks[name] = val;
    this.setState({checks: currChecks});
    let filterY = [];
    for (let i in this.state.checks) {
      if (this.state.checks[i] == true) {
        filterY.push(i);
      }
    }
    this.setState({currY: filterY});
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-9">
            <LineChart data={this.state.data} xVal={this.props.xVal} yVal={this.state.currY} title={'This is a title'} width={500} height={500} yReal={this.props.yReal} />
          </div>
          <div className="col-xs-3">
            <LegendComp yVal={this.props.yVal} checkHandle={this._checkHandler} />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartHousing;

// <ColumnChart data={this.state.data} xVal={this.props.xVal} yVal={this.state.currY} width={500} height={500} title={'This is a title'} yReal={this.props.yVal} />
