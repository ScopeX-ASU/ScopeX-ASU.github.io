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
2. Rename the folder to the new slug.
3. Update metadata in `project.js`.
4. Write the main content in `content.md`.
5. Add or replace files in `assets/`.
6. Add one summary entry to `js/projects-registry.js`.

This keeps each project's detailed content local, while the shared catalog stays lightweight.
