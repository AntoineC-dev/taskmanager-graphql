import * as React from "react";
import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { BrowserRouter } from "react-router-dom";

test('The Homepage CTA button has text: "START THE PROCESS"', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  const button = screen.getByRole("button");
  expect(button).toHaveTextContent(/start the process/i);
});
