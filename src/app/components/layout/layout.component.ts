import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export type Item = {
  title: string;
  link: string;
  active: boolean;
  children?: Item[];
};
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Input() items: Item[] = [];
  @Input() itemsAuth: Item[] = [];

}
