import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import React, { useState } from "react";
import SelectLanguageFlags from "./SelectLanguageFlags/SelectLanguageFlags";
import ExportCsv from "../Export/ExportCsv";
import Translate from "../Translate/Translate";

export interface TraductionItem {
  key: string;
  id: string;
  default: string;
  fr: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: TraductionItem;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditTable = (props: { tableRows: string[]; values: string[] }) => {
  // form
  const [form] = Form.useForm();
  // props
  const { values, tableRows } = props;
  console.log("tableRows", tableRows);
  // build data
  const dataValues: any[] = [];
  values.map((value) => {
    return dataValues.push({
      key: value[0],
      id: value[0],
      default: value[1],
      fr: value.length > 2 ? value[2] : null,
    });
  });
  // State
  const [data, setData] = useState(dataValues);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: TraductionItem) => record.key === editingKey;

  const edit = (record: Partial<TraductionItem> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TraductionItem;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "10%",
      // editable: true,
    },
    {
      title: "default",
      dataIndex: "default",
      // editable: true,
    },
    {
      title: "fr",
      dataIndex: "fr",
      editable: true,
      width: "50%",
    },
    {
      title: "Translate",
      dataIndex: "translate",
      width: "20%",
      render: (_: any, record: TraductionItem) => {
        return <Translate {...record} />;
      },
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "20%",
      render: (_: any, record: TraductionItem) => {
        const editable = isEditing(record);
        return editable ? (
          <span style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TraductionItem) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const onSelectFlag = (l: string) => {
    console.log(l);
  };

  console.log("data", data);
  const isTradComplete: boolean = data.find((el) => el.fr === null);
  return (
    <>
      <ExportCsv data={data} disabled={isTradComplete} />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      <style jsx>{`
        .editable-row .ant-form-item-explain {
          position: absolute;
          top: 100%;
          font-size: 12px;
        }
      `}</style>
    </>
  );
};

export default EditTable;
