import { Form, message } from "antd";
import { useEffect, useState } from "react";
import FormContext from "../../../context/FormContext";
import { responseError, responseSuccess } from "../../../helpers/formatRespons";
import useFetch from "../../../helpers/useFetch";
import BtnSidos from "../../BtnSidos";

const FormSidos = ({
  children,
  form,
  submitEndpoint,
  customFetch,
  endpoint,
  payload,
  ...props
}) => {
  const fetch = useFetch();
  const [state, setState] = useState({
    isLoadingForm: false,
  });

  const fetchDatas = () => {
    setState((prev) => ({
      ...prev,
      isLoadingForm: true,
    }));

    fetch({
      endpoint,
      payload,
    })
      ?.then((res) => {
        const response = responseSuccess(res);

        if (response?.status === 200) {
          if (customFetch) {
            customFetch(response?.data);
          } else {
            form?.setFieldsValue(response?.data);
          }
        }
      })
      ?.catch((e) => {
        const err = responseError(e);
        message.error({
          key: "send",
          content: err?.error,
        });
      })
      ?.finally(() => {
        setState((prev) => ({
          ...prev,
          isLoadingForm: false,
        }));
      });
  };

  const submitHandler = () => {
    const formDatas = form.getFieldsValue(true);
    fetch({
      endpoint: submitEndpoint,
      payload: {
        ...payload,
        ...formDatas,
      },
    })
      ?.then((res) => {
        const response = responseSuccess(res);
        if (response?.status === 200) {
          message.success({
            key: "send",
            content: response?.data || response?.message,
          });
        }
      })
      ?.catch((e) => {
        const err = responseError(e);
        message.error({
          key: "send",
          content: err?.error,
        });
      });
  };

  useEffect(() => {
    if (endpoint) {
      fetchDatas();
    }
  }, [JSON.stringify(payload)]);

  return (
    <FormContext.Provider
      value={{
        form,
      }}
    >
      {state?.isLoadingForm ? (
        <>Loading Form...</>
      ) : (
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          wrapperCol={{
            span: 12,
          }}
          {...props}
        >
          {children}
          {submitEndpoint && (
            <BtnSidos htmlType="submit" onClick={submitHandler}>
              Submit
            </BtnSidos>
          )}
        </Form>
      )}
    </FormContext.Provider>
  );
};

export default FormSidos;
