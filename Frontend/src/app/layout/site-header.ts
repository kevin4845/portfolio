import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { TranslocoPipe } from '@jsverse/transloco';
import { Portfolio } from '../core/portfolio';
import { scrollBehavior } from '../core/motion';
import { LanguageSwitch } from './language-switch';

const navigation = ['about', 'skills', 'experience', 'projects', 'education', 'contact'] as const;

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, TranslocoPipe, LanguageSwitch],
  templateUrl: './site-header.html',
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class SiteHeader {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly portfolio = inject(Portfolio);
  protected readonly profile = this.portfolio.profile;
  protected readonly navigation = navigation;
  protected readonly open = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly active = signal('');

  constructor() {
    afterNextRender(() => {
      const onScroll = () => {
        this.scrolled.set(window.scrollY > 12);
        this.updateActiveSection();
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.closeMenu();
        requestAnimationFrame(() => this.updateActiveSection());
      });
  }

  protected toggleMenu(): void {
    this.open.update((open) => !open);
    if (this.open()) {
      queueMicrotask(() => document.getElementById('mobile-nav')?.querySelector('a')?.focus());
    }
  }

  protected closeMenu(): void {
    this.open.set(false);
  }

  protected goHome(): void {
    this.closeMenu();
    if (document.getElementById('top')) {
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    }
  }

  protected goTo(id: string): void {
    this.closeMenu();
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const onThisSection = this.router.url === '/' && this.active() === id;
    if (onThisSection) {
      target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    }
  }

  private updateActiveSection(): void {
    const nodes = document.querySelectorAll<HTMLElement>('[data-section]');
    if (!nodes.length) {
      this.active.set('');
      return;
    }

    let current = '';
    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top <= 160) {
        current = node.dataset['section'] ?? current;
      }
    });

    this.active.set(current);
  }
}
