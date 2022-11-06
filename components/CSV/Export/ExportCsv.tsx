import { Button, Tooltip } from "antd";
import React from "react";
import { CSVLink } from "react-csv";
import { SupportLanguages } from "../CsvComponents";

const ExportCsv = (props: { data: any[]; disabled: boolean, lang: SupportLanguages }) => {
  const { data, disabled, lang} = props;


  const headers = [
    { label: "id", key: "id" },
    { label: "default", key: "default" },
    { label: lang, key: "fr" },
  ];

  return (
    <>
      <CSVLink data={data} headers={headers} filename={`${lang}_Translate`}>
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
