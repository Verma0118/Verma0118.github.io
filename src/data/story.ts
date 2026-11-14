import { simulationProjects, haylonBuildEntries, softwareProjects } from "./portfolio";

// ─── Story act ─────────────────────────────────────────────────────────────
// The scroll narrative that opens the home page, before the browsable sections.
//
// Rules for editing this file:
//  - Every metric value must already be true somewhere in portfolio.ts. Do not
//    invent precision. If a number changes there, change it here.
//  - Evidence images are derived from portfolio.ts rather than restated, so
//    alt text and file paths stay in one place.
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

export type EvidenceItem = {
  src: string;
  alt: string;
  /** Short caption under the thumbnail. Omit where the image speaks for itself. */
  label?: string;
  href?: string;
  page?: boolean;
};

export type StoryEvidence = {
  items: EvidenceItem[];
  /** Columns on large screens. Phones always collapse to two. */
  cols: number;
  /** Tailwind aspect ratio class for each cell. */
  aspect: string;
};

/**
 * A labelled point on the interceptor, anchored to a real surface coordinate
 * measured by raycasting the loaded GLB. The model is a single merged mesh
 * with one unnamed material, so parts cannot be isolated or recoloured; a
 * callout plus a camera move is the honest way to point at a component.
 */
export type GuideCallout = {
  label: string;
  /** Model-space metres. Must sit on the surface or the marker floats. */
  position: [number, number, number];
  normal: [number, number, number];
};

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
  /** True on the beat where the fixed guide is itself the visual. */
  guideIsVisual?: boolean;
  evidence?: StoryEvidence;
};

// ─── Evidence pulled from portfolio.ts ─────────────────────────────────────

const feaCampaign = simulationProjects.find((p) => p.id === 4)!;
const entryTwo = haylonBuildEntries.find((e) => e.id === "entry-2")!;
const interceptSim = softwareProjects.find((p) => p.id === 1)!;

/** Image label in the campaign -> part id on the analysis page. */
const FEA_PART_ID: Record<string, string> = {
  "Camera mount": "camera",
  Fuselage: "fuselage",
  Winglet: "winglet",
  Electronics: "electronics",
  Nacelle: "nacelle",
};

// All five studies, each linking to its own part on the analysis page.
const feaEvidence: EvidenceItem[] = feaCampaign.images.map((img) => ({
  src: img.src,
  alt: img.alt,
  label: img.label,
  href: `/haylon-fea#${FEA_PART_ID[img.label] ?? "analysis"}`,
  page: true,
}));

const buildEvidence: EvidenceItem[] = entryTwo.photos.slice(0, 6).map((p) => ({
  src: p.src,
  alt: p.alt,
  href: "/haylon-fea#entry-2",
  page: true,
}));

const softwareEvidence: EvidenceItem[] = (interceptSim.images ?? []).map((img) => ({
  src: img.src,
  alt: img.alt,
  label: img.label,
  href: interceptSim.githubUrl ?? undefined,
}));

// ─── Beats ─────────────────────────────────────────────────────────────────

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
    guideIsVisual: true,
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
    evidence: { items: feaEvidence, cols: 5, aspect: "aspect-[4/3]" },
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
    evidence: { items: buildEvidence, cols: 3, aspect: "aspect-[4/3]" },
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
    evidence: { items: softwareEvidence, cols: 2, aspect: "aspect-[16/10]" },
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

// ─── The guide ─────────────────────────────────────────────────────────────

export type GuidePose = {
  /** Horizontal offset from viewport centre, in vw. Keep positive: the text
   *  lane runs to 52% and cream type over a white fuselage is unreadable. */
  x: number;
  /** Vertical offset from viewport centre, in vh. */
  y: number;
  /** Size of the viewer box itself, on top of the camera framing. */
  scale: number;
  azimuth: number;
  /** Degrees from vertical. Varying this stops the motion reading as a spin. */
  polar: number;
  /** Camera distance in metres. The model is ~0.25 m across, so 0.2 is close
   *  enough to read a single component and 0.55 frames the whole airframe. */
  radius: number;
  /** What the camera looks at, in model metres. */
  target: [number, number, number];
  /** Higher over the dark beats so the white airframe reads. */
  exposure: number;
};

