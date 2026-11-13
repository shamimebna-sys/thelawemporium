"use client";
/**
 * Press & news coverage manager for /admin/media (Executive Light theme).
 */
import { Calendar, ExternalLink, Newspaper, Pencil, Plus, Trash2 } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { MediaUploader } from "@/components/admin/media-uploader";
import { AdminModal } from "@/components/admin/modal";
import { deleteMediaAction, upsertMediaAction } from "./actions";

export type MediaDto = {
  id: string;
  title: string;
  outletName: string;
  articleUrl: string;
  coverImage: string;
  publishedAt: string;
  excerpt: string;
  badge: string;
  order: number;
};

const BADGES = ["All", "Print", "Electronic", "Broadcast", "Press"] as const;

const emptyForm = (): MediaDto => ({
  id: "",
  title: "",
  outletName: "",
  articleUrl: "",
  coverImage: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  excerpt: "",
  badge: "Print",
  order: 0,
});

export function MediaManager({ initialItems }: { initialItems: MediaDto[] }) {
  const [badgeFilter, setBadgeFilter] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<MediaDto>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    if (badgeFilter === "All") return initialItems;
    return initialItems.filter((i) => i.badge === badgeFilter);
  }, [initialItems, badgeFilter]);

  function openNew() {
    setForm({ ...emptyForm(), order: initialItems.length });
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(item: MediaDto) {
    setForm(item);
    setErrors({});
    setModalOpen(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.title.trim()) nextErrors.title = "Article title is required";
    if (!form.outletName.trim()) nextErrors.outletName = "News outlet name is required";
    if (!form.excerpt.trim()) nextErrors.excerpt = "Short excerpt is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    startTransition(async () => {
      const res = await upsertMediaAction({
        ...form,
        id: form.id || undefined,
      });
      if (res.ok) {
        toast.success(form.id ? "Press item updated" : "Press item published");
        setModalOpen(false);
      } else {
        toast.error(res.error ?? "Save failed");
      }
    });
  }

  function handleDelete(item: MediaDto) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    startTransition(async () => {
      const res = await deleteMediaAction(item.id);
      if (res.ok) toast.success("Press item removed");
      else toast.error(res.error ?? "Delete failed");
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#b39149] font-bold">
            Press Room
          </p>
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
            Press & Media Coverage
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Manage print articles, television interviews, and chamber mentions synced to{" "}
            <code className="text-[#b39149] font-semibold">/media</code>
          </p>
        </div>
        <button type="button" onClick={openNew} className="admin-btn-primary">
          <Plus className="w-4 h-4" /> Add Press Item
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {BADGES.map((b) => {
          const active = badgeFilter === b;
          return (
            <button
              key={b}
              type="button"
              onClick={() => setBadgeFilter(b)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                active
                  ? "bg-neutral-900 text-white font-bold"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {b}
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-[#c5a869]/60 p-5 flex gap-4 transition-all"
          >
            <div className="w-24 h-24 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
              {item.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <Newspaper className="w-7 h-7 text-slate-400" />
              )}
            </div>

            <div className="min-w-0 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-[#9c7b35] border border-[#c5a869]/40">
                    {item.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-700">{item.outletName}</span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 ml-auto">
                    <Calendar className="w-3 h-3" /> {item.publishedAt}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mt-2 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.excerpt}</p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                {item.articleUrl ? (
                  <a
                    href={item.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Source Link
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-400">No external URL</span>
                )}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-neutral-900 hover:bg-slate-100 cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDelete(item)}
                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? "Edit Media Coverage" : "Add Media Coverage"}
        subtitle="Press outlet badge, publication date, thumbnail, and excerpt"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="admin-label">Article / Broadcast Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="A note on sitting hours in the daily press"
              className="admin-input"
            />
            {errors.title ? <p className="text-xs text-rose-600 mt-1">{errors.title}</p> : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="admin-label">Outlet Name *</label>
              <input
                value={form.outletName}
                onChange={(e) => setForm((f) => ({ ...f, outletName: e.target.value }))}
                placeholder="The Daily Star"
                className="admin-input"
              />
              {errors.outletName ? (
                <p className="text-xs text-rose-600 mt-1">{errors.outletName}</p>
              ) : null}
            </div>
            <div>
              <label className="admin-label">Outlet Badge</label>
              <select
                value={form.badge}
                onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                className="admin-input"
              >
                <option value="Print">Print</option>
                <option value="Electronic">Electronic</option>
                <option value="Broadcast">Broadcast</option>
                <option value="Press">Press</option>
              </select>
            </div>
            <div>
              <label className="admin-label">Published Date</label>
              <input
                type="date"
                value={form.publishedAt}
                onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
                className="admin-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Article Link</label>
              <input
                type="url"
                value={form.articleUrl}
                onChange={(e) => setForm((f) => ({ ...f, articleUrl: e.target.value }))}
                placeholder="https://..."
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Sort Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))}
                className="admin-input"
              />
            </div>
          </div>

          <MediaUploader
            label="Thumbnail Image"
            value={form.coverImage}
            onChange={(url) => setForm((f) => ({ ...f, coverImage: url }))}
          />

          <div>
            <label className="admin-label">Short Excerpt *</label>
            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              placeholder="Summary of the press appearance or legal commentary..."
              className="admin-input"
            />
            {errors.excerpt ? <p className="text-xs text-rose-600 mt-1">{errors.excerpt}</p> : null}
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
            <button type="button" onClick={() => setModalOpen(false)} className="admin-btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="admin-btn-primary">
              {isPending ? "Saving…" : form.id ? "Save Changes" : "Publish Press Item"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
