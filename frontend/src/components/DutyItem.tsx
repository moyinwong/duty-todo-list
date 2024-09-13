import { EditOutlined } from "@ant-design/icons";
import { App, Button, Flex, Form, Input, InputRef } from "antd";
import {
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { updateDuty } from "../api/api";
import { Duty } from "../types";

type Props = {
  duty: Duty;
  setDuties: (func: SetStateAction<Duty[]>) => void;
};

export default function DutyItem({ duty, setDuties }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const { notification } = App.useApp();

  const initialValues = {
    [duty.id]: duty.name,
  };

  const handleUpdateDuty = async () => {
    const newValue: string = form.getFieldValue(duty.id);

    try {
      await form.validateFields();
    } catch (err) {
      // validation error, ignore
      if (err && typeof err === "object" && "errorFields" in err) {
        return;
      }
      throw err;
    }

    try {
      const updatedDuty = await updateDuty(duty.id, newValue);
      setDuties((prev) =>
        prev.map((duty) => (duty.id === updatedDuty.id ? updatedDuty : duty))
      );
    } catch (err) {
      if (err instanceof Error) {
        notification.error({
          message: "Error occurred",
          description: err.message,
        });
      }
    }

    onCancel();
  };

  const handleClear = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const onCancel = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  return (
    <>
      {isEdit && (
        <Form
          form={form}
          className="w-100"
          initialValues={initialValues}
          onFinish={handleUpdateDuty}
        >
          <Form.Item
            className="m-0"
            name={duty.id}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue(duty.id).trim() === "") {
                    return Promise.reject(new Error("Duty cannot be empty"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            validateTrigger={["onSubmit", "onBlur"]}
          >
            <Input
              ref={inputRef}
              placeholder="Add Duty"
              onPressEnter={handleUpdateDuty}
              onKeyDown={handleClear}
              onChange={(e) => form.setFieldValue(duty.id, e.target.value)}
              suffix={
                <Flex justify="space-between" align="center" gap={20}>
                  <Flex gap={4}>
                    <Button danger type="primary" htmlType="submit">
                      Update
                    </Button>
                    <Button onClick={onCancel}>X</Button>
                  </Flex>
                </Flex>
              }
            />
          </Form.Item>
        </Form>
      )}

      {!isEdit && (
        <Flex justify="space-between" align="center" className="w-100">
          <div>{duty.name}</div>
          <EditOutlined onClick={handleEdit} />
        </Flex>
      )}
    </>
  );
}
