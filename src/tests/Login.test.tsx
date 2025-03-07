import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginComponent from "../components/Login";

describe("LoginComponent", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders login title and button", () => {
    render(<LoginComponent />);

    const title = screen.getByText("Login to Spotify");
    expect(title).toBeInTheDocument();

    const buttons = screen.getAllByRole("button", { name: "Login" });
    expect(buttons[0]).toBeInTheDocument();
  });

  test("clicking login button triggers fetch request", async () => {
    const mockFetch = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      text: vi.fn().mockResolvedValueOnce("https://spotify-auth.com"),
    } as any);

    render(<LoginComponent />);
    const buttons = screen.getAllByRole("button", { name: "Login" });
    fireEvent.click(buttons[0]);

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:8080/auth/spotify",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "media-type": "text/plain",
        },
      }
    );
  });

  test("redirects to the returned URL after successful login", async () => {
    const mockUrl = "https://spotify-auth.com";
    const originalLocation = window.location;

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      text: vi.fn().mockResolvedValueOnce(mockUrl),
    } as any);

    Object.defineProperty(window, "location", {
      value: { href: "" },
      writable: true,
    });

    render(<LoginComponent />);
    const buttons = screen.getAllByRole("button", { name: "Login" });
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(window.location.href).toBe(mockUrl);
    });

    Object.defineProperty(window, "location", originalLocation);
  });
});
