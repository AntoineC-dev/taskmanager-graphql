import * as React from "react";
import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";

test("Render the Start the Process button", () => {
  render(<HomePage />);
  const ctaButton = screen.getByRole("button");
  expect(ctaButton).toHaveTextContent(/start the process/i);
});
