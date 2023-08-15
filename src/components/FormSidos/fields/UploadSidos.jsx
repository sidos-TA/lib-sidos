import { message, Upload } from "antd";
import FormItemSidos from "../form/FormItemSidos";

const UploadSidos = ({
  handleChange,
  children,
  isImage,
  label,
  name,
  formItemObj = {},
  required = false,
  rules = [],
  ...props
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  // lakukan pengecekan dulu sblm onChange
  // ntah knp pakai beforeUpload, masih jalan onChange nya
  const checkBeforeOnChange = ({ file }) => {
    const isLt2M = file.size / 1024 < 200;

    if (!isLt2M) {
      messageApi.open({
        type: "error",
        content: "Ukuran file jangan lebih dari 200KB",
      });
      return false;
    } else {
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
          return false;
        }

        return true;
      }
      return true;
    }
  };

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
          beforeUpload={() => false}
          maxCount={1}
          onChange={async (file) => {
            // cek disini dulu sizenya, kalau kurang dari 200KB, baru dijalankan fungsi preview
            if (checkBeforeOnChange(file) && handleChange) {
              handleChange(file);
            }
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
