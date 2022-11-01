import Papa from "papaparse";
import { Dispatch, SetStateAction } from "react";

const CsvImport = (props: {
  setParsedData: Dispatch<SetStateAction<any>>;
  setTableRows: Dispatch<SetStateAction<any>>;
  setValues: Dispatch<SetStateAction<any>>;
}) => {
  const { setParsedData, setTableRows, setValues } = props;

  const changeHandler = (event: ChangeEventHandler<HTMLInputElement>) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray:any = [];
        const valuesArray:any = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };
  return (
    <>
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
    </>
  );
};

export default CsvImport;
