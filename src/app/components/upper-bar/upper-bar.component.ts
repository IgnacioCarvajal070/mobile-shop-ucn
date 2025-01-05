import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-upper-bar',
  templateUrl: './upper-bar.component.html',
  styleUrls: ['./upper-bar.component.scss'],
  imports: [IonicModule]
})
/**
 * Componente barra superior utilizada en las paginas de la aplicacion.
 * Es una barra verde decorativa utilizada en la pagina de inicio de sesión.
 */
export class UpperBarComponent  implements OnInit {
  constructor() { }

  ngOnInit() {}

}
