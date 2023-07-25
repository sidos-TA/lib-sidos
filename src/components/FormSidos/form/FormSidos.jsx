import { Form, message } from "antd";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContext from "../../../context/FormContext";
import deleteCookie from "../../../helpers/deleteCookie";
import {
  responseError,
  responseSuccess,
  unAuthResponse,
} from "../../../helpers/formatRespons";
import useFetch from "../../../helpers/useFetch";
import BtnSidos from "../../BtnSidos";
import LoadingSidos from "../../LoadingSidos";

const FormSidos = ({
  children,
  form,
  submitEndpoint,
  customFetch,
  endpoint,
  payload,
  showSubmitBtn = false,
  BtnSubmitProps = {},
  onSubmitSuccess,
  beforeSubmit,
  debugSubmit = false,
  afterSubmitHandler,
  submitText = "Submit",
  ...props
}) => {
  const fetch = useFetch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoadingForm: false,
    isDisabled: false,
    isLoadingSubmitForm: false,
  });
  const [messageApi, contextHolder] = message.useMessage();

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
        unAuthResponse({ err, messageApi });
        messageApi.open({
          type: "error",
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
    let formDatas = form.getFieldsValue(true);

    if (beforeSubmit) {
      const beforeSubmitData = beforeSubmit();
      formDatas = beforeSubmitData;
    }

    if (debugSubmit) {
      // eslint-disable-next-line no-console
      console.log("beforeSubmit : ", formDatas);
    } else {
      setState((prev) => ({
        ...prev,
        isLoadingSubmitForm: true,
      }));
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
            if (afterSubmitHandler) {
              afterSubmitHandler(response);
            }
            messageApi.open({
              type: "success",
              key: "submit_form",
              content: response?.data || response?.message,
              onClose: () => {
                if (onSubmitSuccess) {
                  onSubmitSuccess();
                } else {
                  navigate(-1);
                }
              },
            });
          }
        })
        ?.catch((e) => {
          const err = responseError(e);
          messageApi.open({
            type: "error",
            key: "error_submit_form",
            content:
              typeof err?.error === "object" ? "Terjadi kesalahan" : err?.error,
            onClose: () => {
              setState((prev) => ({
                ...prev,
                isLoadingSubmitForm: false,
              }));
            },
          });
        });
    }
  };

  useEffect(() => {
    if (endpoint) {
      fetchDatas();
    }
  }, [JSON.stringify(payload)]);

  return (
    <>
      {contextHolder}
      <FormContext.Provider
        value={{
          form,
        }}
      >
        {state?.isLoadingForm || state?.isLoadingSubmitForm ? (
          <LoadingSidos style={{ height: "100vh" }} />
        ) : (
          <Fragment>
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              scrollToFirstError
              // wrapperCol={{
              //   span: 12,
              // }}
              {...props}
            >
              {children}
              {(submitEndpoint || showSubmitBtn) && (
                <BtnSidos
                  {...BtnSubmitProps}
                  position="center"
                  htmlType="submit"
                  type="primary"
                  onClick={() => {
                    form?.validateFields()?.then(() => {
                      submitHandler();
                    });
                  }}
                >
                  {submitText}
                </BtnSidos>
              )}
            </Form>
          </Fragment>
        )}
      </FormContext.Provider>
    </>
  );
};

export default FormSidos;
