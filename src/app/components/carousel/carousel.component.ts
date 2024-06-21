import { Component, Input, OnInit } from '@angular/core';
import { CarDetailWithImagesDto } from '../../models/carDetailWithImagesDto';
import { CarImageService } from '../../services/car-image.service';
import { CarImage } from '../../models/carImage';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() carDetail: CarDetailWithImagesDto;
  defaultImagePath = "assets/images/default.png";
  localhostImagePath = "http://localhost:5197/Uploads/Images/";
  currentImage: CarImage;
  currentIndex: number = 0;

  constructor(private imageService: CarImageService) { }

  ngOnInit(): void {
    // Initially set the current image to the first image
    if (this.carDetail.images && this.carDetail.images.length > 0) {
      this.currentImage = this.carDetail.images[0];
      this.imageService.selectImage(this.currentImage)
    }
  }

  setCarouselItemActive(index: number): string {
    return index === this.currentIndex ? 'carousel-item active' : 'carousel-item';
  }

  setImage(image: CarImage): string {
    return this.localhostImagePath + image.imagePath;
  }

  // Function to handle slide change on button click
  changeSlide(direction: string): void {
    if (direction === 'prev') {
      this.currentIndex=this.currentIndex==0?this.carDetail.images.length-1:this.currentIndex-1

    } else if (direction === 'next') {
      this.currentIndex = (this.currentIndex + 1) % this.carDetail.images.length;
    }
    this.currentImage = this.carDetail.images[this.currentIndex];
    this.imageService.selectImage(this.currentImage)
  }
}
