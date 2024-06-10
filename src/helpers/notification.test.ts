import { describe, it, vi, expect, afterEach } from "vitest";
import { waitFor } from "@testing-library/dom";

import { notify } from "./notification.helpers";

describe("notify", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should create a notification if permission is granted", () => {
    const notificationMock = {
      addEventListener: vi.fn(),
    };
    const NotificationMock = vi.fn(() => notificationMock);
    NotificationMock.permission = "granted";
    vi.stubGlobal("Notification", NotificationMock);

    notify();

    expect(NotificationMock).toHaveBeenCalledTimes(1);
    expect(notificationMock.addEventListener).toHaveBeenCalledTimes(1);
  });

  it("should not create a notification if permission is not granted", () => {
    const NotificationMock = vi.fn();
    NotificationMock.permission = "denied";
    vi.stubGlobal("Notification", NotificationMock);

    notify();

    expect(NotificationMock).not.toHaveBeenCalled();
  });

  it("should play audio when notification is shown", () => {
    const audioMock = {
      play: vi.fn(() => Promise.resolve()),
    };
    const AudioMock = vi.fn(() => audioMock);
    vi.stubGlobal("Audio", AudioMock);

    const notificationMock = {
      addEventListener: vi.fn((event, callback) => {
        if (event === "show") {
          callback();
        }
      }),
    };
    const NotificationMock = vi.fn(() => notificationMock);
    NotificationMock.permission = "granted";
    vi.stubGlobal("Notification", NotificationMock);

    notify();

    expect(AudioMock).toHaveBeenCalledTimes(1);
    expect(audioMock.play).toHaveBeenCalledTimes(1);
  });

  it("should catch and log errors when playing audio", async () => {
    const audioMock = {
      play: vi.fn(() => Promise.reject("Error playing audio")),
    };
    const AudioMock = vi.fn(() => audioMock);
    vi.stubGlobal("Audio", AudioMock);

    const consoleMock = {
      error: vi.fn(() => void 0),
    };
    vi.stubGlobal("console", consoleMock);

    const notificationMock = {
      addEventListener: vi.fn((event, callback) => {
        if (event === "show") {
          callback();
        }
      }),
    };
    const NotificationMock = vi.fn(() => notificationMock);
    NotificationMock.permission = "granted";
    vi.stubGlobal("Notification", NotificationMock);

    notify();

    // Synchronous assertions
    expect(AudioMock).toHaveBeenCalledTimes(1);
    expect(notificationMock.addEventListener).toHaveBeenCalledTimes(1);
    expect(notificationMock.addEventListener).toHaveBeenCalledWith(
      "show",
      expect.any(Function)
    );

    // Asynchronous assertions
    await waitFor(() => {
      expect(consoleMock.error).toHaveBeenCalledTimes(1);
      expect(consoleMock.error).toHaveBeenCalledWith("Error playing audio");
    });
  });
});
