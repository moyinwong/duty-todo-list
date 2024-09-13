// import {http, HttpResponse} from 'msw'
// import {setupServer} from 'msw/node'
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DutyInput from "../components/DutyInput";

test("loads and displays greeting", async () => {
  render(<DutyInput handleAddDuty={() => {}} />);

  expect(screen.getByRole("button")).toHaveTextContent("Add duty");
});
