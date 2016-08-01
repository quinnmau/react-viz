import React from 'react';
import ReactDOM from 'react-dom';
import ColumnChart from './chart-components/ColumnChart';
import BarChart from './chart-components/BarChart';
import StackedColumnChart from './chart-components/StackedColumnChart';
import StackedBarChart from './chart-components/StackedBarChart';
import LineChart from './chart-components/LineChart';
import ScatterPlot from './chart-components/ScatterPlot';
import { scatter, column, line, bullet, nut, scatter2 } from './testData';
import Random from './chart-components/Random';
import SparklineChart from './chart-components/SparklineChart';
import BulletChart from './chart-components/BulletChart';
import DonutChart from './chart-components/DonutChart';
import LowerDash from './Dashboard/LowerDash';

const scatterData = scatter();
const columnData = column();
const lineData = line();
const bulletData = bullet();
const nutData = nut();
const scat = scatter2(100, 100);

class App extends React.Component {
  constructor() {
    super();
    this.state = {s: scatterData, c: columnData, l: lineData, b: bulletData, n: nutData, s2: scat,
                  cYVal: ['freq1', 'freq2', 'freq3'], change: this.changeData};
  }

  render() {
    return (
      <div>
        <div className="billboard bg-light">
          <h1>Data Visualization</h1>
        </div>
        <div className="container">
          <ScatterPlot data={this.state.s} width={500} height={500} iden={'name'} xVal={'x'} yVal={'y'} title={'This is a title'} fit={false}/>
        </div>
      </div>
    );
  }
}

/*<Card className="tile" name={'Growth'} des={'value in percent'} number={'19.1%'} data={this.state.l}/>*/
// <Legend data={this.state.c} width={100} height={100} dep={'name'} yVal={['freq1', 'freq2', 'freq3']} />
// <Card2 className="tile" name={'Distribution'} des={'value in units'} number={'709'} data={this.state.c} />


// <ColumnChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={this.state.cYVal} title={'This is a title'} />
/*<LowerDash data={this.state.c} xVal={'name'} yVal={this.state.cYVal} />
<div className="container-fluid">
  <div className="row">
    <div className="col-md-4">
      <DonutChart data={this.state.n} indy={'name'} dep={'population'} width={250} height={250} title={'Sales'}/>
    </div>
    <div className="col-md-4">
      <ScatterPlot data={this.state.s2} width={500} height={500} iden={'name'} xVal={'x'} yVal={'y'} title={'This is a title'} fit={true}/>
    </div>
    <div className="col-md-4">
      <StackedColumnChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={['freq1', 'freq2']} title={'This is a title'} />
    </div>
  </div>
  <div className="row">
    <div className="col-md-4">
      <ColumnChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={['freq1', 'freq2']} title={'This is a title'} yReal={['freq1', 'freq2']}/>
    </div>
    <div className="col-md-4">
      <StackedBarChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={['freq1', 'freq2']} title={'This is a title'} />
    </div>
    <div className="col-md-4">
      <BarChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={['freq1', 'freq2']} title={'This is a title'} />
    </div>
  </div>
  <div className="row">
    <div className="col-md-4">
      <LineChart data={this.state.l} width={500} height={500} xVal={'date'} yVal={['usa', 'ger', 'chn']} title={'This is a title'} ticks={5}/>
    </div>
    <div className="col-md-4">
      <BulletChart data={this.state.b} width={500} height={200} yVal={'id'} target={'target'} actual={'actual'} range={'range'} />
    </div>
    <div className="col-md-4">

    </div>
  </div>
</div>*/

ReactDOM.render(<App />, document.getElementById('app'));
