import { App } from "antd";
import { useEffect, useState } from "react";
import { getDuties } from "../api/api";
import { Duty } from "../types";

export default function useDuties() {
  const [duties, setDuties] = useState<Duty[]>([]);
  const { notification } = App.useApp();

  useEffect(() => {
    const fetchDuties = async () => {
      try {
        const items = await getDuties();
        setDuties(items);
      } catch (err) {
        if (err instanceof Error) {
          notification.error({
            message: "Error occurred",
            description: err.message,
          });
        }
      }
    };

    fetchDuties();
  }, [notification]);

  return {
    duties,
    setDuties,
  };
}
