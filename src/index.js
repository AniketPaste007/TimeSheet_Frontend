import React from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Radio,
  DatePicker,
  message,
  Menu,
  Icon,
  Dropdown,
  Alert
} from "antd";
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
    //console.log(`${date ? date.format("YYYY-MM-DD") : "None"}`);
    this.setState({ date: `${date ? date.format("YYYY-MM-DD") : "None"}` });
    //console.log(this.state.date);
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

  handleButtonClick = e => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  handleMenuClick = e => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  render() {
    const { date } = this.state;
    var shown = {
      display: this.state.shown ? "block" : "none"
    };

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <Icon type="user" />
          Kajol
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          Vaibhav
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="user" />
          Kiran
        </Menu.Item>
      </Menu>
    );

    return (
      <div align="center" style={{ width: "80%", margin: "50px auto" }}>
        <h1>TIMESHEET ENTRY</h1>
        <div>
          <Dropdown.Button onClick={this.handleButtonClick} overlay={menu}>
            Select User
          </Dropdown.Button>
        </div>
        <br />
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
        <div>Date is : {this.state.date}</div>

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
