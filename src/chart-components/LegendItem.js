import React from 'react';
import Checkbox from './Checkbox';

const LegendItem = (props) =>
  <div>
    <Checkbox currClass={props.currClass} value={props.value} checkHandle={props.checkHandle}/>
    <span>{props.value}</span>
  </div>

export default LegendItem;
