import { useState } from "react";
import EditTable from "./Edit/EditTable";
import SelectLanguageFlags from "./Edit/SelectLanguageFlags/SelectLanguageFlags";
import ExportCsv from "./Export/ExportCsv";
import CsvImport from "./Import/CsvImport";


export type SupportLanguages = 'french' | 'english' | 'german'

const CsvReader = () => {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);
  // State to store table Column name
  const [tableRows, setTableRows] = useState([]);
  // State to store the values
  const [values, setValues] = useState([]);
  // State to store the language
  const [lang, setLang] = useState<SupportLanguages>();

  const onSelectFlag = (l: SupportLanguages) => {
    setLang(l)
  };


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
          <SelectLanguageFlags onSelectFlag={onSelectFlag} />
          {/* <ExportCsv data={values} disabled={false} /> */}
          <EditTable values={values} tableRows={tableRows} lang={lang}/>
        </div>
      )}
    </div>
  );
};

export default CsvReader;
