import { render, screen } from "@testing-library/react";
import { vi } from "vitest"; // Use Vitest's vi instead of Jest
import "@testing-library/jest-dom/vitest"; // Use Vitest-compatible jest-dom
import Logo from "../logo";

describe("Logo Component", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {}); // Mock console.log
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Restore console.log after tests
  });

  test("renders the logo component without crashing", () => {
    render(<Logo />);
    
    const logoElement = screen.getByRole("heading", { name: /tyche's hand/i });
    expect(logoElement).toBeInTheDocument();
  });

  test("displays the correct title", () => {
    render(<Logo />);
    
    const title = screen.getByText(/tyche's hand/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("title-text");
  });

  test("displays all four suit symbols", () => {
    render(<Logo />);
    
    const suits = ["♥", "♦", "♣", "♠"];
    suits.forEach((suit) => {
      expect(screen.getByText(suit)).toBeInTheDocument();
    });
  });

  test("has the correct container structure", () => {
    render(<Logo />);
    
    const header = screen.getByRole("banner"); // `header` is a landmark role
    expect(header).toHaveAttribute("id", "logo");

    const borderContainer = screen.getByTestId("border-container");
    expect(borderContainer).toBeInTheDocument();
  });
});
