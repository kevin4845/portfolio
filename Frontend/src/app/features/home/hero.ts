import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './hero.html',
})
export class Hero {
  readonly name = input.required<string>();

  protected readonly nameLines = computed(() => {
    const parts = this.name().trim().split(/\s+/);
    if (parts.length < 2) {
      return [this.name()];
    }

    return [parts.slice(0, -1).join(' '), parts[parts.length - 1] ?? ''];
  });
}
