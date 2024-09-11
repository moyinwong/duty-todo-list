import { List } from "antd";
import { Duty } from "../types";
import DutyItem from "./DutyItem";
import "../styles/DutyList.css";

type Props = {
  duties: Duty[];
};
export default function DutyList({ duties }: Props) {
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
            <DutyItem duty={item} />
          </List.Item>
        )}
      />
    </>
  );
}
