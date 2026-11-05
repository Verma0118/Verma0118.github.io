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
  currentFocus: "Compliance software for drone operators, and autonomous UAV systems",
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
    description: "Haylon Technologies builds hybrid battery management systems for defense and electric aerospace, and partnered with NOBE to develop a small interceptor drone. As project manager of a six-developer team, I built the 12-week roadmap, wrote every weekly deliverable and rubric, reviewed every developer's CAD and code, and ran the design competition that chose the final airframe. V2 reworks the winglet joint with a redesigned female-to-male adapter for better structural stability, encloses the winglet on all four sides, and adds fillets to every sharp corner based on MATLAB results.",
    tags: ["Autodesk Fusion", "3D Printing", "UAV", "Project Management", "NOBE"],
    glbFileUrl: "/glb/interceptor-winglet-v2.glb",
    link: { href: "/haylon-fea", label: "Build log and FEA" },
    slides: [
      {
        label: "Interceptor V2",
        title: "Haylon Technologies Interceptor Drone, V2",
        description: "Haylon Technologies builds hybrid battery management systems for defense and electric aerospace, and partnered with NOBE to develop a small interceptor drone. As project manager of a six-developer team, I built the 12-week roadmap, wrote every weekly deliverable and rubric, reviewed every developer's CAD and code, and ran the design competition that chose the final airframe. V2 reworks the winglet joint with a redesigned female-to-male adapter for better structural stability, encloses the winglet on all four sides, and adds fillets to every sharp corner based on MATLAB results.",
        tags: ["Autodesk Fusion", "MATLAB", "3D Printing", "UAV", "Project Management"],
        glbFileUrl: "/glb/interceptor-winglet-v2.glb",
      },
      {
        label: "Interceptor V1",
        title: "Haylon Technologies Interceptor Drone, V1",
        description: "The airframe that won the team design competition: a streamlined fuselage with four motor nacelles, screw-on winglets, and strap slots that lock the battery in place. V2 kept this layout and reworked the winglet adapter, winglet enclosure, and sharp corners.",
        tags: ["Autodesk Fusion", "3D Printing", "UAV", "Design Competition"],
        glbFileUrl: "/glb/interceptor-v2.glb",
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
    demoUrl: undefined as string | undefined,
    tags: ["JavaScript", "Three.js", "Vite", "Guidance", "State Machine"],
    steps: ["Detect", "Stabilize", "Track", "Guide"] as string[] | undefined,
    images: [
      { src: "/projects/sim-guidance.jpg", alt: "Haylon Intercept Sim during the guidance phase, with the interceptor tracking an inbound target along its trajectory", label: "Guidance" },
      { src: "/projects/sim-hit.jpg", alt: "Haylon Intercept Sim showing a completed intercept with the HIT result", label: "Intercept" },
    ] as { src: string; alt: string; label: string }[] | undefined,
  },
  {
    id: 2,
    title: "Volant Compliance Autopilot",
    kind: "Startup",
    description: "A drone operator films a walkaround, and Volant turns it into a Part 135-style compliance log. Computer-vision findings and flight telemetry combine into one verdict: compliant, conditional, or grounded.",
    githubUrl: null as string | null,
    demoUrl: "https://volant-compliance.vercel.app/" as string | undefined,
    tags: ["React", "TypeScript", "Computer Vision", "Vite"],
    steps: undefined as string[] | undefined,
    images: undefined as { src: string; alt: string; label: string }[] | undefined,
  },
  {
    id: 3,
    title: "EmailCRM Autopilot",
    kind: "Automation",
    description: "A daily outreach loop that syncs my inbox and drafts replies and cold emails into an approval queue. Python owns Gmail and the filesystem, Claude handles judgment, and nothing sends without my approval.",
    githubUrl: "https://github.com/Verma0118/email-autopilot" as string | null,
    demoUrl: undefined as string | undefined,
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
    demoUrl: undefined as string | undefined,
    tags: ["Python", "Simulation", "Controls", "Aerospace"],
    steps: undefined as string[] | undefined,
    images: undefined as { src: string; alt: string; label: string }[] | undefined,
  },
];

