import React from "react";
import ReactDOM from "react-dom";
import { Button, Radio, DatePicker, message, Alert } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import EditableFormTable from "./table";
import { getCurrentDate } from "./utils";
import { getyesterdayDate } from "./utils";

const RadioGroup = Radio.Group;
class App extends React.Component {
  state = {
    date: getCurrentDate(),
    shown: false
  };

  handleChange = date => {
    message.info(`Selected Date: ${date ? date.format("YYYY-MM-DD") : "None"}`);
    this.setState({ date });
  };

  onchange = e => {
    this.setState({
      value: e.target.value
    });
  };

  toggleon() {
    this.setState({
      shown: true
    });
  }

  toggletoday() {
    this.setState({
      shown: false
    });
    var abc = getCurrentDate();
    this.setState({ date: abc });
    message.info(`Selected Date: ${abc}`);
    console.log(this.state.date);
  }

  toggleyesterday() {
    this.setState({
      shown: false
    });
    var abc = getyesterdayDate();
    this.setState({ date: abc });
    message.info(`Selected Date: ${abc}`);
    console.log(this.state.date);
  }

  render() {
    const { date } = this.state;
    var shown = {
      display: this.state.shown ? "block" : "none"
    };

    return (
      <div align="center" style={{ width: "80%", margin: "50px auto" }}>
        <h1>TIMESHEET ENTRY</h1>
        <div>
          <RadioGroup onChange={this.onchange} value={this.state.value}>
            <Radio value={1} onChange={this.toggletoday.bind(this)}>
              Today
            </Radio>
            <Radio value={2} onChange={this.toggleyesterday.bind(this)}>
              Yesterday
            </Radio>
            <Radio value={3} onClick={this.toggleon.bind(this)}>
              Future
            </Radio>
          </RadioGroup>
          <br />
          <br />
        </div>
        <div style={shown}>
          <DatePicker onChange={this.handleChange} />
        </div>
        <br />

        <EditableFormTable id="container" />
        <br />
        <div style={{ marginTop: "16px", display: "Block" }}>
          <Button type="primary">SUBMIT</Button>
        </div>
        <br />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
