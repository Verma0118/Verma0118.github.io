// ─── EDIT THIS FILE to update your portfolio content ───────────────────────

export const personalInfo = {
  name: "Aarav Verma",
  title: "Aerospace Engineering Student",
  school: "University of Illinois Urbana-Champaign",
  major: "Aerospace Engineering, CS Minor",
  bio: "Aerospace Engineering student at UIUC. I build hardware that flies and moves. Project Manager at NOBE leading interceptor technology development, and Build Team Engineer at UAV@Illinois building race-ready FPV drones.",
  skills: {
    cadSimulation: ["NX Siemens", "SolidWorks", "Fusion", "CATIA V5", "ANSYS", "MATLAB", "Simulink"],
    software: ["Python", "TypeScript", "React", "C++", "Git", "ROS"],
    manufacturing: ["FDM 3D Printing", "CNC Machining", "Laser Cutting", "Sheet Metal Fabrication"],
  },
  education: "B.S. Aerospace Engineering, University of Illinois Urbana-Champaign, 2025 to 2029",
  currentFocus: "eVTOL fleet management software and autonomous UAV systems",
  organizations: [
    "NOBE, Project Manager",
    "UAV@Illinois, Build Team Engineer",
  ],
  previousWork: [
    "Ghost Electric Motorcycles, Drivetrain Engineer",
    "Illinois Space Society, Space Shot Structural Engineer",
    "Tarform, Mechanical Design Engineer Intern (Part-Time)",
  ],
  resumeUrl: "/resume.pdf",
  portfolioPdfUrl: "/Aarav_Verma_Portfolio.pdf",
  email: "aarav.verma.eng0118@gmail.com",
  githubUrl: "https://github.com/Verma0118",
  linkedinUrl: "https://www.linkedin.com/in/aaravverma0118",
};

// Featured on homepage, add title, org, role, date, description, tags, and GLB path
export const cadProjects = [
  {
    id: 1,
    title: "Full Drone + Computer System",
    organization: "NOBE, Canary Drone Project",
    role: "Engineering Lead",
    dateRange: "Feb 2026 to May 2026",
    location: "UIUC",
    description: "Designed a modular drone airframe in Fusion with a Jetson housing and foldable leg motors on 4 snap-lock hinges, with no tools needed to swap configs in the field. FEA under 12N thrust load confirmed FOS above 2.0. BOM covers 50+ components. Presented the design at the Cozad New Venture Challenge against 300+ teams for $500,000.",
    tags: ["UAV", "Avionics", "Autodesk Fusion", "FEA", "NOBE"],
    glbFileUrl: "/glb/full-drone-computer.glb",
  },
  {
    id: 2,
    title: "Toroidal Propeller Design",
    organization: "NOBE, Canary Drone Project",
    role: "Engineering Lead",
    dateRange: "Feb 2026 to May 2026",
    location: "UIUC",
    description: "Redesigned a 2-blade propeller to toroidal config in Fusion. Enclosing the blade-tip vortex path pushed thrust efficiency up ~11% at 4 to 6k RPM and dropped acoustic signature below 60 dB at 1m hover. FEA on the propeller and motor mount under 12N load confirmed FOS above 2.0.",
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
    description: "Revolving modular hydroponic tower designed in Fusion for the UIUC Residence Hall Idea Fair. Built the stacking system around FDM print constraints, with tolerances defined for every interlocking joint. Printed and assembled the full prototype in-house.",
    tags: ["Autodesk Fusion", "3D Printing", "DFM", "Modular Design"],
    glbFileUrl: "/glb/hydroponic-subscale.glb",
  },
  {
    id: 4,
    title: "Swingarm Assembly",
    organization: "Ghost Electric Motorcycles",
    role: "Drivetrain Engineer",
    dateRange: "Aug 2025 to Jan 2026",
    location: "UIUC",
    description: "Rear suspension swingarm in SolidWorks, reverse-engineered from the 2010 Kawasaki ZX-6R. Worked out anti-squat ratio and pivot geometry to match OEM kinematics, then validated stiffness under braking, acceleration, and cornering in ANSYS and MATLAB.",
    tags: ["Mechanical Design", "SolidWorks", "FEA", "Suspension", "ANSYS"],
    glbFileUrl: "/glb/swingarm.glb",
  },
  {
    id: 5,
    title: "GHOST Drivetrain Frame",
    organization: "Ghost Electric Motorcycles",
    role: "Drivetrain Engineer",
    dateRange: "Aug 2025 to Jan 2026",
    location: "UIUC",
    description: "Drivetrain frame in SolidWorks to mount and align motor, top rod, and swingarm to ±0.05 mm. Structural analysis in ANSYS and MATLAB confirmed stiffness under peak torque, chain tension, and rider weight across braking, cornering, and full acceleration.",
    tags: ["Structural Design", "SolidWorks", "FEA", "Drivetrain", "ANSYS"],
    glbFileUrl: "/glb/reduced-frame.glb",
  },
  {
    id: 6,
    title: "Haylon Technologies Interceptor Drone",
    organization: "NOBE, UIUC for Haylon Technologies",
    role: "Project Manager",
    dateRange: "June 2026 to Present",
    location: "UIUC",
    description: "Haylon Technologies builds hybrid battery management systems for defense and electric aerospace, and partnered with NOBE to develop a small interceptor drone. As project manager of a six-developer team, I built the 12-week roadmap, wrote every weekly deliverable and rubric, reviewed every developer's CAD and code, and ran the design competition that chose the final airframe. It uses a streamlined fuselage with four motor nacelles, screw-on winglets, and strap slots that lock the battery in place.",
    tags: ["Autodesk Fusion", "3D Printing", "UAV", "Project Management", "NOBE"],
    glbFileUrl: "/glb/interceptor.glb",
    slides: [
      {
        label: "Interceptor",
        title: "Haylon Technologies Interceptor Drone",
        description: "Haylon Technologies builds hybrid battery management systems for defense and electric aerospace, and partnered with NOBE to develop a small interceptor drone. As project manager of a six-developer team, I built the 12-week roadmap, wrote every weekly deliverable and rubric, reviewed every developer's CAD and code, and ran the design competition that chose the final airframe. It uses a streamlined fuselage with four motor nacelles, screw-on winglets, and strap slots that lock the battery in place.",
        tags: ["Autodesk Fusion", "3D Printing", "UAV", "Project Management"],
        glbFileUrl: "/glb/interceptor.glb",
      },
      {
        label: "Electronics",
        title: "Modular Electronics Mount",
        description: "The electronics stack rides on standoffs that hang from a screw-on nose cap, so the whole flight stack slides out in one piece for wiring and repairs. It carries the ESP32 flight controller and every joint threads into M3 heat-set inserts, so parts come apart and go back together cleanly, again and again.",
        tags: ["ESP32", "M3 Heat-Set Inserts", "Modular Design", "DFM"],
        glbFileUrl: "/glb/electronics-mount.glb",
      },
      {
        label: "Camera",
        title: "AKK BA3 Camera Mount",
        description: "A forward mount carries the AKK BA3 FPV camera. It feeds the team's Python vision system, where YOLO and OpenCV detect and track a target and a Kalman filter estimates its 3D position and velocity for the intercept solver.",
        tags: ["AKK BA3", "FPV", "OpenCV", "YOLO"],
        glbFileUrl: "/glb/camera-mount.glb",
      },
    ],
  },
];

