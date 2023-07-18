import { Form, Input } from "antd";
import BtnSidos from "./components/BtnSidos";
import Field from "./components/FormSidos/fields";
import FormSidos from "./components/FormSidos/form/FormSidos";
import TableSidos from "./components/TableSidos";

function TesLib() {
  const [form] = Form.useForm();

  const dummyListOptions = Array.from({ length: 50 }, (_, index) => ({
    label: `Data ${index + 1}`,
    value: index + 1,
  }));

  return <></>;
}

export default TesLib;
