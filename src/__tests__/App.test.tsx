import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../App";

test("renders the app with heading", () => {
  render(
    <MemoryRouter> {/* ✅ Wrap with MemoryRouter */}
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Tyche's Hand/i)).toBeInTheDocument();
});
