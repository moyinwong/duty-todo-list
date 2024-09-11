import { Duty } from "../types";

const duties = [
  { id: "1", name: "Something to Do" },
  { id: "2", name: "Go exercise" },
  { id: "3", name: "Prepare for work" },
  { id: "4", name: "Take care brother" },
  { id: "5", name: "Play game" },
  { id: "6", name: "Watch Netflix" },
];
export function getDuties(): Duty[] {
  return duties;
}

export function addDuty(dutyText: string) {
  duties.push({
    id: (Number(duties[duties.length - 1]) + 1).toString(),
    name: dutyText,
  });
}

export function updateDuty(id: string, updateDuty: string) {
  const duty = duties.find((d) => d.id == id);
  if (duty) {
    duty.name = updateDuty;
  } else {
    console.error("No duty found");
  }
}
