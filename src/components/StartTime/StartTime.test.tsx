import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import React from "react";

import { StartTime } from "./StartTime";

const formattedTime = "some formatted time";

vi.mock("@/helpers/time.helpers", () => ({
  dateTimeToString: () => formattedTime,
}));

describe("StartTime component", () => {
  it("renders -- when session has not started", () => {
    render(<StartTime startTimestamp={-1} />);
    expect(screen.getByText("Started at:")).toBeInTheDocument();
    expect(screen.getByText("--")).toBeInTheDocument();
  });

  it("renders the start time when session has started", () => {
    const timestamp = 1643723400; // some timestamp
    render(<StartTime startTimestamp={timestamp} />);
    expect(
      screen.getByText(`Started at: ${formattedTime}`)
    ).toBeInTheDocument();
  });
});
