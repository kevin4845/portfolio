import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTestingTransloco, useTestLanguage } from './core/i18n/testing';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), ...provideTestingTransloco()],
    }).compileComponents();
    useTestLanguage('en');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the name in the header', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header')?.textContent).toContain('Kevin Møller Madsen');
  });
});
