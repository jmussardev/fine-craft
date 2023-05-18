import { useCallback, useLayoutEffect, useRef } from "react";

export default function useScrollLock() {
  const scrollOffset = useRef<number>();
  function isiOS() {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  const lockScroll = useCallback(() => {
    const headerEl: HTMLElement | null = document.querySelector(".header");
    if (headerEl) headerEl.dataset.scrollLock = "true";

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "var(--scrollbar-compensation)";

    if (isiOS()) {
      scrollOffset.current = window.pageYOffset;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollOffset.current}px`;
      document.body.style.width = "100%";
    }
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    if (isiOS() && scrollOffset.current) {
      document.body.style.position = "";
      document.body.style.top = ``;
      document.body.style.width = "";
      window.scrollTo(0, scrollOffset.current);
    }

    const headerEl: HTMLElement | null = document.querySelector(".header");
    if (headerEl) delete headerEl.dataset.scrollLock;
  }, []);

  useLayoutEffect(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.setProperty(
      "--scrollbar-compensation",
      `${scrollBarCompensation}px`
    );
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
}
//
