import { useEffect, useState } from "react";
import { getDuties } from "../api/api";
import { Duty } from "../types";

export default function useDuties() {
  const [duties, setDuties] = useState<Duty[]>([]);

  useEffect(() => {
    const fetchDuties = async () => {
      const items = await getDuties();
      setDuties(items);
    };

    fetchDuties();
  }, []);

  return {
    duties,
    setDuties,
  };
}
