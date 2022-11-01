import { Select } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import { LANGUAGE } from "../../../../global/language";

const { Option } = Select;


const SelectLanguageFlags = (props: {onSelectFlag: (value: string,option: DefaultOptionType | DefaultOptionType[]) => void;}) => {
  const { onSelectFlag } = props;

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const langages = [
    { value: "french", text: "🇫🇷 French" },
    { value: "english", text: "🇬🇧 English" },
    { value: "german", text: "🇩🇪 German" },
  ];

  return (
    <Select
      showSearch
      placeholder="Select language"
      optionFilterProp="children"
      onChange={onSelectFlag}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option!.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      defaultValue="french"
      style={{ width: 120 }}
    >
      {LANGUAGE.map((lang, index) => {
        return (
          <Option key={index} value={lang.value}>
            {lang.text}
          </Option>
        );
      })}
    </Select>
  );
};
export default SelectLanguageFlags;