// Software projects. githubUrl null means no link is shown
export const softwareProjects = [
  {
    id: 1,
    title: "Haylon Intercept Sim",
    kind: "Simulation",
    description: "A browser simulation of the Haylon interceptor's control idea. Throw a target, pick straight, weaving, or erratic evasion, and watch the guidance law track and chase it in 3D. Built before any CAD or hardware existed, so the control logic was proven first.",
    githubUrl: "https://github.com/Verma0118/haylon-intercept-sim" as string | null,
    tags: ["JavaScript", "Three.js", "Vite", "Guidance", "State Machine"],
    steps: ["Detect", "Stabilize", "Track", "Guide"] as string[] | undefined,
    images: [
      { src: "/projects/sim-guidance.jpg", alt: "Haylon Intercept Sim during the guidance phase, with the interceptor tracking an inbound target along its trajectory", label: "Guidance" },
      { src: "/projects/sim-hit.jpg", alt: "Haylon Intercept Sim showing a completed intercept with the HIT result", label: "Intercept" },
    ] as { src: string; alt: string; label: string }[] | undefined,
  },
  {
    id: 2,
    title: "Volant",
    kind: "Startup",
    description: "B2B SaaS fleet operations platform for drone and eVTOL operators, the Samsara for autonomous aviation. Real-time telemetry, mission dispatch, and fleet management.",
    githubUrl: "https://github.com/Verma0118/volant" as string | null,
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    steps: undefined as string[] | undefined,
    images: undefined as { src: string; alt: string; label: string }[] | undefined,
  },
  {
    id: 3,
    title: "EmailCRM Autopilot",
    kind: "Automation",
    description: "A daily outreach loop that syncs my inbox and drafts replies and cold emails into an approval queue. Python owns Gmail and the filesystem, Claude handles judgment, and nothing sends without my approval.",
    githubUrl: "https://github.com/Verma0118/email-autopilot" as string | null,
    tags: ["Python", "Gmail API", "React", "Claude"],
    steps: undefined as string[] | undefined,
    images: undefined as { src: string; alt: string; label: string }[] | undefined,
  },
  {
    id: 4,
    title: "TVC Simulator",
    kind: "Simulation",
    description: "Thrust Vector Control simulator built in Python. Models gimbal-actuated rocket engine dynamics for attitude control during powered flight.",
    githubUrl: "https://github.com/Verma0118/TVC_Simulator_V1" as string | null,
    tags: ["Python", "Simulation", "Controls", "Aerospace"],
    steps: undefined as string[] | undefined,
    images: undefined as { src: string; alt: string; label: string }[] | undefined,
  },
];

