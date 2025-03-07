import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom"; // Añadir esto
import AlbumPage from "../components/AlbumPage";
import { imagePlaceholder } from "../../public/imagePlaceholder";
import { useDispatch, useSelector } from "react-redux";

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock("./AlbumSongsTable", () => ({
  default: () => <div>MockedAlbumSongsTable</div>,
}));

vi.mock("./GoBackButton", () => ({
  default: () => <div>MockedGoBackButton</div>,
}));

describe("AlbumPage Component", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useSelector).mockImplementation((selector) =>
      selector({
        albumDetails: {
          details: null,
        },
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        {" "}
        <AlbumPage />
      </MemoryRouter>
    );
  };

  test("renderiza el botón de retroceso", () => {
    renderComponent();
    expect(screen.getByTestId("go-back-button")).toBeInTheDocument();
  });

  test("muestra imagen de placeholder cuando no hay datos", () => {
    renderComponent();
    const imgs = screen.getAllByRole("img");
    expect(imgs[0]).toHaveAttribute("src", imagePlaceholder);
  });

  test("renderiza secciones principales sin datos", () => {
    renderComponent();

    expect(screen.getAllByRole("heading", { level: 1 })[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Release Date:/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Total songs:/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText("Total Duration: 00:00")[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Artists:/i)[0]).toBeInTheDocument();
  });

  test("renderiza tabla de canciones vacía", () => {
    renderComponent();
    expect(screen.getAllByRole("table", { name: "" })[0]).toBeInTheDocument();
  });
});
