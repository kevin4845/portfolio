import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  template: `
    <div class="max-w-2xl">
      <p class="text-xs font-medium tracking-[0.18em] text-faint uppercase">{{ label() }}</p>
      <h2
        class="section-title mt-3 font-medium text-balance text-ink"
        [attr.id]="headingId()"
      >
        {{ title() }}
      </h2>
      @if (intro()) {
        <p class="mt-4 text-base leading-relaxed text-muted md:text-lg">{{ intro() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly label = input.required<string>();
  readonly title = input.required<string>();
  readonly intro = input<string>();
  readonly headingId = input<string>();
}
