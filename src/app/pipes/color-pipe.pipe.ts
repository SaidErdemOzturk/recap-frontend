import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorPipe'
})
export class ColorPipePipe implements PipeTransform {
  transform(value: Color[], filterText: string): Color[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
     return filterText
      ? value.filter((x) => x.colorName.toLocaleLowerCase().indexOf(filterText)!==-1)
      : value;
  }

}
