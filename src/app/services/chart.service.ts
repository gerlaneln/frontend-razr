import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as data from '../../assets/data/teste.json';
import * as categories from '../../assets/data/categories.json';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChartData } from '../models/chart-data.model';

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  api: string = environment.apiUrl;

  private data = data;
  private category = categories;

  constructor(private http: HttpClient) {}

  loadDataChart(id: number): Observable<ChartData>{
    return this.http.get<ChartData>(this.api+'/chart_data/load_chart'+id);
  }

  getData(): Observable<object[]> {
    return of(this.data);
  }
}

/*
    // template DAS "LINHAS":
    {

      "category": "categoria", //mesmo do cabeçalho - coluna a ser exibida
      "fromDate": "yyyy-MM-dd hh:mm", //data inicial a ser exibida como start no hover da tabela
      "toDate": "yyyy-MM-dd hh:mm", //data final a ser exibida como end no hover da tabela
      "columnSettings":{
        fill: am5.color(0x<HEXADECIMAL>), //novo formato de declaração de cor
      },
      "personnel" : NUMBER //declaração de quantidade de pessoas no mes
    }


    // template DAS "CATEGORIAS":
    //necessario para a exibição do produto no charts
    [
    {
      "category": "Gerlâne"
    }
  ]
*/
