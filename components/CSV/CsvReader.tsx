import { useState } from "react";
import EditTable from "./Edit/EditTable";
import CsvImport from "./Import/CsvImport";

const CsvReader = () => {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  return (
    <div>
      <CsvImport
        setParsedData={setParsedData}
        setTableRows={setTableRows}
        setValues={setValues}
      />
      <br />
      <br />
      {tableRows.length > 0 && values.length > 0 && (
        <div style={{ width: "80%", margin: "auto" }}>
          {/* <TableEdit values={values} tableRows={tableRows} />
          <br/> */}
          <EditTable values={values} tableRows={tableRows} />
        </div>
      )}
    </div>
  );
};

export default CsvReader;
