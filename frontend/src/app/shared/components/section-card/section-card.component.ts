import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RandomColorDirective } from '../../directives/random-color/random-color.directive';
import { Experience } from '../../models/experience.model';
import { Education } from '../../models/education.model';

type SectionCard = 
  { type: 'About'; content: string; birthday: string }
  | { type: 'Experience'; items: Experience[] } 
  | { type: 'Education'; items: Education[] } 
  | { type: 'Skills'; items: string[] };

@Component({
  selector: 'app-section-card',
  imports: [MatCardModule, MatIconModule, MatChipsModule, MatDividerModule, RandomColorDirective],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss',
})
export class SectionCardComponent {
  @Input() section!: SectionCard;
}
