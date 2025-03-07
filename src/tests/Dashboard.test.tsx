import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../app/search/searchSlice";
import topArtistsReducer from "../app/topArtists/topArtistsSlice";

vi.mock("./SearchBar", () => ({
  default: () => <div data-testid="search-bar" />,
}));

vi.mock("./TopArtists", () => ({
  default: () => <div data-testid="top-artists" />,
}));

vi.mock("./SearchResults", () => ({
  default: () => <div data-testid="search-results" />,
}));

describe("Dashboard Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders main components without search results", () => {
    const mockStore = configureStore({
      reducer: {
        search: searchReducer,
        topArtists: topArtistsReducer,
      },
      preloadedState: {
        search: {
          searchResults: {},
          searchValue: "",
        },
        topArtists: {
          artists: {},
        },
      },
    });

    render(
      <Provider store={mockStore}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("top-artists")).toBeInTheDocument();
    expect(screen.queryByTestId("search-results")).not.toBeInTheDocument();
  });

  test("shows search results when available", () => {
    const mockStore = configureStore({
      reducer: {
        search: searchReducer,
        topArtists: topArtistsReducer,
      },
      preloadedState: {
        search: {
          searchResults: { tracks: { items: [] } },
          searchValue: "",
        },
        topArtists: {
          artists: {},
        },
      },
    });

    render(
      <Provider store={mockStore}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByTestId("search-results")).toBeInTheDocument();
  });

  test("has correct layout structure", () => {
    const mockStore = configureStore({
      reducer: {
        search: searchReducer,
        topArtists: topArtistsReducer,
      },
    });

    const { container } = render(
      <Provider store={mockStore}>
        <Dashboard />
      </Provider>
    );

    const mainBox = container.firstChild;
    expect(mainBox).toHaveStyle({
      display: "flex",
      flexDirection: "column",
      width: "100vw",
      padding: "16px 40px 40px 40px",
    });
  });
});
