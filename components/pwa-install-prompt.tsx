"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}

const STORAGE_KEY = "pwa-install-dismissed";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) return;

    const dismissed = localStorage.getItem(STORAGE_KEY);

    if (dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();

      setDeferredPrompt(e as BeforeInstallPromptEvent);

      setTimeout(() => {
        setShowInstall(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      console.log("PWA installed");
    }

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "true");

    setShowInstall(false);
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl bg-black p-4 text-white shadow-2xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold">Tải ứng dụng</p>

          <p className="text-sm opacity-80">
            Cài app vào điện thoại để dùng nhanh hơn
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClose}
            className="rounded-lg border border-white/20 px-3 py-2 text-sm"
          >
            Để sau
          </button>

          <button
            onClick={handleInstall}
            className="rounded-lg bg-white px-4 py-2 font-medium text-black"
          >
            Cài đặt
          </button>
        </div>
      </div>
    </div>
  );
}