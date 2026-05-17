#!/usr/bin/env python3

from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
PROJECTS_DIR = ROOT / "projects"
SCRIPT_PATTERN = re.compile(
    r'(<script type="text/plain" data-project-markdown-source>\s*)(.*?)(\s*</script>)',
    re.DOTALL,
)


def sync_project(project_dir: Path) -> bool:
    index_path = project_dir / "index.html"
    content_path = project_dir / "content.md"

    if not index_path.exists() or not content_path.exists():
        return False

    html = index_path.read_text(encoding="utf-8")
    markdown = content_path.read_text(encoding="utf-8").rstrip()
    replacement = (
        '<script type="text/plain" data-project-markdown-source>\n'
        f"{markdown}\n"
        "</script>"
    )

    if SCRIPT_PATTERN.search(html):
        updated = SCRIPT_PATTERN.sub(replacement, html, count=1)
    else:
        if "</body>" not in html:
            raise RuntimeError(f"Missing </body> in {index_path}")
        updated = html.replace("</body>", replacement + "\n</body>", 1)

    if updated != html:
        index_path.write_text(updated, encoding="utf-8")
        return True

    return False


def main() -> int:
    changed = []

    for project_dir in sorted(PROJECTS_DIR.iterdir()):
        if not project_dir.is_dir():
            continue
        if sync_project(project_dir):
            changed.append(project_dir.name)

    if changed:
        print("Synced embedded markdown for:")
        for name in changed:
            print(f"- {name}")
    else:
        print("No project pages needed updating.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
