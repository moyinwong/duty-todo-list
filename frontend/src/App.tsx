import { useEffect, useState } from "react";
import { Button, Flex, Form, Input, List } from "antd";
import TextInput from "./TextInput";
import DutyItem from "./components/DutyItem";
import { Duty } from "./types";
import { addDuty, getDuties } from "./api/api";
import Compact from "antd/es/space/Compact";
import DutyList from "./components/DutyList";

function App() {
  const [dutyText, setDutyText] = useState("");
  const [count, setCount] = useState(0);
  const [duties, setDuties] = useState<Duty[]>([]);

  const handleAddDuty = () => {
    addDuty(dutyText);
    setDutyText("");
  };

  useEffect(() => {
    const items = getDuties();
    setDuties(items);
  }, []);

  const validateMessages = {
    required: "'${name}' is required!",
    // ...
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

        <DutyList duties={duties} />
      </Flex>
    </>
  );
}

export default App;
