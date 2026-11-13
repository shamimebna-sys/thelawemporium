"use client";
/**
 * Drag-and-drop image/PDF uploader + direct URL input for Admin CMS (Light theme).
 */
import { FileText, ImageIcon, Loader2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function MediaUploader({
  label,
  value,
  onChange,
  accept,
  placeholder = "https://... or /uploads/...",
  kind = "image",
}: {
  label: string;
  value: string;
  onChange: (nextUrl: string) => void;
  accept?: string;
  placeholder?: string;
  kind?: "image" | "file";
}) {
  const effectiveAccept =
    accept ??
    (kind === "image"
      ? "image/jpeg,image/png,image/webp,image/gif"
      : "application/pdf");
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function uploadFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        toast.error(data.error ?? "Upload failed");
        return;
      }
      onChange(data.url);
      toast.success("Asset uploaded successfully");
    } catch {
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="admin-label">{label}</label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const dropped = e.dataTransfer.files?.[0];
          if (dropped) void uploadFile(dropped);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex items-center gap-4 rounded-xl border border-dashed p-3.5 cursor-pointer transition-all ${
          dragging
            ? "border-[#c5a869] bg-amber-50/70"
            : "border-slate-300 bg-slate-50 hover:border-neutral-900 hover:bg-slate-100/70"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={effectiveAccept}
          className="hidden"
          onChange={(e) => {
            const picked = e.target.files?.[0];
            if (picked) void uploadFile(picked);
            e.target.value = "";
          }}
        />
        {kind === "image" && value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="Preview"
            className="h-14 w-14 rounded-lg object-cover border border-slate-200 shrink-0 bg-white"
          />
        ) : (
          <div className="h-12 w-12 rounded-lg bg-amber-50 border border-[#c5a869]/40 flex items-center justify-center text-[#b39149] shrink-0">
            {uploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : kind === "image" ? (
              <ImageIcon className="w-5 h-5" />
            ) : (
              <FileText className="w-5 h-5" />
            )}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
            <UploadCloud className="w-3.5 h-3.5 text-[#b39149]" />
            {uploading ? "Uploading asset..." : "Drop file here or click to upload"}
          </p>
          <p className="text-[11px] text-slate-500 truncate mt-0.5">
            {value ? value : kind === "image" ? "PNG, JPG, WEBP, GIF up to 10MB" : "PDF up to 10MB"}
          </p>
        </div>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="admin-input text-xs"
      />
    </div>
  );
}
