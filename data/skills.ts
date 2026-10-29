// Focus areas and grouped technical skills. Each skill appears in exactly one group.

export type FocusArea = { id: string; title: string; text: string; tags: string[] }

export const focusAreas: FocusArea[] = [
  {
    id: "safety-critical",
    title: "Safety-critical flight software",
    text: "Flight control software developed under DO-178C processes, where traceability, verification and determinism matter as much as features.",
    tags: ["C++", "DO-178C", "IBM DOORS"],
  },
  {
    id: "real-time",
    title: "Real-time embedded systems",
    text: "Software for embedded computing environments on real-time operating systems such as Green Hills INTEGRITY, plus custom C++ libraries for automation and data acquisition.",
    tags: ["INTEGRITY RTOS", "Embedded C++", "Real-time"],
  },
  {
    id: "model-based",
    title: "Model-based development",
    text: "Model-based development workflows in MATLAB/Simulink, alongside hand-written C++ and Qt desktop applications.",
    tags: ["MATLAB", "Simulink", "Qt"],
  },
  {
    id: "ai-research",
    title: "AI & medical imaging research",
    text: "M.Sc. research on region-aware super-resolution for MRI and CT segmentation, and earlier multimodal video–text research on a TÜBİTAK project.",
    tags: ["PyTorch", "Computer Vision", "Segmentation"],
  },
]

export const skillGroups: { title: string; skills: string[] }[] = [
  { title: "Languages", skills: ["C++", "C", "Python", "Java", "JavaScript", "SQL", "MATLAB"] },
  {
    title: "Aerospace & embedded",
    skills: ["DO-178C", "Green Hills INTEGRITY", "Real-time systems", "Embedded systems", "Control systems"],
  },
  { title: "Model-based design & verification", skills: ["Simulink", "VectorCAST", "IBM DOORS"] },
  {
    title: "AI & computer vision",
    skills: ["PyTorch", "Deep learning", "Medical image segmentation", "Super-resolution", "Multimodal learning"],
  },
  { title: "Application frameworks", skills: ["Qt", "Spring Boot", "React"] },
  { title: "Data & tooling", skills: ["PostgreSQL", "MySQL", "MongoDB", "Git", "Jenkins", "AWS"] },
]
