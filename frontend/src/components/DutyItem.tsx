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
    await form.validateFields();

    const newValue = form.getFieldValue(duty.id);
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

    setIsEdit(false);
  };

  const handleClear = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEdit(false);
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
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
              {
                required: true,
                message: "Duty cannot be empty",
              },
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
                    <Button onClick={() => setIsEdit(false)}>X</Button>
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
