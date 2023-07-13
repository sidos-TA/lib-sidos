import { Form, Grid } from "antd";
import FormContext from "../../../context/FormContext";
import BtnSidos from "../../BtnSidos";

const FormSidos = ({ children, form, ...props }) => {
  const submitHandler = () => {
    console.log(form.getFieldsValue(true));
  };
  return (
    <FormContext.Provider
      value={{
        form,
      }}
    >
      <Form form={form} layout="vertical" autoComplete="off" {...props}>
        {children}
        <BtnSidos htmlType="submit" onClick={submitHandler}>
          Submit
        </BtnSidos>
      </Form>
    </FormContext.Provider>
  );
};

export default FormSidos;
