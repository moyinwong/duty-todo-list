import { List } from "antd";
import "../styles/DutyList.css";
import { Duty } from "../types";
import DutyItem from "./DutyItem";

type Props = {
  duties: Duty[];
  handleUpdateDuty: (duty: Duty) => void;
  handleDeleteDuty: (dutyId: number) => void;
};
export default function DutyList({
  duties,
  handleUpdateDuty,
  handleDeleteDuty,
}: Props) {
  return (
    <>
      <h3>Duties list:</h3>
      <List
        id="duty-list"
        size="small"
        bordered
        dataSource={duties}
        renderItem={(item) => (
          <List.Item>
            <DutyItem
              duty={item}
              handleUpdateDuty={handleUpdateDuty}
              handleDeleteDuty={handleDeleteDuty}
            />
          </List.Item>
        )}
      />
    </>
  );
}
