import { Button, Form, Input } from "antd";
import Compact from "antd/lib/space/Compact";
import { useState } from "react";
import "../styles/DutyInput.css";

type Props = {
  handleAddDuty: (dutyText: string) => void;
};

export default function DutyInput({ handleAddDuty }: Props) {
  const [dutyText, setDutyText] = useState("");

  const onAdd = () => {
    handleAddDuty(dutyText);
    setDutyText("");
  };

  return (
    <Form id="duty-input" onFinish={onAdd}>
      <Form.Item
        name="Duty"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("Duty").trim() === "") {
                return Promise.reject(new Error("Duty cannot be empty"));
              }
              return Promise.resolve();
            },
          }),
        ]}
        validateTrigger="onSubmit"
      >
        <Compact className="w-100">
          <Input
            aria-label="Add Duty"
            placeholder="Add Duty"
            value={dutyText}
            onChange={(e) => setDutyText(e.target.value)}
          />
          <Button type="primary" htmlType="submit">
            Add duty
          </Button>
        </Compact>
      </Form.Item>
    </Form>
  );
}
