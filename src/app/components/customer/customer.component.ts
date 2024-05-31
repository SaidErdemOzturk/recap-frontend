import { Component, OnInit } from '@angular/core';
import { CustomerDto } from '../../models/customerDto';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  customersDto: CustomerDto[] = [];

  constructor(private customerService: CustomerService) {}
  ngOnInit(): void {
    this.getCustomersDto();
  }

  getCustomersDto() {
    this.customerService.getCustomersDto().subscribe((response) => {
      this.customersDto = response.data;
    });
  }
}
