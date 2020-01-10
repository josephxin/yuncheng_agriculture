/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
import DataOverView from './dataOverView'

class DataView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      display: 'block',
      dataEntry:{},
      dataExport:[],
    };
    this.getLineData();
  }

  getLineData(){
    let fromEntryData = {
      "data": [
        {"DATES": "2017-09-16", "SJL": 139758, "TYPE": "SJSR"},
        {"DATES": "2017-09-17", "SJL": 136471, "TYPE": "SJSR"},
        {"DATES": "2017-09-18", "SJL": 139393, "TYPE": "SJSR"},
        {"DATES": "2017-09-19", "SJL": 135568, "TYPE": "SJSR"},
        {"DATES": "2017-09-20", "SJL": 127087, "TYPE": "SJSR"},
        {"DATES": "2017-09-21", "SJL": 128069, "TYPE": "SJSR"},
        {"DATES": "2017-09-22", "SJL": 126892, "TYPE": "SJSR"},
        {"DATES": "2017-09-23", "SJL": 129149, "TYPE": "SJSR"},
        {"DATES": "2017-09-24", "SJL": 127294, "TYPE": "SJSR"},
        {"DATES": "2017-09-25", "SJL": 116260, "TYPE": "SJSR"},
        {"DATES": "2017-09-26", "SJL": 78588, "TYPE": "SJSR"}],
      "head": {
        "total": 11,
        "message": null,
        "interfaceId": "402883895ea8227a015eb81e39190040", "state": true
      }
    };
    let entryData = fromEntryData.data;
    this.state.dataEntry = entryData.map(function (item, index) {
      return {
        date: item.DATES.substring(2, 4) + '/' + item.DATES.substring(5, 7) + '/' + item.DATES.substring(8),
        data: item.SJL
      };
    });
    let fromExportData = {
      "data": [
        {"DATES": "2017-09-18", "SJL": 89776, "TYPE": "SJSC"},
        {"DATES": "2017-09-19", "SJL": 40048, "TYPE": "SJSC"},
        {"DATES": "2017-09-25", "SJL": 4822, "TYPE": "SJSC"},
        {"DATES": "2017-09-26", "SJL": 2232, "TYPE": "SJSC"},
        {"DATES": "2017-09-17", "SJL": 89671, "TYPE": "SJSC"},
        {"DATES": "2017-09-22", "SJL": 4654, "TYPE": "SJSC"},
        {"DATES": "2017-09-20", "SJL": 4621, "TYPE": "SJSC"},
        {"DATES": "2017-09-23", "SJL": 4559, "TYPE": "SJSC"},
        {"DATES": "2017-09-24", "SJL": 4547, "TYPE": "SJSC"},
        {"DATES": "2017-09-21", "SJL": 5091, "TYPE": "SJSC"}],
      "head": {
        "total": 10,
        "message": null,
        "interfaceId": "402883895ea8227a015eb81df040003c", "state": true
      }
    };
    let exportData = fromExportData.data;
    this.state.dataExport = exportData.map(function (item, index) {
      return {
        date: item.DATES.substring(2, 4) + '/' + item.DATES.substring(5, 7) + '/' + item.DATES.substring(8),
        data: item.SJL
      };
    });
  }
  render() {
    let me = this;
    let props = this.props;
    return(
        <div>
             {/* <DataOverView></DataOverView> */}
        </div>
    )
  }
}

export default DataView
