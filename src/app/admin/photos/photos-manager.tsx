"use client";
/**
 * Visual card grid + category tabs + featured toggle + drag-and-drop uploader modal for /admin/photos (Light theme).
 */
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { MediaUploader } from "@/components/admin/media-uploader";
import { AdminModal } from "@/components/admin/modal";
import {
  deleteGalleryItemAction,
  toggleGalleryFeaturedAction,
  upsertGalleryItemAction,
} from "./actions";

export type GalleryItemDto = {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  order: number;
};

const CATEGORIES = ["All", "Court", "Events", "Office"] as const;

const emptyForm = (): GalleryItemDto => ({
  id: "",
  title: "",
  caption: "",
  imageUrl: "",
  category: "Court",
  featured: false,
  order: 0,
});

export function PhotosManager({ initialItems }: { initialItems: GalleryItemDto[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<GalleryItemDto>(emptyForm);
  const [errors, setErrors] = useState<{ title?: string; imageUrl?: string }>({});
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    if (activeCategory === "All") return initialItems;
    return initialItems.filter((item) => item.category === activeCategory);
  }, [initialItems, activeCategory]);

  function openNew() {
    setForm({ ...emptyForm(), order: initialItems.length });
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(item: GalleryItemDto) {
    setForm(item);
    setErrors({});
    setModalOpen(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: { title?: string; imageUrl?: string } = {};
    if (!form.title.trim()) nextErrors.title = "Title is required";
    if (!form.imageUrl.trim()) nextErrors.imageUrl = "Upload an image or paste an image URL";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    startTransition(async () => {
      const res = await upsertGalleryItemAction({
        id: form.id || undefined,
        title: form.title,
        caption: form.caption,
        imageUrl: form.imageUrl,
        category: form.category,
        featured: form.featured,
        order: form.order,
      });
      if (res.ok) {
        toast.success(form.id ? "Photo updated" : "Photo added to gallery");
        setModalOpen(false);
      } else {
        toast.error(res.error ?? "Save failed");
      }
    });
  }

  function handleToggleFeatured(item: GalleryItemDto) {
    startTransition(async () => {
      const res = await toggleGalleryFeaturedAction(item.id, !item.featured);
      if (res.ok) {
        toast.success(!item.featured ? "Marked as featured" : "Removed from featured");
      } else {
        toast.error(res.error ?? "Failed to toggle featured");
      }
    });
  }

  function handleDelete(item: GalleryItemDto) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    startTransition(async () => {
      const res = await deleteGalleryItemAction(item.id);
      if (res.ok) toast.success("Photo deleted");
      else toast.error(res.error ?? "Delete failed");
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#b39149] font-bold">
            Visual Archive
          </p>
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
            Photo Gallery Manager
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Upload court, event, and office photography synced to{" "}
            <code className="text-[#b39149] font-semibold">/photos</code>
          </p>
        </div>
        <button type="button" onClick={openNew} className="admin-btn-primary">
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {CATEGORIES.map((cat) => {
          const count =
            cat === "All"
              ? initialItems.length
              : initialItems.filter((i) => i.category === cat).length;
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                active
                  ? "bg-neutral-900 text-white font-bold shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 rounded-full ${
                  active ? "bg-[#c5a869] text-neutral-950 font-bold" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Card Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl bg-white border border-slate-200/80 shadow-sm p-12 text-center">
          <p className="text-sm text-slate-500">No photos in this category yet.</p>
          <button type="button" onClick={openNew} className="admin-btn-primary mt-4">
            <Plus className="w-4 h-4" /> Upload First Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group rounded-xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#c5a869]/60 overflow-hidden transition-all flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-900/85 text-white">
                    {item.category}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleToggleFeatured(item)}
                  title={item.featured ? "Remove featured" : "Mark featured"}
                  className={`absolute top-3 right-3 p-1.5 rounded-full border transition-colors cursor-pointer ${
                    item.featured
                      ? "bg-[#c5a869] text-neutral-950 border-[#c5a869] shadow-xs"
                      : "bg-white/90 text-slate-500 border-slate-200 hover:text-[#b39149]"
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${item.featured ? "fill-current" : ""}`} />
                </button>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 line-clamp-1">{item.title}</h3>
                  {item.caption ? (
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.caption}</p>
                  ) : null}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400">Order #{item.order}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEdit(item)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-neutral-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Edit photo"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDelete(item)}
                      className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal */}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? "Edit Photo Asset" : "Add Photo Asset"}
        subtitle="Upload an image or provide an image URL for the gallery"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <MediaUploader
            label="Photo Asset *"
            value={form.imageUrl}
            onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
          />
          {errors.imageUrl ? <p className="text-xs text-rose-600">{errors.imageUrl}</p> : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Supreme Court Annex Briefing"
                className="admin-input"
              />
              {errors.title ? <p className="text-xs text-rose-600 mt-1">{errors.title}</p> : null}
            </div>
            <div>
              <label className="admin-label">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="admin-input"
              >
                <option value="Court">Court</option>
                <option value="Events">Events</option>
                <option value="Office">Office</option>
              </select>
            </div>
          </div>

          <div>
            <label className="admin-label">Caption</label>
            <textarea
              rows={3}
              value={form.caption}
              onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
              placeholder="Brief description of the scene..."
              className="admin-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <label className="admin-label">Sort Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))}
                className="admin-input"
              />
            </div>
            <label className="flex items-center gap-2.5 pt-5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="h-4 w-4 accent-[#c5a869] rounded"
              />
              <span className="text-sm font-medium text-slate-700">Featured showcase</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
            <button type="button" onClick={() => setModalOpen(false)} className="admin-btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="admin-btn-primary">
              {isPending ? "Saving…" : form.id ? "Save Changes" : "Add Photo"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
