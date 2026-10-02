import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SocialLink } from '../../core/models/social-link';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-contact',
  imports: [Reveal, TranslocoPipe],
  templateUrl: './contact.html',
})
export class Contact {
  readonly links = input.required<readonly SocialLink[]>();
}
