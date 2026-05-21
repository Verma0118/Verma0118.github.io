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
    organization: "National Organization for Business and Engineering (NOBE)",
    role: "Engineering Lead",
    dateRange: "Feb 2026–Present",
    location: "UIUC",
    description: "Designed a modular drone airframe in Autodesk Fusion featuring a Jetson computer housing frame and foldable leg motor assembly with 4 snap-lock hinge joints — enabling tool-free field reconfiguration between missions. Validated structural integrity under 12N thrust loads via FEA, confirming factor of safety above 2.0. Developed a cohesive BOM tracking 50+ components.",
    tags: ["UAV", "Avionics", "Autodesk Fusion", "FEA", "NOBE"],
    glbFileUrl: "/glb/full-drone-computer.glb",
  },
  {
    id: 2,
    title: "Toroidal Propeller Design",
    organization: "National Organization for Business and Engineering (NOBE)",
    role: "Engineering Lead",
    dateRange: "Feb 2026–Present",
    location: "UIUC",
    description: "Redesigned a standard 2-blade propeller to toroidal configuration in Autodesk Fusion, improving thrust efficiency by ~11% at 4–6k RPM by enclosing the blade-tip vortex path and lowering acoustic signature below 60 dB at 1m hover. Validated structural integrity of the propeller and motor mount assembly under 12N thrust loads via FEA, confirming factor of safety above 2.0.",
    tags: ["Propulsion", "Aerodynamics", "Autodesk Fusion", "FEA", "NOBE"],
    glbFileUrl: "/glb/toroidal-propeller.glb",
  },
  {
    id: 3,
    title: "Revolving Modular Hydroponic Tower",
    organization: "UIUC Residence Hall Idea Fair",
    role: "Designer & Builder",
    dateRange: "2024",
    location: "UIUC",
    description: "Designed a revolving modular hydroponic tower in Autodesk Fusion for the UIUC Residence Hall Idea Fair. Engineered the modular stacking system around FDM 3D-printing constraints, defining tolerances and fit for all interlocking components. Produced and assembled the full prototype in-house.",
    tags: ["Autodesk Fusion", "3D Printing", "DFM", "Modular Design"],
    glbFileUrl: "/glb/hydroponic-subscale.glb",
  },
  {
    id: 4,
    title: "Swingarm Assembly",
    organization: "Ghost Electric Motorcycles",
    role: "Drivetrain Engineer",
    dateRange: "Aug 2025–Present",
    location: "UIUC",
    description: "Engineered a rear suspension swingarm in SolidWorks by reverse-engineering the 2010 Kawasaki ZX-6R — calculating anti-squat ratio and pivot geometry to replicate OEM kinematics. Validated stiffness under braking, acceleration, and cornering loads using ANSYS FEA and MATLAB.",
    tags: ["Mechanical Design", "SolidWorks", "FEA", "Suspension", "ANSYS"],
    glbFileUrl: "/glb/swingarm.glb",
  },
  {
    id: 5,
    title: "GHOST — Drivetrain Frame",
    organization: "Ghost Electric Motorcycles",
    role: "Drivetrain Engineer",
    dateRange: "Aug 2025–Present",
    location: "UIUC",
    description: "Designed a load-bearing drivetrain frame in SolidWorks to house and align motor, top rod, and swingarm subassemblies to ±0.05 mm mounting tolerances. Performed structural analysis in ANSYS FEA and MATLAB validating stiffness and load capacity under peak torque delivery, chain tension, and rider-weight loading across braking, cornering, and max acceleration.",
    tags: ["Structural Design", "SolidWorks", "FEA", "Drivetrain", "ANSYS"],
    glbFileUrl: "/glb/reduced-frame.glb",
  },
];

// Software projects — link to GitHub repos
export const softwareProjects = [
  {
    id: 1,
    title: "TVC Simulator",
    description: "Thrust Vector Control simulator built in Python. Models gimbal-actuated rocket engine dynamics for attitude control during powered flight.",
    githubUrl: "https://github.com/Verma0118/TVC_Simulator_V1",
    tags: ["Python", "Simulation", "Controls", "Aerospace"],
    thumbnailUrl: null,
  },
  {
    id: 2,
    title: "Volant",
    description: "B2B SaaS fleet operations platform for drone and eVTOL operators — the Samsara for autonomous aviation. Real-time telemetry, mission dispatch, and fleet management.",
    githubUrl: "https://github.com/Verma0118/volant",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    thumbnailUrl: null,
  },
];

// Class work — grouped by course. GLB files are in /public/glb/
export const classProjects = [
  {
    id: 1,
    code: "AE 140",
    name: "Introduction to CAD for Aerospace Engineers",
    models: [
      { id: 1,  name: "Chapter 7 — Exercise 2",  glbFileUrl: "/glb/c07exe2.glb" },
      { id: 2,  name: "Chapter 7 — Tutorial 3",  glbFileUrl: "/glb/c07tut3.glb" },
      { id: 3,  name: "Chapter 7 — Tutorial 4",  glbFileUrl: "/glb/c07tut4.glb" },
      { id: 4,  name: "Chapter 10 — Tutorial 1", glbFileUrl: "/glb/c10tut1.glb" },
      { id: 5,  name: "Chapter 10 — Tutorial 2", glbFileUrl: "/glb/c10tut2.glb" },
      { id: 6,  name: "Homework 6 Model",         glbFileUrl: "/glb/hw06.glb" },
      { id: 7,  name: "Lava Lamp",                glbFileUrl: "/glb/lava-lamp.glb" },
      { id: 8,  name: "Spur Gear",                glbFileUrl: "/glb/gear.glb" },
      { id: 9,  name: "Front Sprocket",           glbFileUrl: "/glb/front-sprocket.glb" },
      { id: 10, name: "UAV Design v2",            glbFileUrl: "/glb/uav-v2.glb" },
    ],
  },
];
