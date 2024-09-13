import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MyApp from "../App";
import { addDuty, getDuties } from "../api/api";

jest.mock("../api/api");

describe("MyApp component", () => {
  test("should render input and add a duty", async () => {
    (addDuty as jest.Mock).mockResolvedValue({
      id: 1,
      name: "New Duty",
    });

    (getDuties as jest.Mock).mockResolvedValue([]);

    render(<MyApp />);

    const input = screen.getByLabelText(/add duty/i);
    fireEvent.change(input, { target: { value: "New Duty" } });

    const addButton = screen.getByRole("button");
    await userEvent.click(addButton);

    expect(screen.getByText("New Duty")).toBeInTheDocument();
  });
});
