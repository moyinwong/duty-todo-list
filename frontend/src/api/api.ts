import { Duty } from "../types";

const DUTIES_ENDPOINT = `${process.env.REACT_APP_BACKEND_URL}/duties`;

export async function getDuties(): Promise<Duty[]> {
  const res = await fetch(DUTIES_ENDPOINT);
  return res.json();
}

export async function addDuty(dutyText: string): Promise<Duty> {
  const res = await fetch(DUTIES_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dutyText),
  });
  return res.json();
}

export async function updateDuty(
  id: string,
  updateDutyText: string
): Promise<Duty> {
  const body = {
    dutyText: updateDutyText,
  };
  const res = await fetch(`${DUTIES_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
}
