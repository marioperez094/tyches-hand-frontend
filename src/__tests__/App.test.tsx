import { describe, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../App";

// ✅ Mock authentication API
vi.mock("../utils/fetchRequest", () => ({
  getRequest: vi.fn(), // No default return value, will be set per test
}));

// ✅ Mock useLoading context
vi.mock("../context/loading", () => ({
  useLoading: vi.fn(() => ({
    showLoading: false, // Change in test when needed
    startLoading: vi.fn(),
  })),
}));

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows the logo first, then LandingPage options when unauthenticated", async () => {
    const { getRequest } = await import("../utils/fetchRequest");
    getRequest.mockResolvedValueOnce({ authenticated: false });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    console.log("🔍 Mocked authentication response:", await getRequest());

    expect(screen.getByText("Tyche's Hand")).toBeInTheDocument();

    // ✅ Wait for authentication delay
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    });

    // ✅ Log the updated DOM after authentication check
    await waitFor(() => {
      console.log("✅ DOM after authentication check:");
      console.log(screen.debug());
    });

    // ✅ Ensure the user entry options appear
    await waitFor(() => {
      expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
      expect(screen.getByText(/Log In/i)).toBeInTheDocument();
      expect(screen.getByText(/Guest/i)).toBeInTheDocument();
    });
  });

  it("shows the logo first, then LoadingScreen when authenticated", async () => {
    const { getRequest } = await import("../utils/fetchRequest");
    getRequest.mockResolvedValueOnce({ authenticated: true });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    console.log("🔍 Mocked authentication response:", await getRequest());

    expect(screen.getByText("Tyche's Hand")).toBeInTheDocument();

    // ✅ Wait for authentication delay
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    });

    // ✅ Log the updated DOM after authentication check
    await waitFor(() => {
      console.log("✅ DOM after authentication check:");
      console.log(screen.debug());
    });

    // ✅ Ensure the loading screen appears
    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });
});
