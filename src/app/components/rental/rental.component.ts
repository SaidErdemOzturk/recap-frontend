import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../services/rental.service';
import { Rental } from '../../models/rental';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreditCartService } from '../../services/credit-cart.service';
import { CreditCart } from '../../models/creditCart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent implements OnInit {

  rentals: Rental[] = []
  minRentalDate: Date | undefined;
  minReturnDate: Date | undefined;
  selectedRentalDate: Date
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  day = this.today.getDate();
  disabledDates: Date[] = []
  rentalDate: Date
  returnDate: Date
  tempDate: Date
  cartNumber: string=""
  expirationdate: string=""
  cvv: string=""
  creditCart: CreditCart = { cartNumber: "", cvv: "", expirationDate: "" }
  selectedDate1: Date
  selectedDate2: Date
  carId: number


  //currentDateAndTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  formGroup = this._formBuilder.group({
    date1: ['', Validators.required],
    date2: ['', Validators.required]
  })

  previewFormGroup = this._formBuilder.group({
    date1: [{ value: this.formGroup.get("date1")?.value, disabled: true }],
    date2: [{ value: this.formGroup.get("date2")?.value, disabled: true }]
  });


  constructor(private rentalService: RentalService,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private creditCartService: CreditCartService,
    private toastrService: ToastrService
  ) { }

  // Örnek bir tarih

  // DatePipe kullanarak tarihi istediğiniz formata dönüştürün

  ngOnInit(): void {
    //this.getRentalsDto();
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getRentalsByCarId(params["carId"])
        this.carId = params["carId"]
      }
    })
    this.minRentalDate = this.minReturnDate
    this.minRentalDate = new Date();
    this.minRentalDate.setMonth(this.month);
    this.minRentalDate.setFullYear(this.year);
    this.minRentalDate.setDate(this.day)
  }
  addDisabledDate() {
    let date = new Date(this.selectedDate1)
    date.setDate(date.getDate() + 1)
    this.minReturnDate = new Date(date)
  }


  payRental() {
    this.creditCart.cartNumber = this.cartNumber
    this.creditCart.expirationDate = this.expirationdate
    this.creditCart.cvv = this.cvv
    this.creditCartService.payWithCreditCart(this.creditCart).subscribe(response => {
      if (response.success) {
        this.rentalCar()
      } else {
        this.toastrService.error(response.message)
      }
    }, responseError => {
      console.log(responseError.error)
      if(responseError.error.Errors.length>0){
        for (let i = 0; i < responseError.error.Errors.length; i++) {
        this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
        }

      }
    });
  }

  rentalCar() {
    let rental: Rental = {
      id: 0,
      carId: this.carId,
      customerId: 0,
      rentDate: this.selectedDate1,
      returnDate: this.selectedDate2
    };
    this.rentalService.rentalCar(rental).subscribe(response => {
      this.toastrService.success(response.message)
    })
  }

  getRentalsByCarId(carId: number) {
    this.rentalService.getRentalsByCarId(carId).subscribe(response => {
      this.rentals = response.data
      this.rentals.forEach(element => {
        this.rentalDate = new Date(element.rentDate)
        this.returnDate = new Date(element.returnDate)
        this.disabledDates.push(new Date(element.rentDate))
        while (this.disabledDates[this.disabledDates.length - 1].getDate() != this.returnDate.getDate()) {
          this.tempDate = new Date(this.disabledDates[this.disabledDates.length - 1])
          this.tempDate.setDate(this.tempDate.getDate() + 1)
          this.disabledDates.push(new Date(this.tempDate))
        }
      });
    })
  }
}
