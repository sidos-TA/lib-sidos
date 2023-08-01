import { message, Upload } from "antd";
import { useEffect } from "react";
import { useFormContext } from "../../../context/FormContext";
import getBase64 from "../../../helpers/getBase64";
import FormItemSidos from "../form/FormItemSidos";

const UploadSidos = ({
  beforeUpload,
  handleChange,
  children,
  isImage,
  label,
  name,
  formItemObj = {},
  isManualSize = false,
  required = false,
  rules = [],
  ...props
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { form } = useFormContext();

  const beforeUploadHandler = (file) => {
    if (isImage) {
      const isImgFormat =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      if (!isImgFormat) {
        messageApi.open({
          type: "error",
          key: "errMsg",
          content: `${file?.name} is not a png/jpeg/jpg file`,
        });
      }
      if (!isManualSize) {
        const isLt2M = file.size / 1024 / 1024 < 1;

        if (!isLt2M) {
          messageApi.open({
            type: "error",
            content: "Ukuran file jangan lebih dari 1MB",
          });
        }

        return (isImgFormat || Upload.LIST_IGNORE) && isLt2M;
      }
      return isImgFormat || Upload.LIST_IGNORE;
    }
  };

  // useEffect(() => {
  //   console.log("sdsdsd");
  // }, [JSON.stringify(form?.getFieldsValue())]);
  return (
    <>
      {contextHolder}
      <FormItemSidos
        label={label}
        name={name}
        required={required}
        rules={rules}
        {...formItemObj}
      >
        <Upload
          {...(isImage && {
            accept: ".jpg,.png,.jpeg",
          })}
          maxCount={1}
          onChange={async (file) => {
            if (handleChange) {
              handleChange(file);
            }
            const getValueField = form?.getFieldValue(name);

            const base64Url = await getBase64(getValueField?.file);
            form?.setFieldValue(name, base64Url);
          }}
          beforeUpload={(file) => {
            if (beforeUpload) {
              beforeUpload(file);
            } else {
              beforeUploadHandler(file);
            }

            return false;
          }}
          {...props}
        >
          {children}
        </Upload>
      </FormItemSidos>
    </>
  );
};

export default UploadSidos;
