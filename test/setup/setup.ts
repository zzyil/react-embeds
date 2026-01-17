import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

class NoopObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}

if (!("ResizeObserver" in globalThis)) {
  // @ts-expect-error - test shim
  globalThis.ResizeObserver = NoopObserver;
}

if (!("IntersectionObserver" in globalThis)) {
  // @ts-expect-error - test shim
  globalThis.IntersectionObserver = NoopObserver;
}

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }));
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback) => window.setTimeout(callback, 0);
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (id) => window.clearTimeout(id);
}

if (!HTMLMediaElement.prototype.play) {
  HTMLMediaElement.prototype.play = () => Promise.resolve();
}

if (!HTMLMediaElement.prototype.pause) {
  HTMLMediaElement.prototype.pause = () => undefined;
}

if (!HTMLMediaElement.prototype.load) {
  HTMLMediaElement.prototype.load = () => undefined;
}
