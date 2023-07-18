import { message, Modal, Upload } from "antd";
import { useState } from "react";
import getBase64 from "../../../helpers/getBase64";

const UploadSidos = ({ beforeUpload, handleChange, children, ...props }) => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImg: "",
    previewTitle: "",
  });

  const handleCancel = () =>
    setState((prev) => ({ ...prev, previewVisible: false }));

  // const handlePreview = async (file) => {
  //   if (!file?.url && !file?.preview) {
  //     file.preview = await getBase64(file?.originFileObj);
  //   }

  //   setState((prev) => ({
  //     ...prev,
  //     previewImg: file.url || file.preview,
  //     previewVisible: true,
  //     previewTitle:
  //       file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
  //   }));
  // };
  const handleChangeHandler = async ({ file }) => {
    const base64 = await getBase64(file?.originFileObj);
  };

  const beforeUploadHandler = (file) => {
    const isImgFormat =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isImgFormat) {
      message.error(`${file?.name} is not a png/jpeg/jpg file`);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return (isImgFormat || Upload.LIST_IGNORE) && isLt2M;
  };

  return (
    <>
      <Upload
        {...props}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        maxCount={1}
        // customRequest={() => console.log("mana")}
        // onPreview={handlePreview}
        onChange={(file) => {
          if (handleChange) {
            handleChange(file);
          } else {
            handleChangeHandler(file);
          }
        }}
        beforeUpload={(file) => {
          if (beforeUpload) {
            beforeUpload(file);
          } else {
            beforeUploadHandler(file);
          }
        }}
      >
        {children}
      </Upload>
    </>
  );
};

export default UploadSidos;
