import { render, screen } from "@testing-library/react";
import DutyList from "../components/DutyList";
import { Duty } from "../types";

describe("DutyList component", () => {
  test("should render a list of duties", () => {
    const duties: Duty[] = [
      { id: 1, name: "Duty 1" },
      { id: 2, name: "Duty 2" },
    ];

    const handleUpdateDuty = jest.fn();
    const handleDeletDuty = jest.fn();
    render(
      <DutyList
        duties={duties}
        handleUpdateDuty={handleUpdateDuty}
        handleDeleteDuty={handleDeletDuty}
      />
    );

    expect(screen.getByText("Duty 1")).toBeInTheDocument();
    expect(screen.getByText("Duty 2")).toBeInTheDocument();
  });
});
