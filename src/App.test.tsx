import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "./pages/Home";

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useLazyQuery: jest.fn(),
}));

test("renders Home component", async () => {
  const mockUseLazyQuery = jest.fn();
  mockUseLazyQuery.mockReturnValue([
    mockUseLazyQuery,
    { loading: true, data: null, error: null },
  ]);
  require("@apollo/client").useLazyQuery = mockUseLazyQuery;

  render(<Home />);

  await waitFor(() => {
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
