import { SkillGroup } from '../models/skill-group';

export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'frontend',
    skills: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS', 'PrimeNG'],
  },
  {
    id: 'backend',
    skills: ['PHP', 'Laravel', 'Node.js', 'REST APIs'],
  },
  {
    id: 'infrastructure',
    skills: ['Docker', 'AWS', 'Linux', 'Nginx', 'CI/CD'],
  },
  {
    id: 'data',
    skills: ['MySQL', 'Redis', 'Stripe', 'Cloudflare'],
  },
  {
    id: 'realtime',
    skills: ['WebRTC', 'Janus', 'mediasoup', 'WebSockets'],
  },
];
