import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { languageStorageKey } from '../../core/i18n/languages';
import { provideTestingTransloco, useTestLanguage } from '../../core/i18n/testing';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    localStorage.removeItem(languageStorageKey);
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([]), ...provideTestingTransloco()],
    }).compileComponents();
    useTestLanguage('en');
  });

  it('renders the portfolio sections', async () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    await fixture.whenStable();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Kevin Møller Madsen');
    expect(text).toContain("I like turning things that don't work into things that do.");
    expect(text).toContain('playing drums');
    expect(text).toContain('Data Technician');
    expect(text).toContain('BlueNordix');
    expect(text).toContain('Technical Lead');
    expect(text).toContain('Apprenticeship');
    expect(text).toContain('NordicScreen');
    expect(text).not.toContain('SPAR');
    expect(text).toContain('Pimena');
    expect(text).toContain('Where I learned the craft');
    expect(text).toContain('Vocational Education');
    expect(text).toContain('Mercantec · Viborg');
    expect(text).toContain('Specialization in Programming');
    expect(text).toContain('Tradium HTX');
    expect(text).not.toContain('not a university');
    expect(text).not.toContain('To be added');
    expect(text).toContain("Let's build something.");
    expect(fixture.nativeElement.querySelector('#skills-title')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#projects')).toBeTruthy();
    expect(text).toContain('Personal Portfolio');
    expect(fixture.nativeElement.querySelector('a[href="/projects/personal-portfolio"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('a[href="/projects/pimena"]')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('img[src="kevin01.jpg"]')?.getAttribute('alt'),
    ).toBe('Portrait of Kevin Møller Madsen.');
  });

  it('renders Danish on the first check when Danish is already active', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([]), ...provideTestingTransloco('da')],
    }).compileComponents();
    useTestLanguage('da');

    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Hvor jeg lærte håndværket');
    expect(text).toContain('Datatekniker');
    expect(text).toContain('Erhvervsuddannelse');
    expect(text).toContain('Personlig portfolio');
    expect(text).not.toContain('Where I learned the craft');
    expect(text).not.toContain('Data Technician');
    expect(text).not.toContain('not a university');
  });
});
