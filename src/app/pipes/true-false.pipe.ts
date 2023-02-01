import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trueFalse',
  standalone: true
})
export class TrueFalsePipe implements PipeTransform {

  transform(value: boolean): "Sí" | "No" {
    if(value === true) {
      return "Sí"
    }else{
      return "No"
    }
  }

}
