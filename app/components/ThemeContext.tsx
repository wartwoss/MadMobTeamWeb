"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "brutalistic" | "modern";

export const THEME_STORAGE_KEY = "mmt-theme";

/* useLayoutEffect warns during SSR — pick the isomorphic variant once so the
   hook order stays stable in every environment. */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function readTheme(): Theme {
  if (typeof window === "undefined") return "brutalistic";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "modern" || stored === "brutalistic") return stored;
  } catch {
    /* localStorage unavailable (private mode, blocked cookies, ...) */
  }
  /* Fall back to whatever the pre-paint inline script resolved. */
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "modern" ? "modern" : "brutalistic";
}

type ThemeContextValue = {
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "brutalistic",
  mounted: false,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  /* The server always renders the default theme; the stored value is applied
     in a layout effect (before paint) so hydration output matches the SSR
     HTML and the user never sees the wrong theme flash by. */
  const [theme, setThemeState] = useState<Theme>("brutalistic");
  const [mounted, setMounted] = useState(false);

  useIsoLayoutEffect(() => {
    const resolved = readTheme();
    /* Re-apply after React's dev-mode Strict remount clears <html> attributes
       the inline script had set. No-op in production. */
    document.documentElement.setAttribute("data-theme", resolved);
    setThemeState(resolved);
    setMounted(true);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* ignore write failures */
    }
  }, []);

  const value = useMemo(
    () => ({ theme, mounted, setTheme }),
    [theme, mounted, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {/* Until hydration resolves the stored theme, cover the server-rendered
          default tree with a splash tinted by the pre-paint data-theme. */}
      {!mounted && (
        <div
          aria-hidden
          data-theme-boot
          className="fixed inset-0 z-[400]"
          style={{ background: "var(--theme-boot-bg)" }}
        />
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
