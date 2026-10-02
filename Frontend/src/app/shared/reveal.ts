import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class Reveal {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const node = this.element.nativeElement;

      const reduceMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const show = () => node.classList.add('is-visible');

      if (typeof IntersectionObserver === 'undefined' || reduceMotion) {
        show();
        return;
      }

      const rect = node.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        show();
        return;
      }

      node.classList.add('is-pending');
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            node.classList.remove('is-pending');
            show();
            observer.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );

      observer.observe(node);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
