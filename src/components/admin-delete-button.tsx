"use client";
/**
 * Client-side delete button with browser confirmation dialog.
 */
export function AdminDeleteButton({
  confirmMessage,
  label = "Delete",
  className = "text-xs text-red-500 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer",
}: {
  confirmMessage: string;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {label}
    </button>
  );
}
