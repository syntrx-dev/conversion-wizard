import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// jsdom does not implement URL.createObjectURL / revokeObjectURL.
// Provide deterministic mocks so object-URL lifecycle logic can be tested.
if (typeof URL.createObjectURL !== 'function') {
  let counter = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (URL as any).createObjectURL = vi.fn(() => `blob:mock/${++counter}`);
}
if (typeof URL.revokeObjectURL !== 'function') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (URL as any).revokeObjectURL = vi.fn();
}
