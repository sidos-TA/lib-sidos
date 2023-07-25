import { Space, Typography } from "antd";

const LabelSidos = ({ isEditable, label, children, onChange, ...props }) => {
  return (
    <Space direction="vertical" style={{ marginBottom: 20 }}>
      <label>
        <span
          className="ant-typography css-dev-only-do-not-override-1wjdbgv"
          style={{ fontSize: 18 }}
        >
          {label}
        </span>
      </label>
      <Typography.Text
        {...(isEditable && {
          editable: {
            tooltip: `Click to edit ${label}`,
            triggerType: ["icon", "text"],
            onChange: (val) => {
              onChange(val);
            },
          },
        })}
        {...props}
      >
        {children}
      </Typography.Text>
    </Space>
  );
};
export default LabelSidos;
