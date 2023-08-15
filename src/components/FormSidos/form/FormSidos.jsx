import { Form, message, Modal, Space } from "antd";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContext from "../../../context/FormContext";
import catchHandler from "../../../helpers/catchHandler";
import { responseSuccess } from "../../../helpers/formatRespons";
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
  payloadFetch,
  payloadSubmit,
  payloadDelete,
  showSubmitBtn = false,
  BtnSubmitProps = {},
  beforeSubmit,
  debugSubmit = false,
  afterMessageActionClose,
  submitText = "Submit",
  deleteText = "Delete",
  isBack404Fetch = true,
  isBack404Submit = true,
  ...props
}) => {
  const fetch = useFetch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoadingForm: false,
    isDisabled: false,
    isLoadingSubmitForm: false,
    isRefetch: false,
    isOpenModalConfirm: true,
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
      payload: {
        ...payloadFetch,
      },
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
        catchHandler({ e, messageApi, navigate, isBack404: isBack404Fetch });
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
      console.log("beforeSubmit : ", {
        submitEndpoint,
        ...formDatas,
        ...(deleteEndpoint && {
          ...payloadDelete,
        }),
        ...payloadSubmit,
      });
    } else {
      setState((prev) => ({
        ...prev,
        isLoadingSubmitForm: true,
      }));
      fetch({
        endpoint: endpointAction,
        payload: {
          ...formDatas,
          ...(deleteEndpoint && {
            ...payloadDelete,
          }),
          ...payloadSubmit,
        },
      })
        ?.then((res) => {
          const response = responseSuccess(res);
          if (response?.status === 200) {
            messageApi.open({
              type: "success",
              key: "submit_form",
              content: response?.message,
              duration: 0.8,
              onClose: () => {
                if (afterMessageActionClose) {
                  afterMessageActionClose(response);
                } else {
                  navigate("/");
                }
              },
            });
          }
        })
        ?.catch((e) => {
          catchHandler({ e, messageApi, navigate, isBack404: isBack404Submit });
          setState((prev) => ({
            ...prev,
            isLoadingSubmitForm: false,
          }));
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
  }, [JSON.stringify(payloadFetch)]);

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
