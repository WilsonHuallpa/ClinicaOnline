import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-favbutton',
  templateUrl: './favbutton.component.html',
  styleUrls: ['./favbutton.component.scss'],
  animations: [
    trigger('listAnimation', [
      state(
        'hidden',
        style({
          opacity: 0,
          height: '0px',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          height: 'auto',
        })
      ),
      transition('hidden => visible', animate('0.5s ease-in-out')),
      transition('visible => hidden', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class FavbuttonComponent {
  @Input() imageUrl: string = '';
  @Input() buttonText: string = '';
  @Output() buttonClick = new EventEmitter<{
    email: string;
    password: string;
  }>();

  dataArray: { img: string; mail: string; contrasena: string }[] = [
    {
      img: '../../../assets/avatar-de-hombre.png',
      mail: 'wilson@gmail.com',
      contrasena: '123456',
    },
    {
      img: '../../../assets/avatar.png',
      mail: 'pepe@gmail.com',
      contrasena: '123456',
    },
    {
      img: '../../../assets/nino.png',
      mail: 'wilsonhuallpro@gmail.com',
      contrasena: '123456',
    }
  ];

  handleLinkClick(email: string, password: string) {
    this.buttonClick.emit({ email, password });
  }
}
