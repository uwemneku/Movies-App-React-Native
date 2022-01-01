import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

it("renders App Screen Correctly", () => {
  const { getAllByText } = render(<App />);
  expect(getAllByText("Book Details").length).toBeFalsy();
});
