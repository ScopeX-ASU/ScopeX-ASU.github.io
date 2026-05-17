(function () {
  // Keep the catalog small. Each project owns its detailed content under /projects/<slug>/.
  window.scopexProjectsRegistry = [
    {
      slug: "pic2o-sim",
      title: "PIC2O-Sim",
      venue: "APL Photonics 2025",
      venueShort: "APL Photonics 2025",
      categories: ["Design Automation Flow"],
      topics: ["Photonic Device Simulation", "Scientific Machine Learning"],
      techniques: ["Neural Operators", "Physics-Informed Modeling"],
      authors: [
        { name: "Pingchuan Ma", url: "../group.html" },
        { name: "Haoyu Yang" },
        { name: "Zhengqi Gao" },
        { name: "Duane S. Boning" },
        { name: "Jiaqi Gu", url: "../index.html" }
      ],
      image: "./pic2o-sim/assets/cover.svg",
      cardAbstract:
        "A photonic device simulator that combines causality-aware neural operators with physics priors to accelerate FDTD-style analysis while preserving design-relevant fidelity.",
      url: "./pic2o-sim/index.html"
    },
    {
      slug: "lidar-2-0",
      title: "LiDAR 2.0",
      venue: "IEEE TCAD 2025",
      venueShort: "TCAD 2025",
      categories: ["Design Automation Flow"],
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
      slug: "lightening-transformer",
      title: "Lightening-Transformer",
      venue: "HPCA 2024",
      venueShort: "HPCA 2024",
      categories: ["Hardware Design"],
      topics: ["AI Accelerators", "Transformer Inference"],
      techniques: ["Photonic Computing", "Cross-Layer Co-Design"],
      authors: [
        { name: "Shupeng Ning" },
        { name: "Hanqing Zhu" },
        { name: "Chenghao Feng" },
        { name: "Jiaqi Gu", url: "../index.html" },
        { name: "David Z. Pan" },
        { name: "Ray T. Chen" }
      ],
      image: "./lightening-transformer/assets/cover.svg",
      cardAbstract:
        "A project in photonic AI hardware that demonstrates how optical acceleration and system-level co-design can improve transformer efficiency for modern intelligent workloads.",
      url: "./lightening-transformer/index.html"
    },
    {
      slug: "adept-z",
      title: "ADEPT-Z",
      venue: "ASPDAC 2025",
      venueShort: "ASPDAC 2025",
      categories: ["Efficient Algorithms", "Design Automation Flow"],
      topics: ["Optical Neural Networks", "Design Automation"],
      techniques: ["Cross-Layer Co-Design", "Compiler and Mapping"],
      authors: [
        { name: "Jiaqi Gu", url: "../index.html" },
        { name: "ScopeX Group", url: "../group.html" }
      ],
      image: "./adept-z/assets/cover.svg",
      cardAbstract:
        "A project template for automated deployment and co-optimization of optical neural network systems across models, hardware constraints, and implementation flow.",
      url: "./adept-z/index.html"
    }
  ];
})();