/**
 * Surface points measured by raycasting the loaded model, not guessed. The
 * fuselage runs along Z with the nose at about z = +0.10; the arms sit at
 * y = +-0.099 around z = -0.027.
 */
export const GUIDE_LANDMARKS = {
  nose: [0.008, -0.018, 0.1] as [number, number, number],
  armRoot: [0.025, 0.011, -0.049] as [number, number, number],
  motor: [0.012, 0.099, -0.027] as [number, number, number],
};

/**
 * One pose per beat, same order and length as storyBeats.
 *
 * Each beat gets a genuinely different camera move rather than one continuous
 * spin: radius, polar angle and target all change, so the story reads as
 * establishing shot, detail, detail, system view. An earlier version only
 * swept azimuth at a fixed distance and read as a turntable gimmick.
 *
 * Azimuth deliberately is NOT monotonic. Letting the camera swing back the
 * other way between beats (+90, -70, -69, +84, +60) both avoids 300 degree
 * spins on a single scroll and keeps the motion from feeling repetitive.
 * The nose only faces the camera around azimuth 270 to 90, so any beat that
 * needs to show the nose has to sit in that range.
 *
 * Every angle here was checked against a render, not reasoned about. Re-check
 * with a screenshot if you change one: several plausible-looking framings came
 * out as a featureless white tube or a crop with the fuselage cut off.
 */
export const guidePoses: GuidePose[] = [
  // Hero: distant three-quarter view of the whole aircraft.
  { x: 29, y: 13, scale: 1.0, azimuth: 35, polar: 72, radius: 0.62, target: [0, 0, 0], exposure: 1.55 },
  // Design: full airframe from above and behind. All four arms, props and
  // tail read clearly, which is the point of the design beat.
  { x: 28, y: -2, scale: 1.0, azimuth: 125, polar: 64, radius: 0.42, target: [0, 0, -0.01], exposure: 1.0 },
  // Analysis: in on the nose, the part that came back at 0.99.
  { x: 29, y: -4, scale: 1.0, azimuth: 55, polar: 72, radius: 0.24, target: [0, 0, 0.055], exposure: 1.55 },
  // Build: near-front, high, showing the four motor nacelles wired together.
  { x: 28, y: 2, scale: 1.0, azimuth: -14, polar: 50, radius: 0.44, target: [0, 0.01, -0.015], exposure: 1.0 },
  // Software: pulled back and well overhead, the whole system at once.
  { x: 29, y: -3, scale: 1.0, azimuth: 70, polar: 40, radius: 0.54, target: [0, 0, 0], exposure: 1.55 },
  // Handoff: recedes and fades out before the link grid arrives.
  { x: 30, y: 18, scale: 1.0, azimuth: 130, polar: 70, radius: 0.72, target: [0, 0, 0], exposure: 1.0 },
];

/** Callout shown on each beat, by beat id. Beats absent here show none, which
 *  keeps the device from becoming a tic. */
export const guideCallouts: Record<string, GuideCallout> = {
  "story-design": {
    label: "Winglet adapter, four walls",
    position: GUIDE_LANDMARKS.armRoot,
    normal: [0.91, 0.42, 0],
  },
  "story-analysis": {
    label: "Camera mount, 0.99 safety factor",
    position: GUIDE_LANDMARKS.nose,
    normal: [0.08, -0.18, 0.98],
  },
  "story-build": {
    label: "Four motors, one ESC",
    position: GUIDE_LANDMARKS.motor,
    normal: [0.12, 0.99, 0],
  },
};

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
