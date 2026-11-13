"use client";
/**
 * Executive Light & Gold Services Manager with inline case drawer + modals.
 */
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FolderOpen,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { AdminModal } from "@/components/admin/modal";
import {
  removeServiceAction,
  removeServiceCaseAction,
  saveServiceCaseModalAction,
  saveServiceModalAction,
} from "./actions";

export type ServiceCaseDto = {
  id: string;
  serviceId: string;
  caseNumber: number;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  newsLink: string;
  order: number;
};

export type ServiceDto = {
  id: string;
  slug: string;
  category: string;
  indexNumber: number;
  titleEn: string;
  titleBn: string;
  excerptEn: string;
  excerptBn: string;
  bodyEn: string;
  bodyBn: string;
  order: number;
  cases: ServiceCaseDto[];
};

const CATEGORIES = [
  "all",
  "criminal",
  "constitutional",
  "civil",
  "family",
  "company",
  "pro-bono",
] as const;

const emptyService = (): Omit<ServiceDto, "cases"> => ({
  id: "",
  slug: "",
  category: "criminal",
  indexNumber: 1,
  titleEn: "",
  titleBn: "",
  excerptEn: "",
  excerptBn: "",
  bodyEn: "<p></p>",
  bodyBn: "<p></p>",
  order: 0,
});

const emptyCase = (serviceId: string, nextNum: number): ServiceCaseDto => ({
  id: "",
  serviceId,
  caseNumber: nextNum,
  titleEn: "",
  titleBn: "",
  descriptionEn: "",
  descriptionBn: "",
  newsLink: "",
  order: nextNum - 1,
});

