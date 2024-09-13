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
    <Form onFinish={onAdd} id="duty-input">
      <Form.Item
        name="Duty"
        rules={[
          {
            required: true,
            message: "Duty cannot be empty",
          },
        ]}
        validateTrigger="onSubmit"
      >
        <Compact className="w-100">
          <Input
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
