import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Currency {
  cc: string;
  rate: number;
}

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
  
})
export class HeaderComponent implements OnInit {
  currencies: Currency[] = [];
  exchangeRateMessage!: string;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getExchangeRate();
  }

  getExchangeRate() {
    const apiUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    
  
    this.http.get(apiUrl).subscribe((data: any) => {
      this.currencies = data;

      const usdCurrency = this.currencies.find(currency => currency.cc === 'USD');
      const eurCurrency = this.currencies.find(currency => currency.cc === 'EUR');

      if (usdCurrency && eurCurrency) {
        const usdRate = usdCurrency.rate;
        const eurRate = eurCurrency.rate;

      this.exchangeRateMessage = `USD/UAH: ${usdRate.toFixed(2)} | EUR/UAH: ${eurRate.toFixed(2)}`;
      };
    });
}
}
