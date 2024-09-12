import { Button, Flex, Form, Input } from "antd";
import Compact from "antd/es/space/Compact";
import { useState } from "react";
import { addDuty } from "./api/api";
import DutyList from "./components/DutyList";
import useDuties from "./hooks/useDuties";

function App() {
  const [dutyText, setDutyText] = useState("");
  const { duties, setDuties } = useDuties();

  const handleAddDuty = async () => {
    const duty = await addDuty(dutyText);
    setDuties((prev) => {
      return [...prev, duty];
    });
    setDutyText("");
  };

  return (
    <>
      <Flex justify="center" align="center" gap={25} vertical>
        <Form onFinish={handleAddDuty}>
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
            <Compact>
              <Input
                placeholder="Add Duty"
                width="10px"
                value={dutyText}
                onChange={(e) => setDutyText(e.target.value)}
              />
              <Button type="primary" htmlType="submit">
                Add duty
              </Button>
            </Compact>
          </Form.Item>
        </Form>

        <DutyList duties={duties} setDuties={setDuties} />
      </Flex>
    </>
  );
}

export default App;
