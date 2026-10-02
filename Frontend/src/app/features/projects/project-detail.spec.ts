import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { provideTestingTransloco, useTestLanguage } from '../../core/i18n/testing';
import { ProjectDetail } from './project-detail';

function headings(element: HTMLElement): string[] {
  return [...element.querySelectorAll('h2')].map((heading) => heading.textContent?.trim() ?? '');
}

async function render(slug: string): Promise<HTMLElement> {
  TestBed.resetTestingModule();
  await TestBed.configureTestingModule({
    imports: [ProjectDetail],
      providers: [
        provideRouter([]),
        Title,
        ...provideTestingTransloco(),
        {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(convertToParamMap({ slug })),
          snapshot: { paramMap: convertToParamMap({ slug }) },
        },
      },
    ],
  }).compileComponents();
  useTestLanguage('en');

  const fixture = TestBed.createComponent(ProjectDetail);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('ProjectDetail', () => {
  it('renders the written case study in template order and hides nothing that has content', async () => {
    const element = await render('personal-portfolio');

    expect(headings(element)).toEqual([
      'Overview',
      'My role',
      'Architecture',
      'Technical decisions',
      'Challenges',
      'Result',
      'Screenshots',
    ]);
    expect(element.textContent).toContain('Type');
    expect(element.textContent).toContain('Web application');
    expect(element.textContent).toContain('Visit site');
    expect(element.textContent).toContain('GitHub');
    expect(element.querySelectorAll('figure').length).toBe(7);
    expect(element.textContent).not.toContain('Why I built it');
  });

  it('omits case-study sections when a project has no write-up', async () => {
    const element = await render('pimena');

    expect(headings(element)).toEqual([]);
    expect(element.textContent).toContain('Pimena');
    expect(element.textContent).not.toContain('Visit site');
    expect(element.textContent).not.toContain('GitHub');
    expect(element.querySelector('app-project-mark, [aria-hidden="true"]')).toBeTruthy();
  });

  it('shows a missing state for an unknown slug', async () => {
    const element = await render('missing');

    expect(element.textContent).toContain('Project not found');
    expect(headings(element)).toEqual([]);
  });
});
