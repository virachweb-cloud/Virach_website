import * as React from "react";

const MOBILE_BREAKPOINT = 768; // You can adjust this if needed

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false; // default for SSR (Next.js, etc.)
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // ✅ Initial check
    setIsMobile(mql.matches);

    // ✅ Add listener
    mql.addEventListener("change", onChange);

    // ✅ Cleanup
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
