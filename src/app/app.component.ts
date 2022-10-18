import { Component } from '@angular/core';
//SE TIVER PROBLEMA, DESCOMENTE A LINHA DE BAIXO
// import * as Materialize from 'materialize-css';

//SE AINDA TIVER PROBLEMA, RECOMENTE A DE CIMA E DESCOMENTE A LINHA DE BAIXO
import * as M from 'materialize-css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product Manager';
}
