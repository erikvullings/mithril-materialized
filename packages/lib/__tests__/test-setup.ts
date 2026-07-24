import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Preserve the current tests' Jest mock syntax while running them with Vitest.
(globalThis as typeof globalThis & { jest: typeof vi }).jest = vi;
