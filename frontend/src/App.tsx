import { Flex, App } from "antd";
import { addDuty } from "./api/api";
import DutyInput from "./components/DutyInput";
import DutyList from "./components/DutyList";
import useDuties from "./hooks/useDuties";
import { Duty } from "./types";

function MyApp() {
  const { duties, setDuties } = useDuties();
  const { notification } = App.useApp();

  const handleAddDuty = async (dutyText: string) => {
    try {
      const duty = await addDuty(dutyText);
      setDuties([...duties, duty]);
    } catch (err) {
      if (err instanceof Error) {
        notification.error({
          message: "Error occurred",
          description: err.message,
        });
      }
    }
  };

  const handleUpdateDuty = (updatedDuty: Duty) => {
    setDuties((prev) =>
      prev.map((duty) => (duty.id === updatedDuty.id ? updatedDuty : duty))
    );
  };
  const handleDeleteDuty = (deletedDutyId: number) => {
    setDuties(duties.filter((d) => d.id !== deletedDutyId));
  };

  return (
    <Flex justify="center" align="center" gap={25} vertical>
      <DutyInput handleAddDuty={handleAddDuty} />
      <DutyList
        duties={duties}
        handleUpdateDuty={handleUpdateDuty}
        handleDeleteDuty={handleDeleteDuty}
      />
    </Flex>
  );
}

export default MyApp;
