import { Chart } from "react-google-charts";
import React from "react";
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import axios from "axios"
import BootstrapTable from "react-bootstrap-table-next";



class LastPeriodTime extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataProcess: null,
      tableData: null,
      header: null,
      rowsData: null,
      keysData: null
    };

  }

  options = {
    title: "My Weekly Time Report",
    is3D: true,
  };

  url = process.env.REACT_APP_API_URL + "/getTime/?emailAddress=danconttest0@gmail.com";

  componentDidMount = () => {
    axios.get(this.url, { crossDomain: true })
      .then((response) => {
        if (response) {

          return response;

        }
        else {
          console.log("FAILURE");
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
      .then(data => {
        let temp = []
        temp.push(["Taks", "Hours Spend"]);
        data['data'].forEach((item) => temp.push([item.Task, item.HoursSpend]));
        let tempKeys = []
        tempKeys = Object.keys(data['data'][0])
        var keys = []
        for (let item of tempKeys) {
          keys.push({
            dataField: item,
            text: item
          })
          console.log("OK");
        }
        this.setState({
          dataProcess: temp,
          tableData: data['data'],
          header: keys
        });

      })
      .catch((error) => console.error("FETCH ERROR: ", error))
  };

  render() {
    if (!this.state.header)
      return null;
    return (<>
      <Container>
        <Chart
          chartType="PieChart"
          data={this.state.dataProcess}
          options={this.options}
          width={"100%"}
          height={"400px"}
        />
      </Container>
      <div>
        <Container>
          <BootstrapTable keyField="Task" data={this.state.tableData} columns={this.state.header} />

        </Container>
      </div>
      <br>
      </br>
    </>
    );
  }
}

export default LastPeriodTime;