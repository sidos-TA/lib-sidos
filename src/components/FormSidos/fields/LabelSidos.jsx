import { Space, Typography } from "antd";
import { Fragment } from "react";
import { useState } from "react";
import Field from "./Field";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import getYearNow from "../../../constants/getYearNow";

const LabelSidos = ({
  isEditable,
  type,
  label,
  children,
  onChange,
  defaultValue,
  labelProps,
  rules = [],
  position,
  isLink = false,
  required = false,
  ...props
}) => {
  const [editMode, setEditMode] = useState(false);

  const defaultValueHandler = () => {
    if (type === "date") {
      return dayjs(String(defaultValue || getYearNow), "YYYY");
    }
    return defaultValue;
  };

  const TypghographyWrapper = isLink ? Typography.Link : Typography.Text;

  return (
    <Space
      direction="vertical"
      style={{
        marginBottom: 20,
        ...(position && {
          textAlign: position,
          width: "100%",
        }),
      }}
    >
      {editMode ? (
        <Field
          autoFocus
          label={label}
          rules={rules}
          type={type}
          required={required}
          onChange={(value) => {
            onChange(value);
          }}
          defaultValue={defaultValueHandler()}
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
            <TypghographyWrapper
              {...(isEditable && {
                onClick: () => {
                  setEditMode(true);
                },
              })}
              {...labelProps}
            >
              {children}
            </TypghographyWrapper>
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
