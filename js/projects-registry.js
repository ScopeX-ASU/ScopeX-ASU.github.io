(function () {
  // Keep the catalog small. Each project owns its detailed content under /projects/<slug>/.
  window.scopexProjectsRegistry = [
    {
      slug: "prism",
      title: "PRISM: Photonics-Informed Inverse Lithography for Manufacturable Inverse-Designed Photonic Integrated Circuits",
      venue: "ACM TODAES 2026",
      venueShort: "TODAES 2026",
      categories: ["Electronic-Photonic Design Automation (EPDA)"],
      topics: ["Inverse Design", "AI for Optics", "DFM"],
      techniques: ["ILT", "Inverse Design"],
      authors: [
        { name: "Hongjian Zhou", url: "../group.html" },
        { name: "Haoyu Yang" },
        { name: "Nicholas Gangi" },
        { name: "Tianle Xu" },
        { name: "Zhaoran Huang" },
        { name: "Jiaqi Gu", url: "../group.html" }
      ],
      image: "./prism/assets/cover.png",
      cardAbstract:
        "A photonics-informed inverse lithography framework for manufacturable inverse-designed photonic integrated circuits.",
      url: "./prism/index.html"
    },
    {
      slug: "lidar-2-0",
      title: "LiDAR 2.0: Hierarchical Curvy Waveguide Detailed Routing for Large-Scale Photonic Integrated Circuits",
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
      image: "./lidar-2-0/assets/cover.jpg",
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
    {
      slug: "simphony",
      title: "SimPhony: A Device-Circuit-Architecture Cross-Layer Modeling and Simulation Framework for Heterogeneous Electronic-Photonic AI Systems",
      venue: "ACM/IEEE DAC 2025",
      venueShort: "DAC 2025",
      categories: ["Electronic-Photonic Design Automation (EPDA)"],
      topics: ["Cross-layer Co-Design", "EPIC", "AI Systems"],
      techniques: ["Cross-layer Co-Design", "EPIC", "AI Systems"],
      authors: [
        { name: "Ziang Yin", url: "../../index.html" },
        { name: "Meng Zhang" },
        { name: "Amir Begovic" },
        { name: "Rena Huang" },
        { name: "Jeff Zhang" },
        { name: "Jiaqi Gu", url: "../../index.html" }
      ],
      image: "./simphony/assets/cover.png",
      cardAbstract:
        "A cross-layer modeling and simulation framework for heterogeneous electronic-photonic AI systems.",
      url: "./simphony/index.html"
    }
  ];
})();
