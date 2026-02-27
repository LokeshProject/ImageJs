import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders the gallery title", () => {
  render(<App />);
  expect(screen.getAllByText(/madhu/i).length).toBeGreaterThan(0);
});

test("opens the lightbox when a card is clicked and closes on ESC", async () => {
  const user = userEvent.setup();
  render(<App />);

  const firstCard = screen.getByRole("button", { name: /memory 1/i });
  await user.click(firstCard);

  expect(screen.getByRole("dialog", { name: /image viewer/i })).toBeInTheDocument();
  expect(screen.getByText(/image 1 of 6/i)).toBeInTheDocument();

  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog", { name: /image viewer/i })).not.toBeInTheDocument();
});

test("navigates images with arrow keys", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: /memory 1/i }));
  expect(screen.getByText(/image 1 of 6/i)).toBeInTheDocument();

  await user.keyboard("{ArrowRight}");
  expect(screen.getByText(/image 2 of 6/i)).toBeInTheDocument();

  await user.keyboard("{ArrowLeft}");
  expect(screen.getByText(/image 1 of 6/i)).toBeInTheDocument();
});
