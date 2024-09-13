import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DutyItem from "../components/DutyItem";
import * as api from "../api/api";

describe("DutyItem component", () => {
  const duty = { id: 1, name: "Initial Duty" };
  const setDuties = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should allow users to edit and update a duty through clicking update button", async () => {
    const updateSpy = jest.spyOn(api, "updateDuty").mockRejectedValueOnce({
      ...duty,
      name: "Something Duty",
    });
    render(<DutyItem duty={duty} setDuties={setDuties} />);

    const editButton = screen.getByLabelText("edit");
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText(/add duty/i);
    fireEvent.change(input, { target: { value: "Something Duty" } });

    const updateButton = screen.getByText(/update/i);
    await userEvent.click(updateButton);

    expect(updateSpy).toHaveBeenCalledWith(duty.id, "Something Duty");
  });

  test("should allow users to edit and update a duty through enter key", async () => {
    const updateSpy = jest.spyOn(api, "updateDuty").mockRejectedValueOnce({
      ...duty,
      name: "Updated Duty",
    });
    render(<DutyItem duty={duty} setDuties={setDuties} />);

    const editButton = screen.getByLabelText("edit");
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText(/add duty/i);
    fireEvent.change(input, { target: { value: "Updated Duty" } });

    await userEvent.keyboard("[Enter]");

    expect(updateSpy).toHaveBeenCalledWith(duty.id, "Updated Duty");
  });

  test("should not update duty if user don't press enter or click update button", async () => {
    const updateSpy = jest.spyOn(api, "updateDuty").mockRejectedValueOnce({
      ...duty,
      name: "Updated Duty",
    });
    render(<DutyItem duty={duty} setDuties={setDuties} />);

    const editButton = screen.getByLabelText("edit");
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText(/add duty/i);
    fireEvent.change(input, { target: { value: "Updated Duty" } });

    expect(updateSpy).not.toHaveBeenCalled();
  });

  test("should not allow to update duty when click update button if updated input is empty", async () => {
    render(<DutyItem duty={duty} setDuties={setDuties} />);

    const editButton = screen.getByLabelText("edit");
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText(/add duty/i);
    await fireEvent.change(input, { target: { value: "" } });

    const updateButton = screen.getByText(/update/i);
    await userEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText("Duty cannot be empty")).toBeInTheDocument();
    });
  });

  test("should not allow to update duty when pressing enter if updated input is empty", async () => {
    render(<DutyItem duty={duty} setDuties={setDuties} />);

    const editButton = screen.getByLabelText("edit");
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText(/add duty/i);
    await fireEvent.change(input, { target: { value: "" } });
    await userEvent.keyboard("[Enter]");

    await waitFor(() => {
      expect(screen.getByText("Duty cannot be empty")).toBeInTheDocument();
    });
  });
});
