(function () {
  // Keep the catalog small. Each project owns its detailed content under /projects/<slug>/.
  window.scopexProjectsRegistry = [
    {
      slug: "lidar-2-0",
      title: "LiDAR 2.0",
      venue: "IEEE TCAD 2025",
      venueShort: "TCAD 2025",
      categories: ["Electronic-Photonic Design Automation (EPDA)"],
      topics: ["Photonic Layout", "Routing Automation"],
      techniques: ["Hierarchical Optimization", "Design Space Exploration"],
      authors: [
        { name: "Hongjian Zhou", url: "../group.html" },
        { name: "Haoyu Yang" },
        { name: "Ziang Yin", url: "../group.html" },
        { name: "Nicholas Gangi" },
        { name: "Zhaoran Huang" },
        { name: "Haoxing Ren" },
        { name: "Joaquin Matres" },
        { name: "Jiaqi Gu", url: "../index.html" }
      ],
      image: "./lidar-2-0/assets/cover.svg",
      cardAbstract:
        "An EPDA routing framework for large-scale photonic integrated circuits that emphasizes scalability, layout quality, and manufacturable curved-waveguide routing.",
      url: "./lidar-2-0/index.html"
    },
    {
      slug: "maps",
      title: "MAPS: Multi-Fidelity AI-Augmented Photonic Simulation and Inverse Design Infrastructure",
      venue: "IEEE DATE 2025",
      venueShort: "DATE 2025",
      categories: ["Electronic-Photonic Design Automation (EPDA)"],
      topics: ["Inverse Design", "AI for Optics"],
      techniques: ["Inverse Design", "AI for Optics"],
      authors: [
        { name: "Pingchuan Ma" },
        { name: "Zhengqi Gao" },
        { name: "Meng Zhang" },
        { name: "Haoyu Yang" },
        { name: "Mark Ren" },
        { name: "Rena Huang" },
        { name: "Duane S. Boning" },
        { name: "Jiaqi Gu", url: "../../index.html" }
      ],
      image: "./maps/assets/cover.png",
      cardAbstract:
        "AI-assisted Photonic Device Inverse Design Framework.",
      url: "./maps/index.html"
    },
  ];
})();
