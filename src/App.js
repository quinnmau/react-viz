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
                  cYVal: ['Freq1', 'Freq2', 'Freq3'], change: this.changeData};
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
              <ChartHousing data={this.state.l} xVal={'date'} yVal={['USA', 'CHN', 'GER', 'JPN', 'UK']} yReal={['USA', 'CHN', 'GER', 'JPN', 'UK']} type={'line'} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <div className="row">
                <div className="col-xs-9">
                  <ColumnChart data={this.state.c} xVal={'name'} yVal={['Freq1']} yReal={['Freq1']} width={500} height={500} title={'This is a title'} demo={false}/>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
            <div className="row">
              <div className="col-xs-9">
                <ColumnChart data={this.state.c} xVal={'name'} yVal={['Freq1']} yReal={['Freq1']} width={500} height={500} title={'This is a title'} demo={true}/>
              </div>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <ChartHousing data={this.state.c} xVal={'name'} yVal={['Freq1', 'Freq2', 'Freq3']} yReal={['Freq1', 'Freq2', 'Freq3']} type={'column'} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <ChartHousing data={this.state.c} xVal={'name'} yVal={['Freq1', 'Freq2', 'Freq3', 'Freq4', 'Freq5']} yReal={['Freq1', 'Freq2', 'Freq3', 'Freq4', 'Freq5']} normalized={false} type={'stackedcolumn'} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
            <div className="row">
              <div className="col-xs-9">
                <BarChart data={this.state.c} xVal={'name'} yVal={['Freq1']} yReal={['Freq1']} width={500} height={500} title={'This is a title'} demo={false}/>
              </div>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
            <div className="row">
              <div className="col-xs-9">
                <BarChart data={this.state.c} xVal={'name'} yVal={['Freq1']} yReal={['Freq1']} width={500} height={500} title={'This is a title'} demo={true}/>
              </div>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <ChartHousing data={this.state.c} xVal={'name'} yVal={['Freq1', 'Freq2', 'Freq3']} yReal={['Freq1', 'Freq2', 'Freq3']} type={'bar'} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
            <div className="row">
              <div className="col-xs-9">
                <DonutChart data={this.state.n} dep={'population'} indy={'name'} curr={['Gomez', 'Wong Po', 'Barret']} yReal={['Gomez', 'Wong Po', 'Barret']} title={'This is a title'} width={500} height={500} />
              </div>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <ChartHousing data={this.state.s2} x={'x'} y={'y'} yVal ={['James', 'Steve']} yReal={['Wayne', 'Steve']} type={'scatter'} fit={false} scatIden={'name'}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

// <div className="row">
//   <div className="col-xs-8 col-xs-offset-2">
//     <ChartHousing data={this.state.n} donutDep={'population'} donutInd={'name'} yVal={['Gomez', 'Wong Po', 'Barret']} yReal={['Gomez', 'Wong Po', 'Barret']} type={'donut'} />
//   </div>
// </div>


// <div className="container-fluid">
//   <div className="row">
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.s} x={'x'} y={'y'} yVal ={['Wayne', 'Steve']} yReal={['Wayne', 'Steve']} type={'scatter'} fit={true} scatIden={'name'}/>
//     </div>
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.c} xVal={'name'} yVal={['Freq1', 'Freq2', 'Freq3']} yReal={['Freq1', 'Freq2', 'Freq3']} type={'column'} />
//     </div>
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.c} xVal={'name'} yVal={['Freq1', 'Freq2', 'Freq3']} yReal={['Freq1', 'Freq2', 'Freq3']} type={'bar'} />
//     </div>
//   </div>
//   <div className="row">
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.c} xVal={'name'} yVal={['Freq1', 'Freq2', 'Freq3']} yReal={['Freq1', 'Freq2', 'Freq3']} type={'stackedbar'} normalized={false}/>
//     </div>
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.c} xVal={'name'} yVal={['Freq1', 'Freq2', 'Freq3']} yReal={['Freq1', 'Freq2', 'Freq3']} type={'stackedbar'} normalized={true} />
//     </div>
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.c} xVal={'name'} yVal={['Freq1', 'Freq2', 'Freq3']} yReal={['Freq1', 'Freq2', 'Freq3']} type={'stackedcolumn'} normalized={false}/>
//     </div>
//   </div>
//   <div className="row">
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.c} xVal={'name'} yVal={['Freq1', 'Freq2', 'Freq3']} yReal={['Freq1', 'Freq2', 'Freq3']} type={'stackedcolumn'} normalized={true} />
//     </div>
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.l} xVal={'date'} yVal={['usa', 'chn', 'ger']} yReal={['usa', 'chn', 'ger']} type={'line'} />
//     </div>
//     <div className="col-xs-4">
//       <ChartHousing data={this.state.n} donutDep={'population'} donutInd={'name'} yVal={['Gomez', 'Wong Po', 'Barret']} yReal={['Gomez', 'Wong Po', 'Barret']} type={'donut'} />
//     </div>
//   </div>
// </div>


ReactDOM.render(<App />, document.getElementById('app'));
