import React from 'react';
import LegendComp from './LegendComp';
import ColumnChart from '../chart-components/ColumnChart';
import DonutChart from '../chart-components/DonutChart';
import {create} from '../d3-charts/d3-DonutChart';

class LowerDash extends React.Component {
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

  _checkHandler(name, val) {
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
          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
            <DonutChart data={this.state.data} indy={'name'} dep={'freq1'} width={250} height={250} title={'Sales'}/>
          </div>
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 center-piece">
            <LegendComp yVal={this.props.yVal} checkHandle={this._checkHandler}/>
          </div>
          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
            <ColumnChart data={this.state.data} width={500} height={500} xVal={'name'} yVal={this.state.currY} title={'This is a title'} yReal={this.props.yVal} legend={false}/>
          </div>
        </div>
      </div>
    )
  }
}

export default LowerDash;
