"use client";
/**
 * Advocate & Partner profile management for /admin/we (Executive Light theme).
 */
import { Award, Mail, Pencil, Phone, Plus, Trash2, UserCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { MediaUploader } from "@/components/admin/media-uploader";
import { AdminModal } from "@/components/admin/modal";
import { deleteAdvocateAction, upsertAdvocateAction } from "./actions";

export type AdvocateDto = {
  id: string;
  name: string;
  designation: string;
  credentials: string;
  bio: string;
  imageUrl: string;
  barCouncilId: string;
  email: string;
  phone: string;
  order: number;
};

const emptyForm = (): AdvocateDto => ({
  id: "",
  name: "",
  designation: "Senior Counsel",
  credentials: "LL.B. (Hons.), LL.M. • Advocate, Supreme Court of Bangladesh",
  bio: "<p></p>",
  imageUrl: "",
  barCouncilId: "",
  email: "",
  phone: "",
  order: 0,
});

export function WeManager({ initialItems }: { initialItems: AdvocateDto[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<AdvocateDto>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  function openNew() {
    setForm({ ...emptyForm(), order: initialItems.length });
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(item: AdvocateDto) {
    setForm(item);
    setErrors({});
    setModalOpen(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Advocate name is required";
    if (!form.designation.trim()) nextErrors.designation = "Designation is required";
    if (!form.bio.trim()) nextErrors.bio = "Bio is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    startTransition(async () => {
      const res = await upsertAdvocateAction({
        ...form,
        id: form.id || undefined,
      });
      if (res.ok) {
        toast.success(form.id ? "Profile updated" : "Advocate profile added");
        setModalOpen(false);
      } else {
        toast.error(res.error ?? "Save failed");
      }
    });
  }

  function handleDelete(item: AdvocateDto) {
    if (!window.confirm(`Remove "${item.name}" from team profiles?`)) return;
    startTransition(async () => {
      const res = await deleteAdvocateAction(item.id);
      if (res.ok) toast.success("Advocate profile removed");
      else toast.error(res.error ?? "Delete failed");
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#b39149] font-bold">
            Chambers Counsel
          </p>
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
            We / Advocate Profiles
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Manage partners, counsels, Bar Council IDs, and legal bios synced to{" "}
            <code className="text-[#b39149] font-semibold">/we</code> &{" "}
            <code className="text-[#b39149] font-semibold">/team</code>
          </p>
        </div>
        <button type="button" onClick={openNew} className="admin-btn-primary">
          <Plus className="w-4 h-4" /> Add Advocate
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {initialItems.map((adv) => (
          <article
            key={adv.id}
            className="rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-[#c5a869]/60 p-5 flex flex-col justify-between gap-4 transition-all"
          >
            <div>
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-2xl bg-slate-100 border border-slate-200 shrink-0 overflow-hidden">
                  {adv.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={adv.imageUrl} alt={adv.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-neutral-900 flex items-center justify-center text-[#c5a869] font-bold text-lg">
                      {adv.name
                        .split(" ")
                        .slice(0, 2)
                        .map((s) => s[0])
                        .join("")}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-[#9c7b35] border border-[#c5a869]/40">
                    {adv.designation}
                  </span>
                  <h3 className="text-base font-bold text-neutral-900 mt-1.5 truncate">{adv.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{adv.credentials}</p>
                </div>
              </div>

              <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                {adv.barCouncilId ? (
                  <p className="flex items-center gap-2 text-[#9c7b35] font-semibold">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>Bar Council ID: {adv.barCouncilId}</span>
                  </p>
                ) : null}
                {adv.email ? (
                  <p className="flex items-center gap-2 text-slate-600 truncate">
                    <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span>{adv.email}</span>
                  </p>
                ) : null}
                {adv.phone ? (
                  <p className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span>{adv.phone}</span>
                  </p>
                ) : null}
              </div>

              <div
                className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: adv.bio }}
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> Order #{adv.order}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => openEdit(adv)}
                  className="admin-btn-secondary py-1 px-2.5 text-[11px]"
                >
                  <Pencil className="w-3 h-3" /> Edit
                </button>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleDelete(adv)}
                  className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? "Edit Advocate Profile" : "Add Advocate Profile"}
        subtitle="Counsel portrait, designation, Bar Council membership, and legal bio"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <MediaUploader
            label="Profile Portrait"
            value={form.imageUrl}
            onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Full Name *</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Nabila Karim"
                className="admin-input"
              />
              {errors.name ? <p className="text-xs text-rose-600 mt-1">{errors.name}</p> : null}
            </div>
            <div>
              <label className="admin-label">Designation *</label>
              <input
                value={form.designation}
                onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
                placeholder="Head of Chambers"
                className="admin-input"
              />
              {errors.designation ? (
                <p className="text-xs text-rose-600 mt-1">{errors.designation}</p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Credentials & Court</label>
              <input
                value={form.credentials}
                onChange={(e) => setForm((f) => ({ ...f, credentials: e.target.value }))}
                placeholder="LL.B. (Hons.), LL.M. • Supreme Court"
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Bar Council Membership ID</label>
              <input
                value={form.barCouncilId}
                onChange={(e) => setForm((f) => ({ ...f, barCouncilId: e.target.value }))}
                placeholder="BD-SC-1042"
                className="admin-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="admin-label">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="counsel@thelawemporium.com"
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+880 1700-000001"
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

          <div>
            <label className="admin-label">Detailed Legal Bio (HTML supported) *</label>
            <textarea
              rows={5}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              placeholder="<p>Practice history, notable appellate work, and legal focus...</p>"
              className="admin-input font-mono text-xs"
            />
            {errors.bio ? <p className="text-xs text-rose-600 mt-1">{errors.bio}</p> : null}
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
            <button type="button" onClick={() => setModalOpen(false)} className="admin-btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="admin-btn-primary">
              {isPending ? "Saving…" : form.id ? "Save Profile" : "Add Advocate"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
