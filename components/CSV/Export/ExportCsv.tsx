import { Button, Tooltip } from "antd";
import React from "react";
import { CSVLink } from "react-csv";

const ExportCsv = (props: { data: any[]; disabled: boolean }) => {
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
        <Tooltip title="Edit all the traduction to enabled the button">
          <Button type="primary" ghost disabled={disabled}>
            Export csv
          </Button>
        </Tooltip>
      </CSVLink>
    </>
  );
};

export default ExportCsv;
