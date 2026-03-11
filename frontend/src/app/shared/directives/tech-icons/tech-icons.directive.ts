import { Directive, HostBinding, Input, OnInit, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Skill } from '../../models/skill.model';

@Directive({
  selector: '[appTechIcons]',
  host: {
    '[style.color]': 'iconColor',
  }
})
export class TechIconsDirective implements OnInit {
  private matIcon = inject(MatIcon, { self: true });

  @Input() rowSkills?: Skill[];

  public iconColor = '';

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
    if (!this.rowSkills?.length) {
      return;
    }

    for (const skill of this.rowSkills) {
      const skillLower = skill.name.toLowerCase();
      const correctIcon = this.techIcons.find((tech) => skillLower.includes(tech.keyword));

      if (correctIcon) {
        this.matIcon.svgIcon = correctIcon.name;
        this.iconColor = correctIcon.color;
        return;
      }
    }
  }
}

