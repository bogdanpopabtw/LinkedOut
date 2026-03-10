import { Directive, HostBinding, Input, OnInit, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: '[appTechIcons]',
  host: {
  '[style.color]':'iconColor'
  }
})
export class TechIconsDirective implements OnInit {
  @Input() rowHeadline?: string;

  iconColor = '';

  private matIcon = inject(MatIcon, { self: true });
  private readonly techIcons = [
  { keyword: 'angular', name: 'angular-custom', color: 'red' },
  { keyword: 'typescript', name: 'typescript-custom', color: 'dodgerblue' },
  { keyword: 'javascript', name: 'javascript-custom', color: 'yellow' },
  { keyword: 'nestjs', name: 'nestjs-custom', color: 'crimson' },
  { keyword: 'node', name: 'nodejs-custom', color: 'green' },
  { keyword: 'rxjs', name: 'rxjs-custom', color: 'pink' },
  { keyword: 'html', name: 'html-custom', color: 'orange' },
  { keyword: 'css', name: 'css-custom', color: 'royalblue' },
  { keyword: 'sql', name: 'sql-custom', color: 'darkgray' },
  { keyword: 'git', name: 'git-custom', color: 'orange' },
  ];

  ngOnInit(): void {
    this.loadIcon();
  }

  private loadIcon(): void {
    const headline = this.rowHeadline;
    if(!headline){
      return;
    }
    const headlineLower = headline.toLowerCase();

    const correctIcon = this.techIcons.find(tech => headlineLower.includes(tech.keyword));
    if(correctIcon) {
      this.matIcon.svgIcon = correctIcon.name;
      this.iconColor = correctIcon.color;
    }
  }
}

