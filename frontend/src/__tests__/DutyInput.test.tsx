import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DutyInput from "../components/DutyInput";

describe("DutyInput component", () => {
  test("should allow users to add a duty", async () => {
    const handleAddDuty = jest.fn();
    render(<DutyInput handleAddDuty={handleAddDuty} />);

    const input = screen.getByPlaceholderText(/add duty/i);
    const addButton = screen.getByRole("button", { name: /add duty/i });

    await fireEvent.change(input, { target: { value: "Test Duty" } });
    await userEvent.click(addButton);

    expect(handleAddDuty).toHaveBeenCalledWith("Test Duty");
  });

  test("should not allow users to add a duty, if input is empty", async () => {
    const handleAddDuty = jest.fn();
    render(<DutyInput handleAddDuty={handleAddDuty} />);

    const input = screen.getByPlaceholderText(/add duty/i);
    const addButton = screen.getByRole("button", { name: /add duty/i });

    await fireEvent.change(input, { target: { value: "" } });
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Duty cannot be empty")).toBeInTheDocument();
    });
  });
});
