// ─── EDIT THIS FILE to update your portfolio content ───────────────────────

export const personalInfo = {
  name: "Aarav Verma",
  title: "Aerospace Engineering Student",
  school: "University of Illinois Urbana-Champaign",
  major: "Aerospace Engineering, CS Minor",
  bio: "Aerospace Engineering student at UIUC. I build hardware that flies and moves — currently leading drone development at NOBE, engineering drivetrain systems at Ghost Electric Motorcycles, and founding Volant, a fleet operations platform for drone and eVTOL operators.",
  skills: {
    cadSimulation: ["NX Siemens", "SolidWorks", "CATIA V5", "ANSYS", "MATLAB", "Simulink"],
    software: ["Python", "TypeScript", "React", "C++", "Git", "ROS"],
    manufacturing: ["FDM 3D Printing", "CNC Machining", "Laser Cutting", "Sheet Metal Fabrication"],
  },
  education: "B.S. Aerospace Engineering — University of Illinois Urbana-Champaign (2024–2028)",
  currentFocus: "eVTOL fleet management software and autonomous UAV systems",
  organizations: [
    "NOBE — Project Manager",
    "Ghost Electric Motorcycles — Drivetrain Engineer",
    "Illinois Space Society — Space Shot Structural Engineer",
  ],
  resumeUrl: "/resume.pdf",
  email: "vermaa0118@gmail.com",
  githubUrl: "https://github.com/Verma0118",
  linkedinUrl: "https://www.linkedin.com/in/aaravverma0118",
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
    description: "Designed a modular drone airframe in Fusion with a Jetson housing and foldable leg motors on 4 snap-lock hinges — no tools needed to swap configs in the field. FEA under 12N thrust load confirmed FOS above 2.0. BOM covers 50+ components.",
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
    description: "Redesigned a 2-blade propeller to toroidal config in Fusion — enclosing the blade-tip vortex path pushed thrust efficiency up ~11% at 4–6k RPM and dropped acoustic signature below 60 dB at 1m hover. FEA on the propeller and motor mount under 12N load confirmed FOS above 2.0.",
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
    description: "Revolving modular hydroponic tower designed in Fusion for the UIUC Residence Hall Idea Fair. Built the stacking system around FDM print constraints — tolerances defined for every interlocking joint. Printed and assembled the full prototype in-house.",
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
    description: "Rear suspension swingarm in SolidWorks, reverse-engineered from the 2010 Kawasaki ZX-6R. Worked out anti-squat ratio and pivot geometry to match OEM kinematics, then validated stiffness under braking, acceleration, and cornering in ANSYS and MATLAB.",
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
    description: "Drivetrain frame in SolidWorks to mount and align motor, top rod, and swingarm to ±0.05 mm. Structural analysis in ANSYS and MATLAB confirmed stiffness under peak torque, chain tension, and rider weight across braking, cornering, and full acceleration.",
    tags: ["Structural Design", "SolidWorks", "FEA", "Drivetrain", "ANSYS"],
    glbFileUrl: "/glb/reduced-frame.glb",
  },
  {
    id: 6,
    title: "Volant Demo Drone",
    organization: "Volant (Personal Startup)",
    role: "Founder & Designer",
    dateRange: "2025–Present",
    location: "UIUC",
    description: "Palm-sized drone airframe designed in Fusion as the hardware side of Volant — my fleet ops platform for drone and eVTOL operators. Modeled to FDM tolerances so the whole thing is printable and field-deployable. Built to run in a 10-drone swarm tied into Volant's telemetry and mission dispatch.",
    tags: ["Autodesk Fusion", "3D Printing", "DFM", "UAV", "Volant"],
    glbFileUrl: "/glb/volant-mini-drone.glb",
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