export function ServicesManager({ initialServices }: { initialServices: ServiceDto[] }) {
  const [catFilter, setCatFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState<Omit<ServiceDto, "cases">>(emptyService);
  const [caseModalOpen, setCaseModalOpen] = useState(false);
  const [caseForm, setCaseForm] = useState<ServiceCaseDto>(() => emptyCase("", 1));
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    if (catFilter === "all") return initialServices;
    return initialServices.filter((s) => s.category === catFilter);
  }, [initialServices, catFilter]);

  function openNewService() {
    setServiceForm({ ...emptyService(), order: initialServices.length });
    setServiceModalOpen(true);
  }

  function openEditService(svc: ServiceDto) {
    setServiceForm({
      id: svc.id,
      slug: svc.slug,
      category: svc.category,
      indexNumber: svc.indexNumber,
      titleEn: svc.titleEn,
      titleBn: svc.titleBn,
      excerptEn: svc.excerptEn,
      excerptBn: svc.excerptBn,
      bodyEn: svc.bodyEn,
      bodyBn: svc.bodyBn,
      order: svc.order,
    });
    setServiceModalOpen(true);
  }

  function openNewCase(svc: ServiceDto) {
    setCaseForm(emptyCase(svc.id, svc.cases.length + 1));
    setCaseModalOpen(true);
  }

  function openEditCase(c: ServiceCaseDto) {
    setCaseForm(c);
    setCaseModalOpen(true);
  }

  function submitService(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveServiceModalAction({
        ...serviceForm,
        id: serviceForm.id || undefined,
      });
      if (res.ok) {
        toast.success(serviceForm.id ? "Service updated" : "Service created");
        setServiceModalOpen(false);
      } else {
        toast.error(res.error ?? "Failed to save service");
      }
    });
  }

  function deleteService(svc: ServiceDto) {
    if (!window.confirm(`Delete "${svc.titleEn}" and its ${svc.cases.length} cases?`)) return;
    startTransition(async () => {
      const res = await removeServiceAction(svc.id);
      if (res.ok) toast.success("Service deleted");
      else toast.error(res.error ?? "Delete failed");
    });
  }

  function submitCase(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveServiceCaseModalAction({
        ...caseForm,
        id: caseForm.id || undefined,
      });
      if (res.ok) {
        toast.success(caseForm.id ? "Case updated" : "Case added to service");
        setCaseModalOpen(false);
      } else {
        toast.error(res.error ?? "Failed to save case");
      }
    });
  }

  function deleteCase(c: ServiceCaseDto) {
    if (!window.confirm(`Delete case "${c.titleEn}"?`)) return;
    startTransition(async () => {
      const res = await removeServiceCaseAction(c.id, c.serviceId);
      if (res.ok) toast.success("Case removed");
      else toast.error(res.error ?? "Failed to delete case");
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#b39149] font-bold">
            Practice Areas
          </p>
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
            Services & Sub-Cases
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Click any service row to expand its inline case drawer or edit details in place
          </p>
        </div>
        <button type="button" onClick={openNewService} className="admin-btn-primary">
          <Plus className="w-4 h-4" /> New Service
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {CATEGORIES.map((cat) => {
          const active = catFilter === cat;
          const count =
            cat === "all"
              ? initialServices.length
              : initialServices.filter((s) => s.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCatFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer flex items-center gap-1.5 ${
                active
                  ? "bg-neutral-900 text-white font-bold"
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

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.map((svc) => {
          const isOpen = expandedId === svc.id;
          return (
            <div
              key={svc.id}
              className={`rounded-xl bg-white border shadow-sm transition-colors overflow-hidden ${
                isOpen ? "border-[#c5a869]" : "border-slate-200/80 hover:border-slate-300"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? null : svc.id)}
                  className="flex items-center gap-4 flex-1 min-w-0 text-left cursor-pointer"
                >
                  <span className="text-slate-400">
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-[#b39149]" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </span>
                  <span className="text-xs font-black text-[#b39149] w-6 shrink-0">
                    {String(svc.indexNumber).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-neutral-900 truncate">
                        {svc.titleEn}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        {svc.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      /{svc.slug} • {svc.cases.length} case{svc.cases.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-2 shrink-0 pl-8 sm:pl-0">
                  <button
                    type="button"
                    onClick={() => openNewCase(svc)}
                    className="admin-btn-secondary py-1.5 px-3 text-[11px]"
                  >
                    <Plus className="w-3 h-3 text-[#b39149]" /> Case
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditService(svc)}
                    className="admin-btn-secondary py-1.5 px-3 text-[11px]"
                  >
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => deleteService(svc)}
                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 cursor-pointer"
                    title="Delete service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Inline Accordion Drawer for Sub-Cases */}
              {isOpen ? (
                <div className="border-t border-slate-200 bg-slate-50/90 px-6 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <FolderOpen className="w-3.5 h-3.5 text-[#b39149]" /> Sub-Cases ({svc.cases.length})
                    </p>
                    <button
                      type="button"
                      onClick={() => openNewCase(svc)}
                      className="text-xs font-bold text-[#9c7b35] hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Case to {svc.titleEn}
                    </button>
                  </div>

                  {svc.cases.length === 0 ? (
                    <p className="text-xs text-slate-500 py-2">
                      No cases recorded for this service yet.
                    </p>
                  ) : (
                    <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
                      {svc.cases.map((c) => (
                        <div
                          key={c.id}
                          className="flex items-start justify-between gap-4 px-4 py-3"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <span className="text-xs font-bold text-[#b39149] mt-0.5">
                              {String(c.caseNumber).padStart(2, "0")}.
                            </span>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-neutral-900">{c.titleEn}</p>
                              <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                                {c.descriptionEn}
                              </p>
                              {c.newsLink ? (
                                <a
                                  href={c.newsLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline mt-1"
                                >
                                  <ExternalLink className="w-3 h-3" /> News Link
                                </a>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => openEditCase(c)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-neutral-900 hover:bg-slate-100 cursor-pointer"
                              title="Edit case"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() => deleteCase(c)}
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
                              title="Delete case"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Service Modal */}
      <AdminModal
        open={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        title={serviceForm.id ? `Edit Service: ${serviceForm.titleEn}` : "Create Service"}
        subtitle="Bilingual service overview synced directly to /services/[slug]"
        maxWidth="max-w-3xl"
      >
        <form onSubmit={submitService} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Slug (URL ID) *</label>
              <input
                value={serviceForm.slug}
                onChange={(e) => setServiceForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder="death-sentence"
                className="admin-input font-mono text-xs"
                required
              />
            </div>
            <div>
              <label className="admin-label">Category</label>
              <select
                value={serviceForm.category}
                onChange={(e) => setServiceForm((f) => ({ ...f, category: e.target.value }))}
                className="admin-input"
              >
                {CATEGORIES.filter((c) => c !== "all").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Index Number</label>
              <input
                type="number"
                value={serviceForm.indexNumber}
                onChange={(e) =>
                  setServiceForm((f) => ({ ...f, indexNumber: Number(e.target.value) || 1 }))
                }
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Sort Order</label>
              <input
                type="number"
                value={serviceForm.order}
                onChange={(e) =>
                  setServiceForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))
                }
                className="admin-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Title (English) *</label>
              <input
                value={serviceForm.titleEn}
                onChange={(e) => setServiceForm((f) => ({ ...f, titleEn: e.target.value }))}
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">Title (Bangla)</label>
              <input
                value={serviceForm.titleBn}
                onChange={(e) => setServiceForm((f) => ({ ...f, titleBn: e.target.value }))}
                className="admin-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Excerpt (English)</label>
              <textarea
                rows={2}
                value={serviceForm.excerptEn}
                onChange={(e) => setServiceForm((f) => ({ ...f, excerptEn: e.target.value }))}
                className="admin-input text-xs"
              />
            </div>
            <div>
              <label className="admin-label">Excerpt (Bangla)</label>
              <textarea
                rows={2}
                value={serviceForm.excerptBn}
                onChange={(e) => setServiceForm((f) => ({ ...f, excerptBn: e.target.value }))}
                className="admin-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Body HTML (English)</label>
            <textarea
              rows={5}
              value={serviceForm.bodyEn}
              onChange={(e) => setServiceForm((f) => ({ ...f, bodyEn: e.target.value }))}
              className="admin-input font-mono text-xs"
            />
          </div>

          <div>
            <label className="admin-label">Body HTML (Bangla)</label>
            <textarea
              rows={4}
              value={serviceForm.bodyBn}
              onChange={(e) => setServiceForm((f) => ({ ...f, bodyBn: e.target.value }))}
              className="admin-input font-mono text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setServiceModalOpen(false)}
              className="admin-btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="admin-btn-primary">
              {isPending ? "Saving…" : serviceForm.id ? "Save Service" : "Create Service"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Case Modal */}
      <AdminModal
        open={caseModalOpen}
        onClose={() => setCaseModalOpen(false)}
        title={caseForm.id ? "Edit Case Entry" : "Add Case Entry"}
        subtitle="Notable judgment or docket note displayed under the service page"
      >
        <form onSubmit={submitCase} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Case Number</label>
              <input
                type="number"
                value={caseForm.caseNumber}
                onChange={(e) =>
                  setCaseForm((f) => ({ ...f, caseNumber: Number(e.target.value) || 1 }))
                }
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Sort Order</label>
              <input
                type="number"
                value={caseForm.order}
                onChange={(e) =>
                  setCaseForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))
                }
                className="admin-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Case Title (English) *</label>
              <input
                value={caseForm.titleEn}
                onChange={(e) => setCaseForm((f) => ({ ...f, titleEn: e.target.value }))}
                placeholder="State versus Abdul Gafur, 73 DLR 198"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">Case Title (Bangla)</label>
              <input
                value={caseForm.titleBn}
                onChange={(e) => setCaseForm((f) => ({ ...f, titleBn: e.target.value }))}
                className="admin-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Outcome / Summary (English) *</label>
              <textarea
                rows={3}
                value={caseForm.descriptionEn}
                onChange={(e) => setCaseForm((f) => ({ ...f, descriptionEn: e.target.value }))}
                className="admin-input text-xs"
                required
              />
            </div>
            <div>
              <label className="admin-label">Outcome / Summary (Bangla)</label>
              <textarea
                rows={3}
                value={caseForm.descriptionBn}
                onChange={(e) => setCaseForm((f) => ({ ...f, descriptionBn: e.target.value }))}
                className="admin-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="admin-label">News Link (Optional)</label>
            <input
              type="url"
              value={caseForm.newsLink}
              onChange={(e) => setCaseForm((f) => ({ ...f, newsLink: e.target.value }))}
              placeholder="https://..."
              className="admin-input"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setCaseModalOpen(false)}
              className="admin-btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="admin-btn-primary">
              {isPending ? "Saving…" : caseForm.id ? "Save Case" : "Add Case"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
