import { describe, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../login";

// ✅ Mock useLoading
vi.mock("../../../context/loading", () => ({
  useLoading: vi.fn(() => ({
    startLoading: vi.fn(),
  })),
}));

// ✅ Mock API request function
vi.mock("../../../utils/fetchRequest", () => ({
  postRequest: vi.fn(() => Promise.resolve({ success: true, token: "fake-token" })),
}));

describe("Login Component", () => {
  let mockSetIsAuthenticated: (value: null | boolean) => void;
  let postRequest: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    mockSetIsAuthenticated = vi.fn();

    postRequest = (await import("../../../utils/fetchRequest")).postRequest;
  });

  it("renders login options and guest button", () => {
    render(<Login setIsAuthenticated={mockSetIsAuthenticated} />);

    // ✅ Check that user entry options are present
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();

    // ✅ Ensure Guest button is rendered
    expect(screen.getByRole("button", { name: /Guest/i })).toBeInTheDocument();
  });

  it("disables Guest button and shows loading text when clicked", async () => {
    render(<Login setIsAuthenticated={mockSetIsAuthenticated} />);

    const guestButton = screen.getByRole("button", { name: /Guest/i });

    // ✅ Click the Guest button
    fireEvent.click(guestButton);

    // ✅ Button should be disabled and show loading text
    await waitFor(() => {
      expect(guestButton).toBeDisabled();
      expect(guestButton).toHaveTextContent(/Creating Account/i);
    });
  });

  it("calls API and updates authentication on successful guest login", async () => {
    // ✅ Mock successful API response
    postRequest.mockResolvedValueOnce({ success: true, token: "fake-token" });

    render(<Login setIsAuthenticated={mockSetIsAuthenticated} />);

    const guestButton = screen.getByRole("button", { name: /Guest/i });
    fireEvent.click(guestButton);

    // ✅ Wait for API call to finish
    await waitFor(() => {
      expect(postRequest).toHaveBeenCalledWith(
        "/api/v1/players",
        { player: { is_guest: true } }
      );
    });

    // ✅ Ensure authentication state updates
    await waitFor(() => {
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
    });

    // ✅ Ensure guest button is not in loading state anymore
    expect(guestButton).toBeDisabled();
  });

  it("displays an error message if guest login fails", async () => {
    // ✅ Mock API failure
    postRequest.mockRejectedValueOnce(new Error("Guest login failed"));

    render(<Login setIsAuthenticated={mockSetIsAuthenticated} />);

    const guestButton = screen.getByRole("button", { name: /Guest/i });
    fireEvent.click(guestButton);

    // ✅ Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Guest login failed/i)).toBeInTheDocument();
    });

    // ✅ Ensure button is no longer in loading state
    expect(guestButton).not.toBeDisabled();
  });
});
