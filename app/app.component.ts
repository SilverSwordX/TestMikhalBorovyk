import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Currency {
  code: string;
  rate: number;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})
export class AppComponent {
  result!: number;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  currencies: Currency[] = [];
  convertedAmount: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

    this.http.get(apiUrl).subscribe((data: any) => {
      this.currencies = Object.keys(data.rates).map((code: string) => ({
        code,
        rate: data.rates[code],
      }));

      this.convert();
      
    });
  }

  convert(): void {
    if (this.amount && this.fromCurrency && this.toCurrency) {
      this.http.get<any>('https://api.exchangerate-api.com/v4/latest/USD').subscribe(data => {
        const fromRate = data.rates[this.fromCurrency];
        const toRate = data.rates[this.toCurrency];
        this.result = (this.amount / fromRate) * toRate;
      });
    }
  }
  reverseConvert(): void {
    if (this.result && this.toCurrency && this.fromCurrency) {
      this.http.get<any>('https://api.exchangerate-api.com/v4/latest/USD').subscribe(data => {
        const fromRate = data.rates[this.toCurrency];
        const toRate = data.rates[this.fromCurrency];
        this.amount = (this.result / fromRate) * toRate;
      });
    }
  }
  
}
