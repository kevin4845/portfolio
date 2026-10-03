import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { environment } from '../../../environments/environment';
import { provideTestingTransloco, useTestLanguage } from '../../core/i18n/testing';
import { createRoutes } from '../../app.routes';

describe('maintenance routing', () => {
  async function open(url: string, maintenance: boolean): Promise<HTMLElement> {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      providers: [provideRouter(createRoutes(maintenance)), ...provideTestingTransloco()],
    }).compileComponents();
    useTestLanguage('en');
    const harness = await RouterTestingHarness.create(url);
    return harness.routeNativeElement ?? harness.fixture.nativeElement;
  }

  it('shows the maintenance page for every url when maintenance mode is on', async () => {
    for (const url of ['/', '/about', '/projects', '/projects/portfolio', '/experience', '/education', '/contact']) {
      const element = await open(url, true);
      expect(TestBed.inject(Router).url).toBe(url);
      expect(element.textContent).toContain('Under maintenance');
      expect(element.textContent).toContain('Kevin Møller Madsen');
      expect(element.textContent).not.toContain('View my work');
    }
  });

  it('follows the environment flag when no override is passed', () => {
    expect(environment.maintenanceMode).toBe(false);
    expect(createRoutes().some((route) => route.path === 'projects/:slug')).toBe(true);
  });

  it('keeps the existing routes when maintenance mode is off', async () => {
    const element = await open('/about', false);
    expect(TestBed.inject(Router).url).toBe('/');
    expect(element.textContent).toContain('View my work');
    expect(element.textContent).not.toContain('Under maintenance');
  });
});
