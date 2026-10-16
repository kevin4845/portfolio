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
    expect(element.textContent).toContain('Status');
    expect(element.textContent).toContain('Live');
    expect(element.textContent).toContain('Visit site');
    expect(element.textContent).toContain('GitHub');
    expect(element.querySelectorAll('figure').length).toBe(7);
    expect(element.textContent).not.toContain('Why I built it');
  });

  it('renders the MC Profile case study and links to the Chrome Web Store', async () => {
    const element = await render('mc-profile');

    expect(headings(element)).toEqual([
      'Overview',
      'My role',
      'Architecture',
      'Technical decisions',
      'Challenges',
      'Result',
      'Screenshots',
    ]);
    expect(element.textContent).toContain('one API call on Mojang\'s site');
    expect(element.textContent).toContain('JavaScript');
    expect(element.textContent).toContain('HTML');
    expect(element.textContent).toContain('CSS');
    expect(element.textContent).toContain('Chrome extension');
    expect(element.textContent).toContain('Chrome Web Store');
    expect(element.querySelector('a[href="https://chromewebstore.google.com/detail/mc-profile/fecbenokgfbggkecbcdkjklneigffcmj"]')).toBeTruthy();
    expect(element.querySelector('a[href="https://github.com/kevin4845/MCProfileChromeExtension"]')).toBeTruthy();
    expect(element.querySelector('img[src="images/projects/mcprofile/thumbnail.png"]')).toBeTruthy();
    expect(element.querySelector('img[src="images/projects/mcprofile/logo.png"]')).toBeTruthy();
    expect(element.textContent).toContain('GitHub');
  });

  it('renders Elunio as a private product without a source link', async () => {
    const element = await render('elunio');
    const article = element.querySelector('article');

    expect(headings(element)).toEqual([
      'Overview',
      'My role',
      'Architecture',
      'Technical decisions',
      'Challenges',
      'Result',
      'Screenshots',
    ]);
    expect(element.textContent).toContain('In development');
    expect(element.textContent).toContain('Stripe is under development');
    expect(element.textContent).toContain('WordPress and Shopify embeds are planned');
    expect(element.textContent).toContain('not in production');
    expect(article?.querySelector('a[href*="github.com"]')).toBeNull();
    expect(article?.textContent).not.toContain('Visit site');
    expect(element.querySelector('img[src="images/projects/elunio/landing.png"]')).toBeTruthy();
    expect(element.querySelector('img[src="images/projects/elunio/edit-calculator.png"]')).toBeTruthy();
    expect(element.querySelectorAll('figure').length).toBe(9);
  });

  it('renders the Danish banknote case study and links to GitHub', async () => {
    const element = await render('danish-banknote-system');

    expect(headings(element)).toEqual([
      'Overview',
      'My role',
      'Architecture',
      'Technical decisions',
      'Challenges',
      'Result',
      'Screenshots',
    ]);
    expect(element.textContent).toContain('DanishBanknoteSystem');
    expect(element.textContent).toContain('online OCR engine');
    expect(element.textContent).toContain('seddelkataloget.dk');
    expect(element.querySelector('a[href="https://github.com/kevin4845/DanishBanknoteSystem"]')).toBeTruthy();
    expect(element.querySelector('img[src="images/projects/danishbanknotesystem/home.png"]')).toBeTruthy();
    expect(element.querySelector('img[src="images/projects/danishbanknotesystem/mywishlist.png"]')).toBeTruthy();
    expect(element.textContent).not.toContain('Visit site');
    expect(element.querySelectorAll('figure').length).toBe(5);
  });

  it('opens a screenshot larger and moves to the next image', async () => {
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
            paramMap: of(convertToParamMap({ slug: 'elunio' })),
            snapshot: { paramMap: convertToParamMap({ slug: 'elunio' }) },
          },
        },
      ],
    }).compileComponents();
    useTestLanguage('en');

    const fixture = TestBed.createComponent(ProjectDetail);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttons = [...fixture.nativeElement.querySelectorAll('.project-shot')] as HTMLButtonElement[];
    expect(buttons.length).toBeGreaterThan(1);
    buttons[0].click();
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    expect(dialog.open).toBe(true);
    expect(dialog.querySelector('img')?.getAttribute('src')).toBe('images/projects/elunio/landing.png');
    expect(dialog.textContent).toContain('1 / 8');

    dialog.querySelectorAll('button')[2].click();
    fixture.detectChanges();
    expect(dialog.querySelector('img')?.getAttribute('src')).toBe('images/projects/elunio/edit-calculator.png');
    expect(dialog.textContent).toContain('2 / 8');

    dialog.querySelectorAll('button')[0].click();
    fixture.detectChanges();
    expect(dialog.open).toBe(false);
  });

  it('shows a missing state for an unknown slug', async () => {
    const element = await render('missing');

    expect(element.textContent).toContain('Project not found');
    expect(headings(element)).toEqual([]);
  });
});
