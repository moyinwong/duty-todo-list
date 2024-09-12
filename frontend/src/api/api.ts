import { Duty } from "../types";

const DUTIES_ENDPOINT = `${process.env.REACT_APP_BACKEND_URL}/duties`;

export async function getDuties(): Promise<Duty[]> {
  const res = await fetch(DUTIES_ENDPOINT);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
}

export async function addDuty(dutyText: string): Promise<Duty> {
  const res = await fetch(DUTIES_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dutyText }),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
}

export async function updateDuty(id: string, dutyText: string): Promise<Duty> {
  const res = await fetch(`${DUTIES_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dutyText,
    }),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
}
