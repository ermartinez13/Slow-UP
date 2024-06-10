import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { StartTime } from "./StartTime";

const formattedTime = "some formatted time";

vi.mock("../../helpers", () => ({
  formatDateTime: () => formattedTime,
}));

describe("StartTime component", () => {
  it("renders -- when session has not started", () => {
    render(<StartTime startTimestamp={-1} />);
    expect(screen.getByText("Started at: --")).toBeInTheDocument();
  });

  it("renders the start time when session has started", () => {
    const timestamp = 1643723400; // some timestamp
    render(<StartTime startTimestamp={timestamp} />);
    expect(
      screen.getByText(`Started at: ${formattedTime}`)
    ).toBeInTheDocument();
  });
});
