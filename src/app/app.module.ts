import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { HttpClientModule } from '@angular/common/http';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

import { ToastrModule } from 'ngx-toastr';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarouselComponent } from './components/carousel/carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    NaviComponent,
    CarComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    ColorPipePipe,
    BrandPipePipe,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CarUpdateComponent,
    CarouselComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CalendarModule,
    StepperModule,
    FloatLabelModule,
    ButtonModule,
    FileUploadModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right",
      timeOut:5000,
    }),

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
