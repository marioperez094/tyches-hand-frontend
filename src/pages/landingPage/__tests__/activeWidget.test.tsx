import { describe, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ActiveWidget from "../activeWidget";

// ✅ Mock Child Components
vi.mock("../signUpWidget", () => ({
  default: () => <div data-testid="sign-up-widget">Sign Up Widget</div>,
}));
vi.mock("../loginWidget", () => ({
  default: () => <div data-testid="login-widget">Login Widget</div>,
}));

describe("ActiveWidget Component", () => {
  let mockSetSubmitting: (value: null | "Guest" | "Sign Up" | "Log In") => void;
  let mockSuccessfulLogin: Function;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSetSubmitting = vi.fn();
    mockSuccessfulLogin = vi.fn();
  });

  it("renders SignUpWidget when activeWidget is 'Sign Up'", () => {
    render(
      <ActiveWidget
        activeWidget="Sign Up"
        submitting={null}
        setSubmitting={mockSetSubmitting}
        successfulLogin={mockSuccessfulLogin}
      />
    );

    // ✅ Ensure Sign Up widget is rendered
    expect(screen.getByTestId("sign-up-widget")).toBeInTheDocument();
  });

  it("renders LoginWidget when activeWidget is 'Log In'", () => {
    render(
      <ActiveWidget
        activeWidget="Log In"
        submitting={null}
        setSubmitting={mockSetSubmitting}
        successfulLogin={mockSuccessfulLogin}
      />
    );

    // ✅ Ensure Login widget is rendered
    expect(screen.getByTestId("login-widget")).toBeInTheDocument();
  });

  it("renders nothing when activeWidget is 'Options'", () => {
    render(
      <ActiveWidget
        activeWidget="Options"
        submitting={null}
        setSubmitting={mockSetSubmitting}
        successfulLogin={mockSuccessfulLogin}
      />
    );

    // ✅ Ensure no widgets are rendered
    expect(screen.queryByTestId("sign-up-widget")).not.toBeInTheDocument();
    expect(screen.queryByTestId("login-widget")).not.toBeInTheDocument();
  });
});
