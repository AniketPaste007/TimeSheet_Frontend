import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from 'redux';
import {
  Button,
  Radio,
  DatePicker,
  message,
  Menu,
  Icon,
  Dropdown,
  Input,
  Table
} from "antd";
import "antd/dist/antd.css";
import "./index.css";
import { getCurrentDate } from "./utils";
import { getyesterdayDate } from "./utils";

const RadioGroup = Radio.Group;

var productList = [
  {
    id: 1,
    category: 'Sporting Goods',
    price: '49.99',
    qty: 12,
    name: 'football'
  }, {
    id: 2,
    category: 'Sporting Goods',
    price: '9.99',
    qty: 15,
    name: 'baseball'
  }, {
    id: 3,
    category: 'Sporting Goods',
    price: '29.99',
    qty: 14,
    name: 'basketball'
  }, {
    id: 4,
    category: 'Electronics',
    price: '99.99',
    qty: 34,
    name: 'iPod Touch'
  }, {
    id: 5,
    category: 'Electronics',
    price: '399.99',
    qty: 12,
    name: 'iPhone 5'
  }, {
    id: 6,
    category: 'Electronics',
    price: '199.99',
    qty: 23,
    name: 'nexus 7'
  }
];

/* reducers*/
function table(state = [], action) {
  if (action.type === "ADD_PRODUCT") {
    return state.concat([action.obj])
  } else if (action.type === "DELETE_PRODUCT") {
    var index = state.indexOf(action.obj);
    state.splice(index, 1);
    return state;
  } else if (action.type === "UPDATE_PRODUCT") {
    return state.map((todo, index, arr) => {
      if (arr[index].id.toString() === action.obj.id) {
        let obj = {};
        obj[action.obj.name] = action.obj.value;
        return Object.assign({}, todo, obj);
      }
      return todo
    })

  } else {
    return state;
  }

}
function filter(state = "", action) {

  if (action.type === "FILTER_TEXT") {
    return action.text;
  } else {
    return state;
  }

}

var filterText = ""

var initialState = {
  filter: filterText,
  table: productList

};

let reducer = combineReducers({ table, filter })
let store = createStore(reducer, initialState);

/* class Products extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          value: '',
      };

      store.subscribe(() => {
          this.setState({
              value: store.getState(),
          })
      }); 
  };

render() {
  const state = store.getState();
  return (
      
  );

} 

}*/
function ProductTable(props) {

  //var filterText = props.filterText;
  //console.log(props);
  var product = props.products.map(function (product) {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    return (<ProductRow product={product} key={product.id} />)
  });
  return (
    <div>
      <div>
        <Button type="primary" onClick={() => store.dispatch({
          type: 'ADD_PRODUCT',
          obj: {
            category: "",
            id: (+ new Date() + Math.floor(Math.random() * 999999)).toString(36),
            name: "",
            price: "",
            qty: 0
          }
        })}>Add</Button>
      </div>
      <br/>
      <div>
        <table className="table table-bordered">
          <thead align="center" style={{ backgroundColor: "black", color: "white" }}>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {product}
          </tbody>
        </table>
      </div>
    </div>

  );

}

function ProductRow(props) {

  return (
    <tr className="eachRow" align="center">
      <EditableCell cellData={{
        "type": "name",
        value: props.product.name,
        id: props.product.id
      }} />
      <EditableCell cellData={{
        type: "price",
        value: props.product.price,
        id: props.product.id
      }} />
      <EditableCell cellData={{
        type: "qty",
        value: props.product.qty,
        id: props.product.id
      }} />
      <EditableCell cellData={{
        type: "category",
        value: props.product.category,
        id: props.product.id
      }} />
      <td className="del-cell">
        <Button type="danger" shape="circle" onClick={() => store.dispatch({ type: 'DELETE_PRODUCT', obj: props.product })}>
          <Icon type="delete" style={{marginBottom: "7px"}}/>
        </Button>
      </td>
    </tr>
  );

}
function EditableCell(props) {
  return (
    <td>
      <Input type='text' id={props.cellData.id} value={props.cellData.value} name={props.cellData.type} onChange={(evt) => {
        store.dispatch({
          type: 'UPDATE_PRODUCT',
          obj: {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
          }
        })
      }} />
    </td>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: getCurrentDate(),
      shown: false,
      value: '',
    };

    store.subscribe(() => {
      this.setState({
        value: store.getState(),
      })
    });
  }


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
    const value = store.getState();
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
        {/*<div>Date is : {this.state.date}</div>*/}

        <div>
          <ProductTable products={value.table} />
        </div>
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
