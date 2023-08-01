import { Space, Tooltip, Typography } from "antd";
import { createRef, Fragment, useRef } from "react";
import { useState } from "react";
import Field from "./Field";
import { EditOutlined } from "@ant-design/icons";

const LabelSidos = ({
  isEditable,
  type,
  label,
  children,
  onChange,
  defaultValue,
  labelProps,
  ...props
}) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Space direction="vertical" style={{ marginBottom: 20 }}>
      {editMode ? (
        <Field
          autoFocus
          label={label}
          type={type}
          onChange={(value) => {
            onChange(value);
          }}
          defaultValue={defaultValue}
          {...(type === "select" && {
            onInputKeyDown: (e) => {
              if (e?.code === "Enter") {
                setEditMode(false);
              }
            },
            defaultOpen: true,
          })}
          onKeyPress={(e) => {
            if (e?.code === "Enter") {
              setEditMode(false);
            }
          }}
          {...props}
        />
      ) : (
        <Fragment>
          <label>
            <span
              className="ant-typography css-dev-only-do-not-override-1wjdbgv"
              style={{ fontSize: 18 }}
            >
              {label}
            </span>
          </label>
          <Space>
            <Typography.Text
              {...(isEditable && {
                onClick: () => {
                  setEditMode(true);
                },
              })}
              {...labelProps}
            >
              {children}
            </Typography.Text>
            {isEditable && (
              <EditOutlined
                onClick={() => {
                  setEditMode(true);
                }}
              />
            )}
          </Space>
        </Fragment>
      )}
    </Space>
  );
};
export default LabelSidos;