// Simulation & analysis projects, MATLAB / Simulink, no GitHub repo
export const simulationProjects = [
  {
    id: 1,
    title: "Cascaded Flight Controller for Pitch, Roll, and Yaw",
    category: "Simulink and Controls",
    dateRange: "2026",
    description: "Built a multi-axis PID attitude-control system in Simulink from first principles, derived plant transfer functions from Newton's second law, tuned via manual and Ziegler-Nichols methods, then restructured pitch into a cascaded inner-rate/outer-angle architecture matching real flight-controller designs (Betaflight, PX4). Diagnosed and fixed derivative-kick and noise-amplification issues by isolating root cause (excessive D gain) rather than patching with filters, and validated disturbance rejection against injected wind-gust and sensor-noise models.",
    tags: ["Simulink", "PID Control", "MATLAB", "Controls Theory"],
    images: [
      { src: "/projects/simulink-response.png", alt: "Plot of the pitch angle response to a step command with sensor noise and a wind disturbance", label: "Response" },
      { src: "/projects/simulink-diagram.png", alt: "Simulink block diagram of the cascaded angle and rate controller with sensor noise and wind injection", label: "Block diagram" },
    ],
  },
  {
    id: 2,
    title: "CAD-to-FEA Pipeline for a NACA 0012 Airfoil",
    category: "MATLAB PDE Toolbox and FEA",
    dateRange: "2026",
    description: "Generated NACA 0012 airfoil geometry programmatically in MATLAB, built the 3D solid in Fusion 360, and imported it into MATLAB's Structural Mechanics FEA solver for stress/displacement analysis under applied load. Ran a formal mesh convergence study, caught a stress singularity at an unfilleted corner, and corrected it through CAD redesign, then re-validated smooth convergence on the fixed geometry.",
    tags: ["MATLAB", "FEA", "Fusion 360", "Mesh Convergence"],
    images: [
      { src: "/projects/airfoil-profile.png", alt: "NACA 0012 airfoil profile plotted from the 4-digit equation", label: "Profile" },
    ],
  },
  {
    id: 3,
    title: "Hand-Validated Cantilever Bracket FEA",
    category: "MATLAB PDE Toolbox and FEA",
    dateRange: "2026",
    description: "Designed a dimensioned sheet-metal cantilever bracket and independently hand-calculated tip deflection and bending stress before simulating, then diagnosed a 10x discrepancy between hand calc and FEA by tracing it to an incorrect assumed load-face area, fixed by querying the true face area directly from the solved mesh. Reconciled the corrected FEA output against hand theory, attributing the remaining gap to bend-fillet compliance and hole stress concentration.",
    tags: ["MATLAB", "FEA", "Mechanics of Materials", "Fusion 360"],
    images: [
      { src: "/projects/cantilever-stress.png", alt: "von Mises stress contour on the cantilever bracket under a 50 newton load", label: "FEA result" },
      { src: "/projects/cantilever-drawing-v2.png", alt: "Dimensioned engineering drawing of the sheet-metal cantilever bracket", label: "Drawing" },
    ],
  },
];

// Class work, grouped by course. GLB files are in /public/glb/
export const classProjects = [
  {
    id: 1,
    code: "AE 140",
    name: "Introduction to CAD for Aerospace Engineers",
    models: [
      { id: 1,  name: "Chapter 7 Exercise 2",  glbFileUrl: "/glb/c07exe2.glb" },
      { id: 2,  name: "Chapter 7 Tutorial 3",  glbFileUrl: "/glb/c07tut3.glb" },
      { id: 3,  name: "Chapter 7 Tutorial 4",  glbFileUrl: "/glb/c07tut4.glb" },
      { id: 4,  name: "Chapter 10 Tutorial 1", glbFileUrl: "/glb/c10tut1.glb" },
      { id: 5,  name: "Chapter 10 Tutorial 2", glbFileUrl: "/glb/c10tut2.glb" },
      { id: 6,  name: "Homework 6 Model",         glbFileUrl: "/glb/hw06.glb" },
      { id: 7,  name: "Lava Lamp",                glbFileUrl: "/glb/lava-lamp.glb" },
      { id: 8,  name: "Spur Gear",                glbFileUrl: "/glb/gear.glb" },
      { id: 9,  name: "Front Sprocket",           glbFileUrl: "/glb/front-sprocket.glb" },
      { id: 10, name: "UAV Design v2",            glbFileUrl: "/glb/uav-v2.glb" },
    ],
  },
];
