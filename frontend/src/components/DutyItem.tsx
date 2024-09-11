import { EditOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, InputRef } from "antd";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { updateDuty } from "../api/api";
import "../styles/DutyItem.css";
import { Duty } from "../types";

type Props = {
  duty: Duty;
};
export default function DutyItem({ duty }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<InputRef>(null);

  const [form] = Form.useForm();

  const initialValues = {
    [duty.id]: duty.name,
  };

  const handleUpdateDuty = async () => {
    form.validateFields().then(() => {
      updateDuty(duty.id, form.getFieldValue(duty.id));
      setIsEdit(false);
    });
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
