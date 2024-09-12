import { Flex, App } from "antd";
import { addDuty } from "./api/api";
import DutyInput from "./components/DutyInput";
import DutyList from "./components/DutyList";
import useDuties from "./hooks/useDuties";

function MyApp() {
  const { duties, setDuties } = useDuties();
  const { notification } = App.useApp();

  const handleAddDuty = async (dutyText: string) => {
    try {
      const duty = await addDuty(dutyText);
      setDuties((prev) => {
        return [...prev, duty];
      });
    } catch (err) {
      if (err instanceof Error) {
        notification.error({
          message: "Error occurred",
          description: err.message,
        });
      }
    }
  };

  return (
    <Flex justify="center" align="center" gap={25} vertical>
      <DutyInput handleAddDuty={handleAddDuty} />
      <DutyList duties={duties} setDuties={setDuties} />
    </Flex>
  );
}

export default MyApp;
