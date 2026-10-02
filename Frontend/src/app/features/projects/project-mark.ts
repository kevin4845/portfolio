import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-project-mark',
  template: `
    <div class="relative aspect-[16/10] overflow-hidden bg-[#121a28]" aria-hidden="true">
      <div class="absolute inset-0" [style.background]="wash()"></div>
      <div class="hero-grid absolute inset-0"></div>
      <div class="absolute top-5 left-5 size-8 border-t border-l border-white/55"></div>
      <div class="absolute right-5 bottom-5 size-8 border-r border-b border-white/35"></div>
      <p class="absolute bottom-5 left-5 text-sm font-medium tracking-[0.16em] text-ink">
        {{ initials() }}
      </p>
    </div>
  `,
})
export class ProjectMark {
  readonly name = input.required<string>();

  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join(''),
  );

  protected readonly wash = computed(() => {
    const hash = [...this.name()].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const x = 18 + (hash % 64);
    return `radial-gradient(90% 85% at ${x}% 0%, rgb(176 196 220 / 38%), transparent 68%)`;
  });
}
