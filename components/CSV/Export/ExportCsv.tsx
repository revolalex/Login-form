import { Button } from "antd";
import React from "react";
import { CSVLink } from "react-csv";

const ExportCsv = (props:{data: any[], disabled: boolean}) => {
  const { data, disabled } = props;
  console.log("exportCsv data", data);

  const headers = [
    { label: "id", key: "id" },
    { label: "default", key: "default" },
    { label: "fr", key: "fr" },
  ];
  
  return (
    <>
      <CSVLink data={props.data} headers={headers}>
        <Button type="primary" ghost disabled={disabled}>
          Export csv
        </Button>
      </CSVLink>
    </>
  );
};

export default ExportCsv;
