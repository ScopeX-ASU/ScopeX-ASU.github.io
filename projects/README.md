# Projects Structure

Each project lives in its own folder:

`projects/<slug>/`

Recommended contents:

- `index.html`: the project page shell
- `project.js`: project metadata and links
- `content.md`: the main page body written in Markdown
- `assets/`: figures, cover image, videos, supplementary media

The catalog page is:

- `projects/index.html`

The catalog reads summary entries from:

- `js/projects-registry.js`

To add a new project:

1. Copy an existing folder such as `projects/lidar-2-0/`.
2. Rename the folder to `projects/NEW-PROJ-NAME/`. Your `NEW-PROJ-NAME` is the `slug`.
3. Update metadata in `projects/NEW-PROJ-NAME/project.js`.
4. Write the main content in the markdown file `projects/NEW-PROJ-NAME/content.md`.
5. Add or replace files in `projects/NEW-PROJ-NAME/assets/`.
6. register the project entry in the registry `js/projects-registry.js`.

For direct local `file://` preview, each project `index.html` contains an embedded Markdown fallback.
Do not edit that embedded block by hand. It is generated from `content.md`.
