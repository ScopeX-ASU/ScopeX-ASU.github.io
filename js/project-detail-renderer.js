(function () {
  var root = document.getElementById("project-detail-page");
  var project = window.scopexProjectPage;

  if (!root || !project) {
    return;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderLinkedPeople(people) {
    return (people || [])
      .map(function (person) {
        if (person.url) {
          return '<a href="' + escapeHtml(person.url) + '">' + escapeHtml(person.name) + "</a>";
        }

        return "<span>" + escapeHtml(person.name) + "</span>";
      })
      .join(", ");
  }

  function renderTaxonomy(title, key, values) {
    if (!values || values.length === 0) {
      return "";
    }

    return (
      '<div class="project-section">' +
      "<h2>" + escapeHtml(title) + "</h2>" +
      '<div class="project-taxonomy">' +
      values
        .map(function (value) {
          return '<a href="' + escapeHtml("../index.html?" + encodeURIComponent(key) + "=" + encodeURIComponent(value)) + '">' + escapeHtml(value) + "</a>";
        })
        .join("") +
      "</div>" +
      "</div>"
    );
  }

  function renderOptionalMetadataSections() {
    var sections = "";

    if (project.citation) {
      sections +=
        '<div class="project-section project-citation" data-aos="fade-up">' +
        "<h2>Citation</h2>" +
        "<pre>" + escapeHtml(project.citation) + "</pre>" +
        "</div>";
    }

    if (project.team && project.team.length) {
      sections +=
        '<div class="project-section" data-aos="fade-up">' +
        "<h2>Team Members</h2>" +
        '<div class="project-team-list">' +
        project.team
          .map(function (member) {
            if (member.url) {
              return '<a href="' + escapeHtml(member.url) + '">' + escapeHtml(member.name) + "</a>";
            }
            return "<span>" + escapeHtml(member.name) + "</span>";
          })
          .join("") +
        "</div>" +
        "</div>";
    }

    if (project.categories && project.categories.length) {
      sections += renderTaxonomy("Categories", "category", project.categories);
    }

    if (project.topics && project.topics.length) {
      sections += renderTaxonomy("Topics", "topic", project.topics);
    }

    if (project.techniques && project.techniques.length) {
      sections += renderTaxonomy("Techniques", "technique", project.techniques);
    }

    return sections;
  }

  function parseInlineMarkdown(text) {
    return escapeHtml(text)
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function renderMarkdown(markdown) {
    var lines = markdown.replace(/\r\n/g, "\n").split("\n");
    var html = [];
    var inCode = false;
    var codeLines = [];
    var listType = null;
    var paragraph = [];
    var blockquote = [];

    function flushParagraph() {
      if (!paragraph.length) {
        return;
      }
      html.push("<p>" + parseInlineMarkdown(paragraph.join(" ")) + "</p>");
      paragraph = [];
    }

    function flushList() {
      if (!listType) {
        return;
      }
      html.push("</" + listType + ">");
      listType = null;
    }

    function flushBlockquote() {
      if (!blockquote.length) {
        return;
      }
      html.push("<blockquote>" + blockquote.map(parseInlineMarkdown).join("<br>") + "</blockquote>");
      blockquote = [];
    }

    function flushCode() {
      if (!inCode) {
        return;
      }
      html.push("<pre><code>" + escapeHtml(codeLines.join("\n")) + "</code></pre>");
      inCode = false;
      codeLines = [];
    }

    lines.forEach(function (line) {
      var trimmed = line.trim();
      var headingMatch = /^(#{1,6})\s+(.*)$/.exec(trimmed);
      var unorderedMatch = /^[-*]\s+(.*)$/.exec(trimmed);
      var orderedMatch = /^\d+\.\s+(.*)$/.exec(trimmed);
      var blockquoteMatch = /^>\s?(.*)$/.exec(trimmed);

      if (trimmed.startsWith("```")) {
        flushParagraph();
        flushList();
        flushBlockquote();
        if (inCode) {
          flushCode();
        } else {
          inCode = true;
        }
        return;
      }

      if (inCode) {
        codeLines.push(line);
        return;
      }

      if (!trimmed) {
        flushParagraph();
        flushList();
        flushBlockquote();
        return;
      }

      if (/^<[^>]+>/.test(trimmed)) {
        flushParagraph();
        flushList();
        flushBlockquote();
        html.push(line);
        return;
      }

      if (headingMatch) {
        flushParagraph();
        flushList();
        flushBlockquote();
        html.push("<h" + headingMatch[1].length + ">" + parseInlineMarkdown(headingMatch[2]) + "</h" + headingMatch[1].length + ">");
        return;
      }

      if (/^---+$/.test(trimmed)) {
        flushParagraph();
        flushList();
        flushBlockquote();
        html.push("<hr>");
        return;
      }

      if (blockquoteMatch) {
        flushParagraph();
        flushList();
        blockquote.push(blockquoteMatch[1]);
        return;
      }

      if (unorderedMatch) {
        flushParagraph();
        flushBlockquote();
        if (listType !== "ul") {
          flushList();
          listType = "ul";
          html.push("<ul>");
        }
        html.push("<li>" + parseInlineMarkdown(unorderedMatch[1]) + "</li>");
        return;
      }

      if (orderedMatch) {
        flushParagraph();
        flushBlockquote();
        if (listType !== "ol") {
          flushList();
          listType = "ol";
          html.push("<ol>");
        }
        html.push("<li>" + parseInlineMarkdown(orderedMatch[1]) + "</li>");
        return;
      }

      flushList();
      flushBlockquote();
      paragraph.push(trimmed);
    });

    flushParagraph();
    flushList();
    flushBlockquote();
    flushCode();

    return html.join("");
  }

  function refreshAnimations() {
    if (window.AOS && typeof window.AOS.refreshHard === "function") {
      window.AOS.refreshHard();
    } else if (window.AOS && typeof window.AOS.refresh === "function") {
      window.AOS.refresh();
    }
  }

  function renderLink(label, icon, href) {
    if (!href) {
      return "";
    }

    return (
      '<a class="project-link-pill" href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer">' +
      '<span class="' + escapeHtml(icon) + '"></span>' +
      "<span>" + escapeHtml(label) + "</span>" +
      "</a>"
    );
  }

  document.title = project.title + " | ScopeX @ ASU";

  root.innerHTML =
    '<div class="site-section project-detail-shell">' +
    '<div class="container">' +
    '<div class="project-detail-head" data-aos="fade-up">' +
    '<div class="projects-kicker">Project Detail</div>' +
    '<div class="project-detail-cover"><img src="' + escapeHtml(project.image) + '" alt="' + escapeHtml(project.title) + ' cover image"></div>' +
    "<h1>" + escapeHtml(project.title) + "</h1>" +
    '<p class="project-summary"><strong>' + escapeHtml(project.venue) + "</strong>" + (project.subtitle ? " · " + escapeHtml(project.subtitle) : "") + "</p>" +
    '<p class="project-detail-authors">' + renderLinkedPeople(project.authors) + "</p>" +
    '<p class="project-detail-affiliations">' + escapeHtml((project.affiliations || []).join(" · ")) + "</p>" +
    '<div class="project-links">' +
    renderLink("Paper", "icon-file-text", project.links && project.links.paper) +
    renderLink("PDF", "icon-download", project.links && project.links.pdf) +
    renderLink("Code", "icon-github", project.links && project.links.code) +
    renderLink("Demo", "icon-play-circle-o", project.links && project.links.demo) +
    renderLink("Slides", "icon-laptop", project.links && project.links.slides) +
    renderLink("Poster", "icon-image", project.links && project.links.poster) +
    renderLink("arXiv", "icon-book", project.links && project.links.arxiv) +
    "</div>" +
    "</div>" +
    '<article class="project-section project-markdown" data-aos="fade-up" data-project-markdown>' +
    '<div class="project-empty">Loading project content...</div>' +
    "</article>" +
    renderOptionalMetadataSections() +
    "</div>" +
    "</div>";

  refreshAnimations();

  var markdownRoot = root.querySelector("[data-project-markdown]");
  var embeddedMarkdownNode = document.querySelector("[data-project-markdown-source]");
  var embeddedMarkdown = embeddedMarkdownNode ? embeddedMarkdownNode.textContent : "";
  var contentFile = project.contentFile || "./content.md";

  if (window.location.protocol === "file:" && embeddedMarkdown && embeddedMarkdown.trim()) {
    markdownRoot.innerHTML = renderMarkdown(embeddedMarkdown);
    refreshAnimations();
    return;
  }

  fetch(contentFile)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Unable to load " + contentFile);
      }
      return response.text();
    })
    .then(function (markdown) {
      markdownRoot.innerHTML = renderMarkdown(markdown);
      refreshAnimations();
    })
    .catch(function () {
      if (embeddedMarkdown && embeddedMarkdown.trim()) {
        markdownRoot.innerHTML = renderMarkdown(embeddedMarkdown);
      } else {
        markdownRoot.innerHTML =
          '<div class="project-empty">Project content could not be loaded. Add embedded Markdown to this page or provide a readable <code>content.md</code> file through a web server.</div>';
      }
      refreshAnimations();
    });
})();
