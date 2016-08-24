import React from 'react';
import ReactDOM from 'react-dom';
import ColumnChart from './chart-components/ColumnChart';
import BarChart from './chart-components/BarChart';
import StackedColumnChart from './chart-components/StackedColumnChart';
import StackedBarChart from './chart-components/StackedBarChart';
import LineChart from './chart-components/LineChart';
import ScatterPlot from './chart-components/ScatterPlot';
import { scatter, column, line, bullet, nut, scatter2, l2, secondColumn, nutting } from './testData';
import Random from './chart-components/Random';
import SparklineChart from './chart-components/SparklineChart';
import BulletChart from './chart-components/BulletChart';
import DonutChart from './chart-components/DonutChart';
import LowerDash from './Dashboard/LowerDash';
import ChartHousing from './chart-components/ChartHousing';

const scatterData = scatter();
const columnData = column();
const lineData = line();
const bulletData = bullet();
const nutData = nut();
const scat = scatter2(100, 100);
const secondl = l2();
const secC = secondColumn();
const nuts = nutting();

class App extends React.Component {
  constructor() {
    super();
    this.state = {s: scatterData, c: columnData, l: lineData, b: bulletData, n: nutData, s2: scat,
                  cYVal: ['freq1', 'freq2', 'freq3'], change: this.changeData};
    this.clickHandle = this.clickHandle.bind(this);
  }

  clickHandle() {
    this.setState({n: nuts});
  }

  render() {
    return (
      <div>
        <div className="billboard bg-light">
          <h1>Data Visualization</h1>
        </div>
        <div className="container">

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <ChartHousing data={this.state.l} xVal={'date'} yVal={['usa', 'chn', 'ger', 'jpn', 'uk']} yReal={['usa', 'chn', 'ger', 'jpn', 'uk']} type={'line'} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <div className="row">
                <div className="col-xs-9">
                  <ColumnChart data={this.state.c} xVal={'name'} yVal={['freq1']} yReal={['freq1']} width={500} height={500} title={'This right here is a title'} demo={false}/>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
            <div className="row">
              <div className="col-xs-9">
                <ColumnChart data={this.state.c} xVal={'name'} yVal={['freq1']} yReal={['freq1']} width={500} height={500} title={'Have one highlighted here'} demo={true}/>
              </div>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <ChartHousing data={this.state.c} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} yReal={['freq1', 'freq2', 'freq3']} type={'column'} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <ChartHousing data={this.state.c} xVal={'name'} yVal={['freq1', 'freq2', 'freq3', 'freq4', 'freq5']} yReal={['freq1', 'freq2', 'freq3', 'freq4', 'freq5']} normalized={false} type={'stackedcolumn'} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
            <div className="row">
              <div className="col-xs-9">
                <BarChart data={this.state.c} xVal={'name'} yVal={['freq1']} yReal={['freq1']} width={500} height={500} title={'This is a title'} demo={false}/>
              </div>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
            <div className="row">
              <div className="col-xs-9">
                <BarChart data={this.state.c} xVal={'name'} yVal={['freq1']} yReal={['freq1']} width={500} height={500} title={'This is a title'} demo={true}/>
              </div>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <ChartHousing data={this.state.c} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} yReal={['freq1', 'freq2', 'freq3']} type={'bar'} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <ChartHousing data={this.state.n} donutDep={'population'} donutInd={'name'} yVal={['gomez', 'wong po', 'barret']} yReal={['gomez', 'wong po', 'barret']} type={'donut'} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <ChartHousing data={this.state.s2} x={'x'} y={'y'} yVal ={['james', 'steve']} yReal={['wayne', 'steve']} type={'scatter'} fit={false} scatIden={'name'}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}


// <div className="container-fluid">
//   <div className="row">
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.s} x={'x'} y={'y'} yVal ={['wayne', 'steve']} yReal={['wayne', 'steve']} type={'scatter'} fit={true} scatIden={'name'}/>
//     </div>
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.c} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} yReal={['freq1', 'freq2', 'freq3']} type={'column'} />
//     </div>
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.c} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} yReal={['freq1', 'freq2', 'freq3']} type={'bar'} />
//     </div>
//   </div>
//   <div className="row">
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.c} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} yReal={['freq1', 'freq2', 'freq3']} type={'stackedbar'} normalized={false}/>
//     </div>
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.c} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} yReal={['freq1', 'freq2', 'freq3']} type={'stackedbar'} normalized={true} />
//     </div>
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.c} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} yReal={['freq1', 'freq2', 'freq3']} type={'stackedcolumn'} normalized={false}/>
//     </div>
//   </div>
//   <div className="row">
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.c} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} yReal={['freq1', 'freq2', 'freq3']} type={'stackedcolumn'} normalized={true} />
//     </div>
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.l} xVal={'date'} yVal={['usa', 'chn', 'ger']} yReal={['usa', 'chn', 'ger']} type={'line'} />
//     </div>
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.n} donutDep={'population'} donutInd={'name'} yVal={['gomez', 'wong po', 'barret']} yReal={['gomez', 'wong po', 'barret']} type={'donut'} />
//     </div>
//   </div>
// </div>


ReactDOM.render(<App />, document.getElementById('app'));
