"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Info, Loader2, X } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  okLabel?: string;
  loading?: boolean;
  error?: string | null;
  destructive?: boolean;
  onConfirm?: () => void;
  onClose: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  okLabel = "OK",
  loading = false,
  error = null,
  destructive = true,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, loading, onClose]);

  if (!open) {
    return null;
  }

  const Icon = destructive ? AlertTriangle : Info;

  return createPortal(
    <div
      className="
        animate-fade
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        p-4
        backdrop-blur-sm
      "
      onClick={() => !loading && onClose()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          animate-pop
          relative
          w-full
          max-w-sm
          rounded-3xl
          bg-white
          p-8
          text-center
          shadow-2xl

          dark:bg-gray-800
        "
      >
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          aria-label="Close"
          className="
            absolute
            right-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            text-zinc-400
            transition
            hover:bg-zinc-100
            hover:text-zinc-600
            disabled:opacity-50

            dark:hover:bg-white/10
            dark:hover:text-zinc-200
          "
        >
          <X size={18} />
        </button>

        <div
          className={`
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            ${
              destructive
                ? "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400"
                : "bg-[#F1E194]/40 text-zinc-900"
            }
          `}
        >
          <Icon size={32} />
        </div>

        <h3
          className="
            mt-4
            text-xl
            font-black
            text-gray-900

            dark:text-white
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-gray-500

            dark:text-gray-300
          "
        >
          {message}
        </p>

        {error && (
          <p
            className="
              mt-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-2
              text-sm
              font-medium
              text-red-600

              dark:border-red-500/30
              dark:bg-red-500/10
              dark:text-red-400
            "
          >
            {error}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          {onConfirm ? (
            <>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-zinc-200
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-zinc-600
                  transition
                  hover:bg-zinc-50
                  disabled:opacity-50

                  dark:border-white/10
                  dark:text-zinc-300
                  dark:hover:bg-white/5
                "
              >
                {cancelLabel}
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={`
                  flex-1
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  transition
                  hover:brightness-110
                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  ${
                    destructive
                      ? "bg-red-500 shadow-red-500/25"
                      : "bg-[#5B8E14] shadow-[#5B8E14]/25"
                  }
                `}
              >
                {loading && (
                  <Loader2 size={16} className="animate-spin" />
                )}

                {confirmLabel}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="
                w-full
                rounded-xl
                bg-[#5B8E14]
                px-4
                py-3
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-[#5B8E14]/25
                transition
                hover:brightness-110
              "
            >
              {okLabel}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
