import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-section-card',
  imports: [MatCardModule, MatIconModule, MatChipsModule, MatDividerModule],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss',
})
export class SectionCardComponent {
  @Input() type?: 'About' | 'Experience' | 'Education' | 'Skills';
  @Input() items?: any[];
  @Input() content?: string;
  @Input() birthday?: string;
}
