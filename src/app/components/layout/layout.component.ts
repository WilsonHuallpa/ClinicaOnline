import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
export class LayoutComponent implements OnInit {
  // @Input() items: Item[] = [];
  // @Input() itemsAuth: Item[] = [];
  dataUser: any;
 constructor(private afAuth: AuthService, private router: Router){}
  logout() {
    this.afAuth.logout().then(() => {
      this.router.navigate(['/auth']);
    });
  }
  ngOnInit(): void {
    // this.afAuth
    //   .obtenerUserRegistrado()
    //   .then((user) => {
    //     if (user) {
    //       this.dataUser = user;
    //     } else {
    //       this.router.navigate(['/auth']);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error al obtener el usuario autenticado:', error);
    //   });
  }
 
}
