import type { InputRef } from "antd";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import type { FormInstance } from "antd/es/form";
import React, { useContext, useEffect, useRef, useState } from "react";
import SelectLanguageFlags from "./SelectLanguageFlags/SelectLanguageFlags";
import ExportCsv from "../Export/ExportCsv";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  id: string;
  default: string;
  fr: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
      console.log('ICI, values', values)
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  id: string;
  default: string;
  fr: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const TableEdit = (props: { tableRows: string[]; values: string[] }) => {
  // tableRows in case, can be used later to dinamic custom data
  const { tableRows, values } = props;

  // handle data display in each rows
  const dataValues: Item[] = [];
  values.map((value) => {
    return dataValues.push({
      key: value[0],
      id: value[0],
      default: value[1],
      fr: value.length > 2 ? value[2] : "required translation",
    });
  });

  const defaultCount = dataValues.length + 1;

  const [dataSource, setDataSource] = useState<DataType[]>(dataValues);
  const [count, setCount] = useState(defaultCount && defaultCount);
  // 
  const [lang, setLang] = useState();

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  //********     COLUMNS PART   **********/
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "id",
      dataIndex: "id",
      width: "10%",
      editable: true,
    },
    {
      title: "default",
      dataIndex: "default",
      editable: true,
    },
    {
      title: "fr",
      dataIndex: "fr",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      // @ts-ignore
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      id: `${count}`,
      default: "en",
      fr: `fr`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const onSelectFlag = (l: string) => {
    console.log(l);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  console.log(dataSource);
  return (
    <div>
      <SelectLanguageFlags onSelectFlag={onSelectFlag} />
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <ExportCsv />
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
      <style jsx>{`
        .editable-cell {
          position: relative;
        }

        .editable-cell-value-wrap {
          padding: 5px 12px;
          cursor: pointer;
        }

        .editable-row:hover .editable-cell-value-wrap {
          padding: 4px 11px;
          border: 1px solid #d9d9d9;
          border-radius: 2px;
        }

        [data-theme="dark"] .editable-row:hover .editable-cell-value-wrap {
          border: 1px solid #434343;
        }
      `}</style>
    </div>
  );
};

export default TableEdit;
