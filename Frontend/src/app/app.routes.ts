import { Routes } from '@angular/router';
import { environment } from '../environments/environment';

/** Portfolio routes when the site is open. Unknown paths still return home. */
const portfolioRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((module) => module.Home),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./features/projects/project-detail').then((module) => module.ProjectDetail),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

/**
 * While maintenance mode is on, every URL renders the maintenance page.
 * The portfolio routes are not registered, so none of them can load.
 */
export function createRoutes(maintenance = environment.maintenanceMode): Routes {
  if (maintenance) {
    return [
      {
        path: '**',
        loadComponent: () =>
          import('./features/maintenance/maintenance').then((module) => module.Maintenance),
      },
    ];
  }

  return portfolioRoutes;
}

export const routes = createRoutes();
