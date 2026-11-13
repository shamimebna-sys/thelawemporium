from pathlib import Path
import re

css_path = Path(r"C:\Users\MUAZAI~1\AppData\Local\Temp\lawlab-app.css")
if not css_path.exists():
    raise SystemExit("css missing")
css = css_path.read_text(encoding="utf-8", errors="ignore")

# Split keeping media queries
keys = [
    "_compact-container_7epux2",
    "_wrapper_1ui0zd",
    "_number_apk159",
    "_title_apk159",
    "_excerpt_apk159",
    "_service_apk159",
    "_even_apk159",
    "_header_d6daxo",
    "_wrapper_d6daxo",
    "_nav_6ngn53",
    "_nav-container_6ngn53",
    "_brand_6ngn53",
    "_brand-logo_6ngn53",
    "_brand-name_6ngn53",
    "_service-list_apk159",
]

# Walk CSS, track current media
media_stack = ["(all)"]
i = 0
n = len(css)
results = {k: [] for k in keys}
while i < n:
    if css.startswith("@media", i):
        end = css.find("{", i)
        mq = css[i:end].strip()
        media_stack.append(mq)
        i = end + 1
        continue
    if css[i] == "{":
        media_stack.append(media_stack[-1] + " nested")
        i += 1
        continue
    if css[i] == "}":
        if len(media_stack) > 1:
            media_stack.pop()
        i += 1
        continue
    # selector block
    brace = css.find("{", i)
    if brace == -1:
        break
    # skip if this is @media already handled
    sel = css[i:brace]
    if "@" in sel:
        i = brace
        continue
    endb = css.find("}", brace)
    if endb == -1:
        break
    body = css[brace + 1 : endb]
    for k in keys:
        if k in sel:
            results[k].append((media_stack[-1], sel.strip()[:120], body[:300]))
    i = endb + 1

for k, items in results.items():
    print("\n====", k, "====")
    for mq, sel, body in items:
        print("MQ:", mq)
        print("SEL:", sel)
        print("BODY:", body)
        print("---")
