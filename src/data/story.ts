// ─── Story act ─────────────────────────────────────────────────────────────
// The scroll narrative that opens the home page, before the browsable sections.
//
// Rules for editing this file:
//  - Every metric value must already be true somewhere in portfolio.ts. Do not
//    invent precision. If a number changes there, change it here.
//  - Headings state what the work is. No self-branding one-liners.
//  - Bodies stay at or under 25 words.
//  - Beat themes must keep alternating, because the fixed 3D guide swaps its
//    exposure on each boundary to stay legible.

export type StoryMetric = {
  /** Large display figure. Sourced from portfolio.ts, never invented. */
  value: string;
  /** What the figure counts. Sentence case, no trailing period. */
  label: string;
};

export type StoryVisual =
  | { type: "guide" }
  | { type: "image"; src: string; alt: string }
  | { type: "images"; items: { src: string; alt: string }[] };

export type StoryBeat = {
  id: string;
  kind: "hero" | "beat" | "handoff";
  theme: "dark" | "cream";
  /** Short label for the progress rail. One or two words. */
  railLabel: string;
  heading?: string;
  body?: string;
  metrics?: StoryMetric[];
  link?: { href: string; label: string; page?: boolean };
  visual?: StoryVisual;
};

/** Where the guide sits, per beat, in the fixed desktop layer. */
export type GuidePose = {
  /** Horizontal offset from viewport centre, in vw. */
  x: number;
  /** Vertical offset from viewport centre, in vh. */
  y: number;
  scale: number;
  /** Degrees. Monotonically increasing so the model turns one way throughout. */
  azimuth: number;
  /** model-viewer exposure. Higher over the dark beats so the airframe reads. */
  exposure: number;
};

export const storyBeats: StoryBeat[] = [
  {
    id: "story-open",
    kind: "hero",
    theme: "dark",
    railLabel: "Start",
  },
  {
    id: "story-design",
    kind: "beat",
    theme: "cream",
    railLabel: "Design",
    heading: "Six airframes and assemblies in Fusion and SolidWorks",
    body: "Each one modelled around how it would be printed or machined, and how it would come apart again for the next revision.",
    metrics: [
      { value: "6", label: "airframes and assemblies" },
      { value: "50+", label: "components on the drone BOM" },
      { value: "±0.05 mm", label: "drivetrain alignment held" },
    ],
    link: { href: "#cad-projects", label: "See the models" },
    visual: { type: "guide" },
  },
  {
    id: "story-analysis",
    kind: "beat",
    theme: "dark",
    railLabel: "Analysis",
    heading: "Five FEA studies before anything got printed",
    body: "Every part ran in MATLAB PDE Toolbox under its own load case. One came back under a safety factor of 1.",
    metrics: [
      { value: "0.99", label: "safety factor caught on the camera mount" },
      { value: "35 m/s", label: "side impact load case" },
      { value: "5", label: "part studies reviewed" },
    ],
    link: { href: "/haylon-fea#analysis", label: "Read the campaign", page: true },
    visual: {
      type: "image",
      src: "/projects/fea/camera-stress.png",
      alt: "Von Mises stress plot of the camera mount under side impact, peaking near PLA yield at the attachment corner",
    },
  },
  {
    id: "story-build",
    kind: "beat",
    theme: "cream",
    railLabel: "Build",
    heading: "The interceptor, wired and assembled",
    body: "V2 came off the printer in November. One session took it from loose subassemblies to a wired airframe with every screw driven home.",
    metrics: [
      { value: "4", label: "motors soldered to the ESC" },
      { value: "2", label: "problems found and fixed" },
      { value: "13", label: "build photos logged" },
    ],
    link: { href: "/haylon-fea#entry-2", label: "Read the build log", page: true },
    visual: {
      type: "images",
      items: [
        {
          src: "/projects/build/assembled-front.jpg",
          alt: "Front view of the fully assembled interceptor standing upright on its red landing legs, with the black fuselage body, four arms and red motor caps",
        },
        {
          src: "/projects/build/esc-motor-solder.jpg",
          alt: "Hands soldering motor leads onto the pads of the four-in-one ESC, with the soldering iron and the airframe arms on the bench",
        },
      ],
    },
  },
  {
    id: "story-software",
    kind: "beat",
    theme: "dark",
    railLabel: "Software",
    heading: "Guidance logic proven in simulation before hardware existed",
    body: "The interceptor's control law ran in a browser sim before any CAD. Volant turns a drone walkaround into a compliance log.",
    metrics: [
      { value: "4", label: "software projects" },
      { value: "3", label: "public repositories" },
      { value: "1", label: "live demo" },
    ],
    link: { href: "#software-projects", label: "See the software" },
    visual: {
      type: "image",
      src: "/projects/sim-guidance.jpg",
      alt: "Haylon Intercept Sim during the guidance phase, with the interceptor tracking an inbound target along its trajectory",
    },
  },
  {
    id: "story-handoff",
    kind: "handoff",
    theme: "cream",
    railLabel: "Everything",
    heading: "Everything, in detail",
    body: "The full work is below, in whatever order is useful.",
  },
];

/**
 * One pose per beat, same order and length as storyBeats.
 *
 * Azimuth only ever increases, so the model reads as a single object turning
 * rather than snapping between orientations.
 *
 * `x` must stay positive and large enough to keep the model clear of the text
 * lane, which runs to 52% of the viewport. An earlier version swung it to
 * negative x on alternating beats and the path crossed the headlines, leaving
 * cream type sitting on a white fuselage. Travel is vertical, in scale and in
 * rotation instead. If you change these, re-check every beat against the
 * heading at a narrow desktop width.
 */
export const guidePoses: GuidePose[] = [
  { x: 33, y: 16, scale: 0.75, azimuth: 35, exposure: 1.55 },
  { x: 27, y: -2, scale: 1.2, azimuth: 140, exposure: 1.0 },
  { x: 30, y: -12, scale: 0.8, azimuth: 230, exposure: 1.55 },
  { x: 26, y: 10, scale: 0.9, azimuth: 320, exposure: 1.0 },
  { x: 31, y: -6, scale: 0.78, azimuth: 410, exposure: 1.55 },
  { x: 30, y: 22, scale: 0.55, azimuth: 500, exposure: 1.0 },
];

/** The model that threads the whole story. Already Draco compressed, 1.3 MB. */
export const guideModelUrl = "/glb/interceptor-winglet-v2.glb";

export const guideModelAlt =
  "Haylon Technologies interceptor drone, version 2, with four winglet arms and motor nacelles";

/** Destinations offered at the handoff, where the site becomes clickable again. */
export const handoffLinks: { href: string; label: string; note: string; page?: boolean }[] = [
  { href: "#cad-projects", label: "CAD and simulation", note: "3D models you can turn" },
  { href: "#software-projects", label: "Software", note: "Sims, tooling and the startup" },
  { href: "#simulation-projects", label: "Analysis", note: "FEA and controls write-ups" },
  { href: "/class-projects", label: "Class work", note: "Coursework models", page: true },
  { href: "#about", label: "About", note: "Education, skills, organizations" },
  { href: "#contact", label: "Contact", note: "Email or send a message" },
];
