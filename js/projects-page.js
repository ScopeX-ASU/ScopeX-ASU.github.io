(function () {
  var projects = window.scopexProjectsRegistry || [];
  var root = document.getElementById("projects-page");

  if (!root) {
    return;
  }

  var selected = {
    categories: new Set(),
    topics: new Set(),
    techniques: new Set()
  };

  function readUrlState() {
    var params = new URLSearchParams(window.location.search);
    ["category", "topic", "technique"].forEach(function (key) {
      var target =
        key === "category"
          ? selected.categories
          : key === "topic"
            ? selected.topics
            : selected.techniques;

      params.getAll(key).forEach(function (value) {
        if (value) {
          target.add(value);
        }
      });
    });
  }

  function uniqueValues(key) {
    var values = new Set();

    projects.forEach(function (project) {
      (project[key] || []).forEach(function (value) {
        values.add(value);
      });
    });

    return Array.from(values).sort();
  }

  function matchesGroup(projectValues, activeSet) {
    if (activeSet.size === 0) {
      return true;
    }

    return Array.from(activeSet).every(function (item) {
      return projectValues.indexOf(item) !== -1;
    });
  }

  function filterProjects() {
    return projects.filter(function (project) {
      return (
        matchesGroup(project.categories || [], selected.categories) &&
        matchesGroup(project.topics || [], selected.topics) &&
        matchesGroup(project.techniques || [], selected.techniques)
      );
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function authorMarkup(author) {
    if (author.url) {
      return '<a href="' + escapeHtml(author.url) + '">' + escapeHtml(author.name) + "</a>";
    }

    return escapeHtml(author.name);
  }

  function taxonomyBadges(values, key) {
    return (values || [])
      .map(function (value) {
        var url = new URL(window.location.href);
        url.search = "";
        url.searchParams.set(key, value);
        return '<a class="project-badge" href="' + escapeHtml(url.pathname + url.search) + '">' + escapeHtml(value) + "</a>";
      })
      .join("");
  }

  function renderCards(results) {
    var container = root.querySelector("[data-project-results]");
    var count = root.querySelector("[data-project-count]");

    count.textContent = results.length + (results.length === 1 ? " project" : " projects");

    if (results.length === 0) {
      container.innerHTML =
        '<div class="project-empty">No projects match the current selection yet. Clear a filter or add a new project entry in <code>js/projects-registry.js</code>.</div>';
      return;
    }

    container.innerHTML = results
      .map(function (project) {
        return (
          '<article class="projects-card" data-aos="fade-up">' +
          '<a class="projects-card-media" href="' + escapeHtml(project.url) + '">' +
          '<img src="' + escapeHtml(project.image) + '" alt="' + escapeHtml(project.title) + ' cover image">' +
          "</a>" +
          '<div class="projects-card-body">' +
          '<div class="projects-meta">' + escapeHtml(project.venueShort || project.venue) + "</div>" +
          '<h2 class="projects-card-title"><a href="' + escapeHtml(project.url) + '">' + escapeHtml(project.title) + "</a></h2>" +
          '<p class="projects-card-authors">' + project.authors.map(authorMarkup).join(", ") + "</p>" +
          '<p class="projects-card-summary">' + escapeHtml(project.cardAbstract) + "</p>" +
          '<div class="project-grid">' +
          taxonomyBadges(project.categories, "category") +
          taxonomyBadges(project.topics, "topic") +
          taxonomyBadges(project.techniques, "technique") +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function syncUrl() {
    var params = new URLSearchParams();

    Array.from(selected.categories).forEach(function (value) {
      params.append("category", value);
    });
    Array.from(selected.topics).forEach(function (value) {
      params.append("topic", value);
    });
    Array.from(selected.techniques).forEach(function (value) {
      params.append("technique", value);
    });

    var nextUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
    window.history.replaceState({}, "", nextUrl);
  }

  function renderChips(values, setName, label) {
    var group = root.querySelector('[data-filter-group="' + setName + '"]');
    group.innerHTML =
      '<h3>' + label + "</h3>" +
      '<div class="projects-chip-wrap">' +
      values
        .map(function (value) {
          var isActive = selected[setName].has(value);
          return (
            '<button class="projects-chip' + (isActive ? " active" : "") + '" type="button" data-filter="' + escapeHtml(setName) + '" data-value="' + escapeHtml(value) + '" aria-pressed="' + (isActive ? "true" : "false") + '">' +
            escapeHtml(value) +
            "</button>"
          );
        })
        .join("") +
      "</div>";
  }

  function renderAll() {
    renderChips(uniqueValues("categories"), "categories", "Categories");
    renderChips(uniqueValues("topics"), "topics", "Topics");
    renderChips(uniqueValues("techniques"), "techniques", "Techniques");
    renderCards(filterProjects());
    syncUrl();

    if (window.AOS && typeof window.AOS.refreshHard === "function") {
      window.AOS.refreshHard();
    } else if (window.AOS && typeof window.AOS.refresh === "function") {
      window.AOS.refresh();
    }
  }

  readUrlState();
  renderAll();

  root.addEventListener("click", function (event) {
    var button = event.target.closest("[data-filter]");
    var clearButton = event.target.closest("[data-clear-filters]");

    if (clearButton) {
      selected.categories.clear();
      selected.topics.clear();
      selected.techniques.clear();
      renderAll();
      return;
    }

    if (!button) {
      return;
    }

    var groupName = button.getAttribute("data-filter");
    var value = button.getAttribute("data-value");
    var groupSet = selected[groupName];

    if (!groupSet) {
      return;
    }

    if (groupSet.has(value)) {
      groupSet.delete(value);
    } else {
      groupSet.add(value);
    }

    renderAll();
  });
})();
