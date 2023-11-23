import { Component } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RecaptchaService } from 'src/app/services/recaptcha.service';

@Component({
  selector: 'app-chaptcha',
  templateUrl: './chaptcha.component.html',
  styleUrls: ['./chaptcha.component.scss']
})
export class ChaptchaComponent {
  public robot: boolean;
  public presionado: boolean;
 
  constructor( private httpService: RecaptchaService,  private recaptchaV3Service: ReCaptchaV3Service) {
    this.robot = true;
    this.presionado = false;
  }
 
  ngOnInit(): void {
    this.robot = true;
    this.presionado = false;
  }
 
  getInfoRecaptcha() {
    this.robot = true;
    this.presionado = true;
    this.recaptchaV3Service.execute('')
      .subscribe((token) => {
          const auxiliar = this.httpService.getTokenClientModule(token)
          auxiliar.subscribe( {
            complete: () => {
              this.presionado = false;
            },
            error: () => {
              this.presionado = false;
              this.robot = true;
              alert('Tenemos un problema, recarga la página página para solucionarlo o contacta con 1938web@gmail.com');
            },
            next: (resultado: Boolean) => {
              if (resultado === true) {
                this.presionado = false;
                this.robot = false;
              } else {
                alert('Error en el captcha. Eres un robot')
                this.presionado = false;
                this.robot = true;
              }
            }
          });
        }
      );
  }
}
