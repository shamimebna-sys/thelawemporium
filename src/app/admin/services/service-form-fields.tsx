/**
 * Shared form fields for creating/editing a Service in Admin CMS.
 */
const CATEGORIES = ["criminal", "constitutional", "civil", "family", "company", "pro-bono"];

export function ServiceFormFields({
  defaults,
}: {
  defaults?: Record<string, string | number>;
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Field
          name="slug"
          label="Slug (ID)"
          placeholder="death-sentence"
          defaultValue={String(defaults?.slug ?? "")}
        />
        <div>
          <label className="admin-label">Category</label>
          <select
            name="category"
            defaultValue={String(defaults?.category ?? "criminal")}
            className="admin-input"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field
          name="indexNumber"
          label="Index Number"
          placeholder="1"
          type="number"
          defaultValue={String(defaults?.indexNumber ?? "1")}
        />
        <Field
          name="order"
          label="Sort Order"
          placeholder="0"
          type="number"
          defaultValue={String(defaults?.order ?? "0")}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field
          name="titleEn"
          label="Title (English)"
          placeholder="Death Sentence"
          defaultValue={String(defaults?.titleEn ?? "")}
        />
        <Field
          name="titleBn"
          label="Title (Bangla)"
          placeholder="মৃত্যুদণ্ড"
          defaultValue={String(defaults?.titleBn ?? "")}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextareaField
          name="excerptEn"
          label="Excerpt (English)"
          defaultValue={String(defaults?.excerptEn ?? "")}
        />
        <TextareaField
          name="excerptBn"
          label="Excerpt (Bangla)"
          defaultValue={String(defaults?.excerptBn ?? "")}
        />
      </div>
      <TextareaField
        name="bodyEn"
        label="Body HTML (English)"
        rows={8}
        defaultValue={String(defaults?.bodyEn ?? "")}
      />
      <TextareaField
        name="bodyBn"
        label="Body HTML (Bangla)"
        rows={8}
        defaultValue={String(defaults?.bodyBn ?? "")}
      />
    </>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  defaultValue = "",
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="admin-input"
        required
      />
    </div>
  );
}

function TextareaField({
  name,
  label,
  rows = 3,
  defaultValue = "",
}: {
  name: string;
  label: string;
  rows?: number;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="admin-input font-mono text-xs"
      />
    </div>
  );
}
