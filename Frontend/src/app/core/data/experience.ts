import { Experience } from '../models/experience';

/** Technical roles only. Consecutive entries at the same company render as one group. */
export const experience: readonly Experience[] = [
  { id: 'bluenordix-lead', company: 'BlueNordix' },
  { id: 'bluenordix-apprentice', company: 'BlueNordix' },
  { id: 'pcv-data', company: 'PCV Data' },
  { id: 'i-develop', company: 'i-develop' },
  { id: 'nordicscreen', company: 'NordicScreen' },
];
