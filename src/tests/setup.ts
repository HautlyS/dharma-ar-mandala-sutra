import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mocked-url');
global.URL.revokeObjectURL = vi.fn();

// Mock fetch
global.fetch = vi.fn();

// Mock performance
global.performance = {
  ...global.performance,
  now: vi.fn(() => Date.now()),
  memory: {
    usedJSHeapSize: 1000000,
    totalJSHeapSize: 2000000,
    jsHeapSizeLimit: 4000000,
  },
};

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 16));
global.cancelAnimationFrame = vi.fn(id => clearTimeout(id));

// Mock model-viewer custom element
class MockModelViewer extends HTMLElement {
  src = '';
  alt = '';
  cameraControls = false;
  autoRotate = false;
  
  constructor() {
    super();
  }
  
  addEventListener(event: string, handler: EventListener) {
    super.addEventListener(event, handler);
    
    // Simulate load event after a short delay
    if (event === 'load') {
      setTimeout(() => {
        handler(new CustomEvent('load'));
      }, 100);
    }
  }
}

// Register the mock custom element
if (!customElements.get('model-viewer')) {
  customElements.define('model-viewer', MockModelViewer);
}

// Mock console methods for cleaner test output
global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Setup test environment variables
process.env.NODE_ENV = 'test';
process.env.VITE_APP_VERSION = '2.1.0';

// Mock window.location
delete (window as any).location;
window.location = {
  ...window.location,
  href: 'http://localhost:3000',
  origin: 'http://localhost:3000',
  pathname: '/',
  search: '',
  hash: '',
  reload: vi.fn(),
  assign: vi.fn(),
  replace: vi.fn(),
};

// Mock navigator
Object.defineProperty(navigator, 'userAgent', {
  writable: true,
  value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
});

// Mock crypto for UUID generation
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: vi.fn(() => 'mock-uuid-1234-5678-9012'),
    getRandomValues: vi.fn((arr: any) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    }),
  },
});

// Global test utilities
export const mockCharacter = {
  id: 1,
  name: 'Test Character',
  liberacao: 'Test Liberation',
  description: 'Test description',
  occupation: 'Test Occupation',
  significance: 'Test Significance',
  location: 'Test Location',
  summary: 'Test summary',
  chapterFile: 'test.pdf',
  qrUrl: 'https://test.com',
  modelUrl: 'https://test.com/model.glb',
  glbStatus: true,
  teaching: 'Test teaching',
  locationDescription: 'Test location description',
  category: 'buddha' as const,
  difficulty: 'beginner' as const,
  keywords: ['test', 'mock'],
  relatedCharacters: [2, 3],
  historicalPeriod: 'Test Period',
  culturalContext: 'Test Context',
  practiceType: ['meditation'],
  symbolism: ['lotus'],
  mantra: 'Om Test Mantra',
  mudra: 'Test Mudra',
  color: 'Gold',
  element: 'Earth',
  direction: 'Center',
  season: 'All',
  timeOfDay: 'Dawn',
  offerings: ['flowers'],
  benefits: ['peace'],
  warnings: ['dedication required'],
  prerequisites: ['open mind'],
  furtherReading: ['Test Sutra']
};

export const createMockEvent = (type: string, data: any = {}) => {
  return new CustomEvent(type, { detail: data });
};

export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockFetch = (response: any, ok = true) => {
  (global.fetch as any).mockResolvedValueOnce({
    ok,
    json: async () => response,
    blob: async () => new Blob([JSON.stringify(response)]),
    text: async () => JSON.stringify(response),
  });
};

export const mockLocalStorage = (data: Record<string, string> = {}) => {
  localStorageMock.getItem.mockImplementation((key: string) => data[key] || null);
  localStorageMock.setItem.mockImplementation((key: string, value: string) => {
    data[key] = value;
  });
  localStorageMock.removeItem.mockImplementation((key: string) => {
    delete data[key];
  });
  localStorageMock.clear.mockImplementation(() => {
    Object.keys(data).forEach(key => delete data[key]);
  });
};

// Cleanup function for tests
export const cleanup = () => {
  vi.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
};
