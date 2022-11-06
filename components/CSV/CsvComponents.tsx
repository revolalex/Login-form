import { useState } from "react";
import EditTable from "./Table/EditTable";
import SelectLanguageFlags from "./Table/SelectLanguageFlags/SelectLanguageFlags";
import CsvImport from "./Import/CsvImport";
import { Empty } from "antd";
import Waves from "../Waves/Waves";

export type SupportLanguages = "french" | "english" | "german";

const CsvComponents = () => {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);
  // State to store table Column name
  const [tableRows, setTableRows] = useState([]);
  // State to store the values
  const [values, setValues] = useState([]);
  // State to store the language
  const [lang, setLang] = useState<SupportLanguages>("french");

  const onSelectFlag = (l: SupportLanguages) => {
    setLang(l);
  };

  return (
    <div>
      <Waves>
        <div style={{ width: "100%", margin: "10px"}}>
          <CsvImport
            setParsedData={setParsedData}
            setTableRows={setTableRows}
            setValues={setValues}
          />

          <br />
          <br />
          {values.length > 0 && (
            <span>
              selecte a language: &nbsp;
              <SelectLanguageFlags onSelectFlag={onSelectFlag} />
            </span>
          )}
          {tableRows.length > 0 && values.length > 0 ? (
            <EditTable values={values} tableRows={tableRows} lang={lang} />
          ) : (
            <Empty style={{ margin: 60 }} />
          )}
        </div>
      </Waves>
    </div>
  );
};

export default CsvComponents;
