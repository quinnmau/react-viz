import React from 'react';

//import all other charts besides line....
import LineChart from './LineChart';
import ColumnChart from './ColumnChart';
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import StackedBarChart from './StackedBarChart';
import StackedColumnChart from './StackedColumnChart';
import ScatterPlot from './ScatterPlot';
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

    //yVal is an array where each item in array is a series of the data
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
            <ScatterPlot data={this.state.data} x={this.props.x} y={this.props.y} curr={this.state.currY} yReal={this.props.yVal} width={500} height={500} title={'Title'} iden={this.props.scatIden} />
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
// <LineChart data={this.state.data} xVal={this.props.xVal} yVal={this.state.currY} title={'This is a title'} width={500} height={500} yReal={this.props.yReal} />
// <StackedBarChart data={this.state.data} width={500} height={500} xVal={'name'} yVal={this.state.currY} yReal={this.props.yVal} title={'This is a title'} normalized={false}/>
// <BarChart data={this.state.data} xVal={this.props.xVal} yVal={this.state.currY} yReal={this.props.yReal} width={500} height={500} title={'This is a title'}/>
