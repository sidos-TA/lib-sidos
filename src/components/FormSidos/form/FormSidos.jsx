import { Form as FormDesktop, Grid } from "antd";
import { Form as FormMobile } from "antd-mobile";
import FormContext from "../../../context/FormContext";
import BtnSidos from "../../BtnSidos";

const FormSidos = ({ children, form, ...props }) => {
  const { xs } = Grid.useBreakpoint();

  const Form = xs ? FormMobile : FormDesktop;

  const submitHandler = () => {
    console.log(form.getFieldsValue(true));
  };
  return (
    <FormContext.Provider
      value={{
        form,
      }}
    >
      <Form layout="vertical" autoComplete="off" {...props}>
        {children}

        <BtnSidos
          propsMobile={{ color: "primary" }}
          propsDesktop={{ type: "primary" }}
          htmlType="submit"
          onClick={submitHandler}
          {...(xs ? { type: "submit" } : { htmlType: "submit" })}
        >
          Submit
        </BtnSidos>
      </Form>
    </FormContext.Provider>
  );
};

export default FormSidos;
