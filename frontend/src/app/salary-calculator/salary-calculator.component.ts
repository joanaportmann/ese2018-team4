import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salary-calculator',
  templateUrl: './salary-calculator.component.html',
  styleUrls: ['./salary-calculator.component.css']
})
export class SalaryCalculatorComponent {

  basis: string;
  hourly: number;
  monthly: number;
  yearly: number;
  hoursPerDay: number = 8.4;
  private readonly daysPerMonth = 21;
  partsPerYear: number = 13;
  percentage: number = 100;

  constructor() { }

  private round(num: number) : number {
   return  Math.round(num * 100) / 100;
  }

  update() {
    if(this.basis === 'hourly') {
      this.monthly = this.round(this.daysPerMonth * this.hoursPerDay * this.hourly * (this.percentage/100));
      this.yearly = this.round(this.monthly * this.partsPerYear);
    }
    if(this.basis === 'monthly') {
      this.yearly = this.round(this.monthly * this.partsPerYear);
      this.hourly = this.round(this.monthly / (this.daysPerMonth * this.hoursPerDay * (this.percentage/100)));
    }
    if(this.basis === 'yearly') {
      this.monthly = this.round(this.yearly / this.partsPerYear);
      this.hourly = this.round(this.monthly / (this.daysPerMonth * this.hoursPerDay * (this.percentage/100)));
    }
  }

}
