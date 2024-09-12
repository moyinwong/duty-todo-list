import { List } from "antd";
import { Duty } from "../types";
import DutyItem from "./DutyItem";
import "../styles/DutyList.css";
import { SetStateAction } from "react";

type Props = {
  duties: Duty[];
  setDuties: (func: SetStateAction<Duty[]>) => void;
};
export default function DutyList({ duties, setDuties }: Props) {
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
            <DutyItem duty={item} setDuties={setDuties} />
          </List.Item>
        )}
      />
    </>
  );
}
