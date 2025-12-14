import { MuscleData, MuscleId } from './types';

export const MUSCLES: MuscleData[] = [
  {
    id: MuscleId.MR,
    name: "Medial Rectus",
    fullName: "Medial Rectus",
    actionDescription: "Inward (Adduction)",
  },
  {
    id: MuscleId.LR,
    name: "Lateral Rectus",
    fullName: "Lateral Rectus",
    actionDescription: "Outward (Abduction)",
  },
  {
    id: MuscleId.SR,
    name: "Superior Rectus",
    fullName: "Superior Rectus",
    actionDescription: "Upward (Elevation)",
  },
  {
    id: MuscleId.IR,
    name: "Inferior Rectus",
    fullName: "Inferior Rectus",
    actionDescription: "Downward (Depression)",
  },
  {
    id: MuscleId.SO,
    name: "Superior Oblique",
    fullName: "Superior Oblique",
    actionDescription: "Downward & Outward (Intorsion, Depression, Abduction)",
  },
  {
    id: MuscleId.IO,
    name: "Inferior Oblique",
    fullName: "Inferior Oblique",
    actionDescription: "Upward & Outward (Extorsion, Elevation, Abduction)",
  },
];

export const INTRO_TEXT = `
  Welcome to the EOM Laboratory. The Extraocular Muscles (EOM) are a set of six highly specialized muscles that control the movements of the eye. 
  
  Understanding their primary actions is crucial for diagnosing strabismus and other ocular motility disorders. In this memory game, you will test your knowledge by matching each muscle name to its corresponding animated eye movement.
`;

export const REMINDER_TEXT = `
  Remember to pay attention to which eye is being tested! 
  "Inward" for the Right Eye is towards the nose (Left), 
  while for the Left Eye, it is towards the nose (Right).
`;