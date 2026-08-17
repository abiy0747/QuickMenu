"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      return;
    }

    function onLoad() {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "QuickMenu service worker registered:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error(
            "QuickMenu service worker registration failed:",
            error
          );
        });
    }

    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return null;
}