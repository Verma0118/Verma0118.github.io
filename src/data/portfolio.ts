// ─── EDIT THIS FILE to update your portfolio content ───────────────────────

export const personalInfo = {
  name: "Aarav Verma",
  title: "Aerospace Engineering Student",
  school: "University of Illinois Urbana-Champaign",
  major: "Aerospace Engineering, CS Minor",
  bio: "TODO: Add your bio here — a few sentences about who you are, what you work on, and what drives you.",
  skills: {
    cadSimulation: ["NX Siemens", "SolidWorks", "CATIA V5", "ANSYS", "MATLAB", "Simulink"],
    software: ["Python", "TypeScript", "React", "C++", "Git", "ROS"],
    manufacturing: ["FDM 3D Printing", "CNC Machining", "Laser Cutting", "Sheet Metal Fabrication"],
  },
  education: "B.S. Aerospace Engineering — University of Illinois Urbana-Champaign (2024–2028)",
  currentFocus: "eVTOL fleet management software and autonomous UAV systems",
  organizations: [
    "TODO: Add your orgs (e.g. AIAA Student Chapter)",
    "Illinois Space Society",
  ],
  resumeUrl: "/resume.pdf",
  email: "vermaa0118@gmail.com",
  githubUrl: "https://github.com/Verma0118",
  linkedinUrl: "https://linkedin.com/in/aarav-verma", // TODO: update with your actual LinkedIn URL
};

// Featured on homepage — add title, org, role, date, description, tags, and GLB path
export const cadProjects = [
  {
    id: 1,
    title: "Full Drone + Computer System",
    organization: "TODO: Organization / Team",
    role: "Lead Designer",
    dateRange: "2024–2025",
    location: "UIUC",
    description: "TODO: Describe this project — what was designed, what problem it solves, key design decisions.",
    tags: ["UAV", "Avionics", "NX Siemens", "Aerospace"],
    glbFileUrl: "/glb/full-drone-computer.glb",
  },
  {
    id: 2,
    title: "Toroidal Propeller Design",
    organization: "TODO: Organization / Team",
    role: "Designer",
    dateRange: "2025",
    location: "UIUC",
    description: "TODO: Describe this project.",
    tags: ["Propulsion", "Aerodynamics", "NX Siemens"],
    glbFileUrl: "/glb/toroidal-propeller.glb",
  },
  {
    id: 3,
    title: "Hydroponic Subscale System — Idea Fair",
    organization: "UIUC Idea Fair",
    role: "Designer & Builder",
    dateRange: "2024",
    location: "UIUC",
    description: "TODO: Describe this project.",
    tags: ["Design", "Fabrication", "Systems Engineering"],
    glbFileUrl: "/glb/hydroponic-subscale.glb",
  },
  {
    id: 4,
    // Guessing these are GHOST project parts — update title/description when you export GHOST GLBs from Replit
    title: "GHOST — Reduced Frame v1",
    organization: "TODO: Organization / Team",
    role: "TODO: Your role",
    dateRange: "TODO: Date range",
    location: "UIUC",
    description: "TODO: Describe the GHOST project and what this frame design represents.",
    tags: ["Structural Design", "NX Siemens", "TODO: Add tags"],
    glbFileUrl: "/glb/reduced-frame.glb",
  },
];

// Software projects — link to GitHub repos
export const softwareProjects = [
  // TODO: Add your software projects. Example:
  // {
  //   id: 1,
  //   title: "Volant Fleet Management",
  //   description: "B2B SaaS fleet operations platform for eVTOL and drone operators.",
  //   githubUrl: "https://github.com/Verma0118/volant",
  //   tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  //   thumbnailUrl: null,
  // },
];

// Class work — grouped by course. GLB files are in /public/glb/
export const classProjects = [
  {
    id: 1,
    code: "TODO: Course Code",  // e.g. "AE 199"
    name: "TODO: Course Name",  // e.g. "Intro to Aerospace Engineering"
    models: [
      { id: 1,  name: "Chapter 7 — Exercise 2",  glbFileUrl: "/glb/c07exe2.glb" },
      { id: 2,  name: "Chapter 7 — Tutorial 3",  glbFileUrl: "/glb/c07tut3.glb" },
      { id: 3,  name: "Chapter 7 — Tutorial 4",  glbFileUrl: "/glb/c07tut4.glb" },
      { id: 4,  name: "Chapter 10 — Tutorial 1", glbFileUrl: "/glb/c10tut1.glb" },
      { id: 5,  name: "Chapter 10 — Tutorial 2", glbFileUrl: "/glb/c10tut2.glb" },
      { id: 6,  name: "Homework 6 Model",         glbFileUrl: "/glb/hw06.glb" },
      { id: 7,  name: "Lava Lamp",                glbFileUrl: "/glb/lava-lamp.glb" },
      { id: 8,  name: "Spur Gear",                glbFileUrl: "/glb/gear.glb" },
    ],
  },
  {
    id: 2,
    code: "TODO: Course Code",  // e.g. "ME 270"
    name: "TODO: Course Name — Vehicle Components",
    models: [
      { id: 9,  name: "Swingarm",                    glbFileUrl: "/glb/swingarm.glb" },
      { id: 10, name: "Front Sprocket",               glbFileUrl: "/glb/front-sprocket.glb" },
      { id: 11, name: "Top Rod Assembly",             glbFileUrl: "/glb/top-rod-assembly.glb" },
      { id: 12, name: "Reduced Frame v1",             glbFileUrl: "/glb/reduced-frame.glb" },
      { id: 13, name: "Reduced Frame v1.2",           glbFileUrl: "/glb/reduced-frame-v2.glb" },
    ],
  },
  {
    id: 3,
    code: "Other",
    name: "Independent Design Work",
    models: [
      { id: 14, name: "UAV Design v2",               glbFileUrl: "/glb/uav-v2.glb" },
      { id: 15, name: "Full Drone",                   glbFileUrl: "/glb/full-drone.glb" },
      { id: 16, name: "Button Head Hex Drive Screw",  glbFileUrl: "/glb/button-head-screw.glb" },
    ],
  },
];
