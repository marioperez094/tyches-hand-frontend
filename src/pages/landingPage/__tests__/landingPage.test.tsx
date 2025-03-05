import { describe, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import LandingPage from "../landingPage";
// ✅ Mock `checkAuthentication()` function
const mockCheckAuthentication = vi.fn();

// ✅ Mock useLoading context
vi.mock("../../../context/loading", () => ({
  useLoading: vi.fn(() => ({
    showLoading: false, // Change in test when needed
    startLoading: vi.fn(),
  })),
}));

describe("LandingPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls checkAuthentication on mount", () => {
    render(
      <LandingPage
        isAuthenticated={null}
        setIsAuthenticated={vi.fn()}
        checkAuthentication={mockCheckAuthentication}
      />
    );

    expect(mockCheckAuthentication).toHaveBeenCalled();
  });

  it("renders only the logo when authentication is pending (null)", () => {
    render(
      <LandingPage
        isAuthenticated={null}
        setIsAuthenticated={vi.fn()}
        checkAuthentication={mockCheckAuthentication}
      />
    );

    // ✅ Ensure only the logo is rendered
    expect(screen.getByText("Tyche's Hand")).toBeInTheDocument();

    // ❌ Login options should NOT be rendered
    expect(screen.queryByText(/Sign Up/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Log In/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Guest/i)).not.toBeInTheDocument();
  });

  it("shows login options when authentication is false", async () => {
    render(
      <LandingPage
        isAuthenticated={false}
        setIsAuthenticated={vi.fn()}
        checkAuthentication={mockCheckAuthentication}
      />
    );

    // ✅ Ensure the logo is present
    expect(screen.getByText("Tyche's Hand")).toBeInTheDocument();

    // ✅ Wait for the login options to appear
    await waitFor(() => {
      expect(screen.queryByText(/Sign Up/i)).toBeInTheDocument();
      expect(screen.queryByText(/Log In/i)).toBeInTheDocument();
      expect(screen.queryByText(/Guest/i)).toBeInTheDocument();
    });
  });

  it("does not show login options when authentication is true", async () => {
    render(
      <LandingPage
        isAuthenticated={true}
        setIsAuthenticated={vi.fn()}
        checkAuthentication={mockCheckAuthentication}
      />
    );

    // ✅ Ensure the logo is still present
    expect(screen.getByText("Tyche's Hand")).toBeInTheDocument();

    // ❌ Login options should NOT appear
    expect(screen.queryByText(/Sign Up/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Log In/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Guest/i)).not.toBeInTheDocument();
  });
});
