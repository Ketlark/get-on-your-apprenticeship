import React, { Component } from 'react';
import axios from 'axios';
import logo from './hogwarts.png';
import './assets/index.css'

import Tab from '@material-ui/core/Tab';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "", tabValue: '1', filter: 'Gryffindor' };
    this.baseURL = process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:3333/" : "https://get-on-your-apprenticeship.herokuapp.com/"

    this.realData = null;
    this.dummyData = null;
    this.randomData = null;
    this.filteredData = null;
  }

  async callDummyAPI() {
    const res = await axios(this.baseURL + "dummy/students", { headers: { 'Access-Control-Allow-Origin' : '*'}});
    this.setState({dummyData: res.data});
  }

  async callRealAPI() {
    const res = await axios(this.baseURL + "real/students", { headers: { 'Access-Control-Allow-Origin' : '*'}});
    this.setState({realData: res.data});
  }

  async callRandomAPI() {
    const res = await axios(this.baseURL + "real/randomstudent", { headers: { 'Access-Control-Allow-Origin' : '*'}});
    this.setState({randomData: res.data});
  }

  async callFilteredAPI(filter) {
    const res = await axios(this.baseURL + "real/students?house=" + filter, { headers: { 'Access-Control-Allow-Origin' : '*'}});
    this.setState({filteredData: res.data});
  }

  async handleTabChange(value) {
    switch (value) {
      case '1':
        await this.callDummyAPI();
        break;
      case '2':
        await this.callRealAPI();
        break;
      case '3': 
        await this.callRandomAPI();
        break;
      case '4': 
        await this.callFilteredAPI(this.state.filter);
        break;
      default:
        break;
    }

    this.setState({tabValue: value});
  }

  async handleSelectChange(value) {
    await this.callFilteredAPI(value);
    this.setState({filter: value});
  }

  componentDidMount() {
    this.callDummyAPI();
  }

  buildDummyTable() {
    if((this.state.dummyData)) {
      return (
        <table cellPadding="10">
          <thead>
            <tr>
              {Object.keys(this.state.dummyData[0]).map(k => {
                return (
                  <td class="capitalize font-semibold">{k}</td>
                )
              })}
            </tr>
          </thead>
          <tbody>
              {this.state.dummyData.map(e => {
                return (<tr>
                  <td>{e.name}</td>
                  <td>{e.house}</td>
                </tr>)
              })}
          </tbody>
        </table>
      )
    } else {
      return <></>
    }
  }

  buildRealTable(filter) {
    const data = filter ? this.state.filteredData : this.state.realData;
    if(data) {
      return (
        <table cellPadding="10">
          <thead>
            <tr>
              {Object.keys(data[0]).map(k => {
                return (
                  <td class="capitalize font-semibold">{k}</td>
                )
              })}
            </tr>
          </thead>
          <tbody>
              {data.map(e => {
                return (
                  <tr>
                    <td>{e.name}</td>
                    <td>{e.house}</td>
                    <td>{e.species}</td>
                    <td>{e.patronus}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      )
    } else {
      return <></>
    }
  }

  render() {
    return (
      <div class="bg-gradient-to-br from-purple-700 to-purple-300 h-screen items-center justify-center flex flex-col">
        <img src={logo} class="mb-6 h-1/6" alt="logo" />
        <p class="text-sm lg:text-2xl mb-4 text-white font-extrabold drop-shadow-xl"> Students viewer - Poudlard school</p>
        <p className="App-intro">{this.state.apiResponse}</p>

        <div class="place-items-center grid w-full h-4/6 max-h-4/6">
          <div class="transform -rotate-3 absolute rounded-lg shadow-lg left-0 right-0 mx-auto w-3/5 h-4/6 bg-gradient-to-br from-purple-600 to-purple-500"></div>
          <div class="relative rounded-lg shadow-2xl left-0 right-0 mx-auto w-7/12 h-full bg-white overflow-y-auto">
            <TabContext value={this.state.tabValue}>
              <TabList onChange={(event, value) => this.handleTabChange(value)}>
                <Tab label="Dummy" value="1" />
                <Tab label="Real" value="2" />
                <Tab label="Random (real)" value="3" />
                <Tab label="House filter" value="4" />
              </TabList>
              <TabPanel value="1">
                {this.buildDummyTable()}
              </TabPanel>
              <TabPanel value="2">
                {this.buildRealTable()}
              </TabPanel>
              <TabPanel value="3">
                {this.state.randomData && 
                  <p>{this.state.randomData.name} {this.state.randomData.house} {this.state.randomData.patronus}</p>
                }
              </TabPanel>
              <TabPanel value="4">
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={this.state.filter}
                  onChange={event => this.handleSelectChange(event.target.value)}
                >
                  <MenuItem value="Gryffindor">Gryffindor</MenuItem>
                  <MenuItem value="Slytherin">Slytherin</MenuItem>
                  <MenuItem value="Ravenclaw">Ravenclaw</MenuItem>
                  <MenuItem value="Hufflepuff">Hufflepuff</MenuItem>
                </Select>
                {this.buildRealTable(true)}
              </TabPanel>
            </TabContext>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