// Simulation & analysis projects, MATLAB / Simulink, no GitHub repo
export const simulationProjects = [
  {
    id: 4,
    title: "Interceptor UAV Stress Analysis Campaign",
    category: "MATLAB PDE Toolbox and FEA",
    dateRange: "2026",
    featured: true,
    description: "Wrote the FEA deliverable for the Haylon interceptor team: the load cases, the PLA material model, and the mesh and safety-factor standard every developer had to meet in MATLAB PDE Toolbox. Reviewed all five part studies, caught the camera mount sitting at a 0.99 safety factor under a 35 m/s side impact, and turned the fillet and wall-thickness findings into the V2 airframe.",
    tags: ["MATLAB", "FEA", "Load Cases", "Design Review", "NOBE"],
    link: { href: "/haylon-fea#analysis", label: "Read the full analysis" },
    images: [
      { src: "/projects/fea/camera-stress.png", alt: "Von Mises stress plot of the camera mount under side impact, peaking near PLA yield at the attachment corner", label: "Camera mount" },
      { src: "/projects/fea/fuselage-stress.png", alt: "Von Mises stress plot of the fuselage at full throttle with peak stress at the arm tab roots", label: "Fuselage" },
      { src: "/projects/fea/winglet-stress.png", alt: "Von Mises stress plot of the winglet under 35 meter per second airflow", label: "Winglet" },
    ],
  },
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

// Haylon interceptor FEA (Deliverable 6). Source: Interceptor_UAV_FEA_Summary.pdf, Nov 2026.
// Rendered at /haylon-fea. status: "pass" | "flag" | "preliminary"
export type FeaStatus = "pass" | "flag" | "preliminary";

export const haylonFea = {
  title: "Interceptor Structural Analysis",
  route: "/haylon-fea",
  intro:
    "Deliverable 6 of the Haylon interceptor build. I wrote the deliverable and rubric, each developer ran a MATLAB PDE Toolbox stress simulation on the part they designed, and I reviewed and compiled the results. The fillet recommendations from this round went straight into Interceptor V2.",
  assumptions: [
    { value: "PLA", label: "Material, 3D printed" },
    { value: "3,500 MPa", label: "Young's modulus" },
    { value: "0.36", label: "Poisson's ratio" },
    { value: "50 MPa", label: "Yield strength" },
    { value: "2 mm", label: "Mesh element size" },
    { value: "2.0", label: "Required safety factor" },
  ],
  parts: [
    {
      id: "fuselage",
      name: "Fuselage Body",
      peakStress: "1.01 MPa",
      safetyFactor: "49.5",
      status: "pass" as FeaStatus,
      statusLabel: "Pass",
      summary:
        "The cylindrical central structure. It holds the battery through two strap-slot blocks and carries the four arms on bolted mounting tabs, so every load on the drone passes through it.",
      loadCase: "Full throttle",
      loadDetail:
        "Battery strap-slot blocks fixed, since they react the lift load in flight. Load applied at the 8 arm bolt holes: max thrust from four iFlight XING2 1404 motors at 100% throttle, 4.80 N each and 19.19 N total, giving a traction of 0.0857 MPa over 224.03 mm².",
      metrics: [
        { label: "Max von Mises stress", value: "1.01 MPa" },
        { label: "Max principal strain", value: "5.58e-4" },
        { label: "Max displacement", value: "0.0093 mm" },
        { label: "Safety factor", value: "49.5" },
      ],
      images: [
        { src: "/projects/fea/fuselage-stress.png", alt: "Von Mises stress plot of the fuselage at full throttle with peak stress at the arm tab roots", caption: "Von Mises stress. Peak of about 1.0 MPa at the arm tab roots where they meet the tube wall." },
        { src: "/projects/fea/fuselage-setup.png", alt: "Fuselage load setup with loaded arm bolt holes in red and fixed battery strap blocks in blue", caption: "Load setup. Red marks the loaded arm bolt holes, blue marks the fixed strap-slot blocks." },
        { src: "/projects/fea/fuselage-displacement.png", alt: "Displacement plot of the fuselage at full throttle viewed along the tube", caption: "Displacement, viewed along the tube. Max 0.0093 mm at the tab farthest from the strap slots." },
      ],
      verdict:
        "Peak stress sits at the base of the arm tabs, where each tab acts like a short cantilever and the sharp corner concentrates bending. At 1.01 MPa against 50 MPa yield, the fuselage has a 49x margin at full throttle. The hard-landing case is still to be run.",
      improvements: [
        "Fillet the tab roots (1 to 2 mm radius) where each arm tab meets the tube wall.",
        "Add gussets or move the strap slots so the four arms share load more evenly.",
        "Consider thinner walls or lower infill once the hard-landing case confirms margin.",
      ],
    },
    {
      id: "electronics",
      name: "Electronics Mounting Plate",
      peakStress: "0.016 MPa",
      safetyFactor: "> 2,000",
      status: "pass" as FeaStatus,
      statusLabel: "Pass",
      summary:
        "Mounts the ESP32 and SpeedyBee flight controller inside the nose cap. Two screws into heat-set inserts hold it to the cap, and four printed standoffs run between the two plates for rigidity.",
      loadCase: "5 g hard landing",
      loadDetail:
        "Electronics stack of about 20 g at 5 g gives 0.981 N, applied as a downward traction of 0.00520 MPa over the two screw-hole faces (188.476 mm²).",
      metrics: [
        { label: "Max von Mises stress", value: "0.016 MPa" },
        { label: "Safety factor", value: "> 2,000" },
        { label: "Standoffs", value: "Not modeled" },
      ],
      images: [
        { src: "/projects/fea/electronics-stress.png", alt: "Von Mises stress plot of the electronics mounting plate with peak stress at the screw hole edges", caption: "Von Mises stress at 5 g. Peak at the screw-hole edges, scale x10⁻³ MPa." },
      ],
      verdict:
        "The plate deforms in the direction the standoffs will resist, so real stiffness is well above the simulation. The only concern is the screw-hole edges, which are already filleted.",
      improvements: [
        "Re-run with the standoffs modeled as rigid supports for a tighter safety factor.",
        "Keep the screw-hole fillet radius on reprints and watch those edges in physical testing.",
      ],
    },
    {
      id: "winglet",
      name: "Winglet",
      peakStress: "0.0248 MPa",
      safetyFactor: "2,013",
      status: "pass" as FeaStatus,
      statusLabel: "Pass",
      summary:
        "Teardrop-shaped pieces that connect the fuselage to the motor nacelles, attached with two screws into heat-set inserts. In flight the top face takes aerodynamic pressure from forward travel.",
      loadCase: "Airflow at 35 m/s",
      loadDetail:
        "Dynamic pressure ½ρv² = 750 Pa, times a 1.2 drag factor for 900 Pa. Applied only to faces pointing into the flow with a custom windLoad function, over 872.6 mm² for a total of 0.79 N.",
      metrics: [
        { label: "Max von Mises stress", value: "0.0248 MPa" },
        { label: "Max principal strain", value: "9.42e-6" },
        { label: "Max displacement", value: "1.49e-4 mm" },
        { label: "Safety factor", value: "2,013" },
      ],
      images: [
        { src: "/projects/fea/winglet-stress.png", alt: "Von Mises stress plot of the winglet under 35 meter per second airflow with peak at the top corners", caption: "Von Mises stress. Peak of about 0.0248 MPa at the top attachment corners." },
        { src: "/projects/fea/winglet-displacement.png", alt: "Displacement plot of the winglet with the largest displacement at the base near the motor attachment", caption: "Displacement. Peak 1.49e-4 mm at the base near the motor attachment." },
      ],
      verdict:
        "A safety factor above 2,000 under flight loads. The stress peak at the sharp attachment corners is mesh-dependent but negligible, and it is the reason V2 fillets those corners and redesigns the winglet adapter.",
      improvements: [
        "Fillet the attachment corners (1 to 2 mm) to remove mesh-sensitive stress concentrations.",
        "Wall thickness can come down to save weight, the margin easily absorbs it.",
      ],
    },
    {
      id: "camera",
      name: "Camera Mount",
      peakStress: "50.26 MPa",
      safetyFactor: "0.99",
      status: "flag" as FeaStatus,
      statusLabel: "Flag, reinforce",
      summary:
        "Sits on top of the nose cap, held by two screws into heat-set inserts, and protects the AKK BA3 camera during intercept collisions. Reusing the drone depends on this part surviving impact.",
      loadCase: "Side impact at 35 m/s",
      loadDetail:
        "Drone mass of 0.25 kg stopping from 35 m/s in 5 ms gives 1,750 N, applied sideways over the 107 mm² side face as a 16.36 MPa traction. A deliberately conservative worst case.",
      metrics: [
        { label: "Max von Mises stress", value: "50.26 MPa" },
        { label: "Max principal strain", value: "0.0250" },
        { label: "Max displacement", value: "0.0433 mm" },
        { label: "Safety factor", value: "0.99" },
      ],
      images: [
        { src: "/projects/fea/camera-stress.png", alt: "Von Mises stress plot of the camera mount under side impact with peak near 50 megapascals at the attachment corner", caption: "Von Mises stress under a 1,750 N side impact. Peak of about 50.3 MPa at the attachment corner, right at PLA yield." },
        { src: "/projects/fea/camera-displacement.png", alt: "Displacement plot of the camera mount with peak displacement at the protruding side face", caption: "Displacement. Peak 0.04 mm at the protruding side face." },
      ],
      verdict:
        "The one part that failed the check. At 50.26 MPa it sits right at PLA's 50 MPa yield, because the impact lands on an unsupported face with only the screw holes reacting it. It has to be reinforced before flight.",
      improvements: [
        "Fillet all external edges (2 to 3 mm). The mount is currently fully square.",
        "Widen the contact face across the full side so impact spreads into more material.",
        "Add wall thickness or ribs on the side face to raise the section modulus.",
        "Print it in PETG or ABS for better impact toughness, since it sits in the collision path.",
      ],
    },
    {
      id: "nacelle",
      name: "Nacelle",
      peakStress: "0.977 MPa",
      safetyFactor: "51.2",
      status: "preliminary" as FeaStatus,
      statusLabel: "Pass, preliminary",
      summary:
        "Houses the motor at the tip of each arm and passes motor torque and thrust reaction into the arm assembly.",
      loadCase: "Preliminary surface traction",
      loadDetail:
        "Mounting surface fixed, 0.05 MPa traction applied in the -Z direction. A placeholder load, not yet tied to real motor thrust or torque.",
      metrics: [
        { label: "Max von Mises stress", value: "0.977 MPa" },
        { label: "Max principal strain", value: "5.01e-4" },
        { label: "Max displacement", value: "0.0033 mm" },
        { label: "Safety factor", value: "51.2" },
      ],
      images: [
        { src: "/projects/fea/nacelle-stress.png", alt: "Von Mises stress plot of the nacelle under the preliminary load with peak near 0.98 megapascals", caption: "Von Mises stress under the preliminary load. Peak of about 0.977 MPa." },
        { src: "/projects/fea/nacelle-displacement.png", alt: "Displacement plot of the nacelle under the preliminary load with max 0.0033 millimeters", caption: "Displacement under the same load. Max 0.0033 mm." },
      ],
      verdict:
        "Passes the preliminary load, but that does not yet prove the nacelle survives full motor thrust or torque at the screw holes. A second load case is required.",
      improvements: [
        "Compute the real traction from iFlight XING2 1404 thrust data and re-run.",
        "Add a motor-torque case at the screw holes.",
        "Repair the arm and motor-mount STL geometry, then run a finer mesh to rule out mesh artifacts.",
        "Fillet sharp transitions and thicken the walls around attachment points.",
      ],
    },
  ],
};

// Build log for the Haylon interceptor, from the team engineering journal.
export const haylonBuild = {
  entry: "Entry 1",
  date: "November 1, 2026",
  intro:
    "The project moved from CAD to physical parts on November 1. Every item on the BOM arrived, assembly started, and the first fall tests broke the original winglet adapter. The fixes written up in that session are what became the V2 airframe.",
  workCompleted: [
    "Received every part on the BOM and staged the first full build session.",
    "Started installation, with everyone getting hands-on practice on the soldering iron and heat-set inserts.",
    "Widened the ESP32 slots on the old holder to test-fit the board and see how much the electronics bay had to change.",
  ],
  problems: [
    {
      problem: "Heat-set insert holes too small",
      happened: "Inserts went in hard and not always straight.",
      fix: "Every insert hole set to a 3.70 mm inner diameter.",
    },
    {
      problem: "Electronics holder does not fit the ESP32",
      happened: "Our boards have no mounting holes, and the pin headers hit the plate.",
      fix: "New modular electronics bay sized for our ESP32.",
    },
    {
      problem: "Winglet male adapter on the fuselage",
      happened: "Snapped off too easily and did not survive fall tests.",
      fix: "Four-wall design with a hollow center and thicker walls.",
    },
  ],
  changes: [
    { part: "Winglet male adapter", change: "Four walls around a hollow center, every wall thickened and the base filleted." },
    { part: "Winglet adapter hole", change: "Opened from 5.0 mm to 6 mm on the fuselage." },
    { part: "Winglets", change: "Thicker for strength." },
    { part: "Electronics bay", change: "Redesigned around our ESP32, with chamfered standoff screw holes so the screws sit flush." },
    { part: "Heat-set insert holes", change: "3.70 mm inner diameter on every part." },
    { part: "Landing gear", change: "Filleted." },
  ],
  statusNote:
    "Each of these changes is queued for the next print round, then the four-wall adapter goes back through the same fall tests that broke the first one.",
  photos: [
    {
      src: "/projects/build/parts-kit.jpg",
      alt: "Printed interceptor parts laid out on a cutting mat, including red mounting plates, the black fuselage, four arms, and red nose cones",
      caption: "The printed part set laid out before assembly.",
      wide: true,
    },
    {
      src: "/projects/build/airframe-front.jpg",
      alt: "Assembled interceptor fuselage standing upright with two arms and red nose cones fitted to the nacelles",
      caption: "Fuselage and arms assembled, nose cones fitted to the nacelles.",
      wide: false,
    },
    {
      src: "/projects/build/airframe-top.jpg",
      alt: "Top view of the assembled interceptor frame showing four arms, red nose cones, and the open electronics bay at the center",
      caption: "Top view. The electronics bay sits open at the center of the fuselage.",
      wide: false,
    },
    {
      src: "/projects/build/build-session.jpg",
      alt: "Printed interceptor parts staged across a cutting mat on a workbench during a build session",
      caption: "Parts staged on the bench during the first build session.",
      wide: true,
    },
  ],
};
