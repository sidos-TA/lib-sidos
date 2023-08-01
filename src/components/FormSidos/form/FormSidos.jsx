import { Form, message, Modal, Space } from "antd";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContext from "../../../context/FormContext";
import {
  forbiddenResponse,
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
  deleteEndpoint,
  customFetch,
  endpoint,
  payload,
  payloadDelete,
  showSubmitBtn = false,
  BtnSubmitProps = {},
  onSuccessAction,
  beforeSubmit,
  debugSubmit = false,
  afterMessageActionClose,
  afterFetchSuccesHandler,
  submitText = "Submit",
  deleteText = "Delete",
  ...props
}) => {
  const fetch = useFetch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoadingForm: false,
    isDisabled: false,
    isLoadingSubmitForm: false,
    isRefetch: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, contextHolderModal] = Modal.useModal();

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
          if (afterFetchSuccesHandler) {
            afterFetchSuccesHandler(response?.data);
          }
          if (customFetch) {
            customFetch(response?.data);
          } else {
            form?.setFieldsValue(response?.data);
          }
        }
      })
      ?.catch((e) => {
        const err = responseError(e);
        if (err?.status === 401) {
          unAuthResponse({ err, messageApi });
        } else if (err?.status === 403) {
          forbiddenResponse({ navigate, err });
        } else if (err?.status === 404) {
          messageApi.open({
            type: "error",
            key: "send",
            content: err?.error,
            onClose: () => {
              navigate(-1);
            },
            duration: 0.5,
          });
        } else {
          messageApi.open({
            type: "error",
            key: "send",
            content: err?.error,
          });
        }
      })
      ?.finally(() => {
        setState((prev) => ({
          ...prev,
          isLoadingForm: false,
        }));
      });
  };

  const actionHandler = (endpointAction) => {
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
        endpoint: endpointAction,
        payload: {
          ...payload,
          ...(deleteEndpoint && {
            ...payloadDelete,
          }),
          ...formDatas,
        },
      })
        ?.then((res) => {
          const response = responseSuccess(res);
          if (response?.status === 200) {
            messageApi.open({
              type: "success",
              key: "submit_form",
              content: response?.data || response?.message,
              duration: 0.3,
              onClose: () => {
                if (onSuccessAction) {
                  onSuccessAction();
                } else {
                  navigate(-1);
                }
              },
            });
            if (afterMessageActionClose) {
              afterMessageActionClose(response);
            }
          }
        })
        ?.catch((e) => {
          const err = responseError(e);

          if (err?.status === 401) {
            unAuthResponse({ err, messageApi });
            setState((prev) => ({
              ...prev,
              isLoadingSubmitForm: false,
            }));
          } else {
            messageApi.open({
              type: "error",
              key: "error_submit_form",
              content:
                typeof err?.error === "object"
                  ? "Terjadi kesalahan"
                  : err?.error,
              onClose: () => {
                setState((prev) => ({
                  ...prev,
                  isLoadingSubmitForm: false,
                }));
              },
              duration: 1,
            });
          }
        });
      // ?.finally(() => {
      //   setState((prev) => ({
      //     ...prev,
      //     isLoadingSubmitForm: false,
      //   }));
      // });
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
      {contextHolderModal}
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
              {...props}
            >
              {children}
              <Space style={{ justifyContent: "center", width: "100%" }}>
                {deleteEndpoint && (
                  <BtnSidos
                    {...BtnSubmitProps}
                    danger
                    position="center"
                    htmlType="submit"
                    type="dashed"
                    onClick={() => {
                      modal.confirm({
                        content: "Apakah anda yakin untuk menghapusnya ?",
                        onOk: () => {
                          actionHandler(deleteEndpoint);
                        },
                      });
                      // form?.validateFields()?.then(() => {
                      //   submitHandler();
                      // });
                    }}
                  >
                    {deleteText}
                  </BtnSidos>
                )}
                {(submitEndpoint || showSubmitBtn) && (
                  <BtnSidos
                    {...BtnSubmitProps}
                    position="center"
                    htmlType="submit"
                    type="primary"
                    onClick={() => {
                      form?.validateFields()?.then(() => {
                        actionHandler(submitEndpoint);
                      });
                    }}
                  >
                    {submitText}
                  </BtnSidos>
                )}
              </Space>
            </Form>
          </Fragment>
        )}
      </FormContext.Provider>
    </>
  );
};

export default FormSidos;
