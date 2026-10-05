/**
 * Shim to ensure `fetch` on Window, Window.prototype, and globalThis has both getter and setter.
 * This prevents "Cannot set property fetch of #<Window> which has only a getter" errors
 * caused by sandbox iframes, devtools, or third-party polyfills attempting to reassign window.fetch.
 */
(function setupFetchShim() {
  if (typeof window === 'undefined') return;

  try {
    let activeFetch = typeof window.fetch === 'function' ? window.fetch.bind(window) : undefined;

    const descriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: true,
      get() {
        return activeFetch;
      },
      set(fn: typeof window.fetch) {
        activeFetch = fn;
      },
    };

    // 1. Prototype of Window
    if (typeof Window !== 'undefined' && Window.prototype) {
      try {
        Object.defineProperty(Window.prototype, 'fetch', descriptor);
      } catch {
        // Safe fallback
      }
    }

    // 2. Prototype of window instance
    try {
      const proto = Object.getPrototypeOf(window);
      if (proto && proto !== Object.prototype) {
        Object.defineProperty(proto, 'fetch', descriptor);
      }
    } catch {
      // Safe fallback
    }

    // 3. Directly on window object
    try {
      Object.defineProperty(window, 'fetch', descriptor);
    } catch {
      // Safe fallback
    }

    // 4. On globalThis if distinct
    if (typeof globalThis !== 'undefined' && globalThis !== window) {
      try {
        Object.defineProperty(globalThis, 'fetch', descriptor);
      } catch {
        // Safe fallback
      }
    }
  } catch {
    // Fail silently to never break application initialization
  }
})();
