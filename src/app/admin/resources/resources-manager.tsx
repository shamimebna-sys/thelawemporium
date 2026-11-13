"use client";
/**
 * Legal publications / articles / research / stories / precedents editor (/admin/resources) (Light theme).
 */
import { BookOpen, Clock, Eye, FileText, Pencil, Plus, Trash2, User } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { MediaUploader } from "@/components/admin/media-uploader";
import { AdminModal } from "@/components/admin/modal";
import { deleteResourceAction, upsertResourceAction } from "./actions";

export type ResourceDto = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  fileUrl: string;
  content: string;
  readTime: string;
  order: number;
};

const CATEGORIES = ["All", "Research", "Story", "Precedent", "Publication"] as const;

const emptyForm = (): ResourceDto => ({
  id: "",
  title: "",
  slug: "",
  category: "Research",
  author: "The Law Emporium",
  fileUrl: "",
  content: "<p></p>",
  readTime: "5 min read",
  order: 0,
});

function toSlug(val: string) {
  return val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ResourcesManager({ initialItems }: { initialItems: ResourceDto[] }) {
  const [catFilter, setCatFilter] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [form, setForm] = useState<ResourceDto>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    if (catFilter === "All") return initialItems;
    return initialItems.filter((i) => i.category === catFilter);
  }, [initialItems, catFilter]);

  function openNew() {
    setForm({ ...emptyForm(), order: initialItems.length });
    setPreviewMode(false);
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(item: ResourceDto) {
    setForm(item);
    setPreviewMode(false);
    setErrors({});
    setModalOpen(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.title.trim()) nextErrors.title = "Title is required";
    if (!form.slug.trim()) nextErrors.slug = "Slug is required";
    if (!form.content.trim()) nextErrors.content = "Article content is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    startTransition(async () => {
      const res = await upsertResourceAction({
        ...form,
        id: form.id || undefined,
      });
      if (res.ok) {
        toast.success(form.id ? "Resource updated" : "Resource published");
        setModalOpen(false);
      } else {
        toast.error(res.error ?? "Save failed");
      }
    });
  }

  function handleDelete(item: ResourceDto) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    startTransition(async () => {
      const res = await deleteResourceAction(item.id);
      if (res.ok) toast.success("Resource deleted");
      else toast.error(res.error ?? "Delete failed");
    });
  }

  function insertSnippet(snippet: string) {
    setForm((f) => ({ ...f, content: `${f.content}\n${snippet}`.trim() }));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#b39149] font-bold">
            Publications & Notes
          </p>
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
            Legal Resources Editor
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Author research papers, chamber stories, and annotated precedents synced to{" "}
            <code className="text-[#b39149] font-semibold">/resources</code>
          </p>
        </div>
        <button type="button" onClick={openNew} className="admin-btn-primary">
          <Plus className="w-4 h-4" /> New Resource
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {CATEGORIES.map((cat) => {
          const active = catFilter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCatFilter(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                active
                  ? "bg-neutral-900 text-white font-bold"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Resources Table */}
      <div className="rounded-xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-sm text-slate-500 p-8 text-center">No resources in this category.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-[#9c7b35] border border-[#c5a869]/40">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-600 flex items-center gap-1">
                      <User className="w-3 h-3 text-[#b39149]" /> {item.author}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.readTime}
                    </span>
                    {item.fileUrl ? (
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" /> PDF
                      </a>
                    ) : null}
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mt-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">/{item.slug}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="admin-btn-secondary py-1.5 px-3 text-[11px]"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDelete(item)}
                    className="p-2 rounded-lg text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? "Edit Legal Resource" : "Create Legal Resource"}
        subtitle="HTML / Markdown publication body with optional downloadable PDF attachment"
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Title *</label>
              <input
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({
                    ...f,
                    title,
                    slug: f.id ? f.slug : toSlug(title),
                  }));
                }}
                placeholder="Anticipatory bail: a working note"
                className="admin-input"
              />
              {errors.title ? <p className="text-xs text-rose-600 mt-1">{errors.title}</p> : null}
            </div>
            <div>
              <label className="admin-label">URL Slug *</label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: toSlug(e.target.value) }))}
                placeholder="anticipatory-bail-note"
                className="admin-input font-mono text-xs"
              />
              {errors.slug ? <p className="text-xs text-rose-600 mt-1">{errors.slug}</p> : null}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="admin-label">Category Badge</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="admin-input"
              >
                <option value="Research">Research</option>
                <option value="Story">Story</option>
                <option value="Precedent">Precedent</option>
                <option value="Publication">Publication</option>
              </select>
            </div>
            <div>
              <label className="admin-label">Author</label>
              <input
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Read Time</label>
              <input
                value={form.readTime}
                onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
                placeholder="5 min read"
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))}
                className="admin-input"
              />
            </div>
          </div>

          <MediaUploader
            label="PDF Attachment Link (Optional)"
            value={form.fileUrl}
            onChange={(url) => setForm((f) => ({ ...f, fileUrl: url }))}
            accept=".pdf"
            kind="file"
            placeholder="https://... or /uploads/brief.pdf"
          />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="admin-label mb-0">Article Content (HTML / Rich Text) *</label>
              <div className="flex items-center gap-1.5">
                {!previewMode ? (
                  <>
                    <button
                      type="button"
                      onClick={() => insertSnippet("<h3>Section Heading</h3>")}
                      className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer"
                    >
                      + H3
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet("<p>New paragraph...</p>")}
                      className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer"
                    >
                      + P
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet("<blockquote>Legal citation quote</blockquote>")}
                      className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer"
                    >
                      + Quote
                    </button>
                  </>
                ) : null}
                <button
                  type="button"
                  onClick={() => setPreviewMode((p) => !p)}
                  className="px-2.5 py-0.5 rounded bg-amber-50 border border-[#c5a869]/40 text-[10px] font-bold text-[#9c7b35] flex items-center gap-1 cursor-pointer"
                >
                  {previewMode ? (
                    <>
                      <BookOpen className="w-3 h-3" /> Edit Source
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3" /> Live Preview
                    </>
                  )}
                </button>
              </div>
            </div>

            {previewMode ? (
              <div
                className="min-h-[200px] rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-800 leading-relaxed [&>p]:mb-3 [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-neutral-900 [&>h3]:mb-2 [&>blockquote]:border-l-2 [&>blockquote]:border-[#c5a869] [&>blockquote]:pl-3 [&>blockquote]:italic"
                dangerouslySetInnerHTML={{ __html: form.content }}
              />
            ) : (
              <textarea
                rows={8}
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                className="admin-input font-mono text-xs"
              />
            )}
            {errors.content ? <p className="text-xs text-rose-600 mt-1">{errors.content}</p> : null}
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
            <button type="button" onClick={() => setModalOpen(false)} className="admin-btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="admin-btn-primary">
              {isPending ? "Saving…" : form.id ? "Save Changes" : "Publish Resource"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
