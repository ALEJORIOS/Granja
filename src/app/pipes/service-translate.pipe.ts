import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviceTranslate',
  standalone: true
})
export class ServiceTranslatePipe implements PipeTransform {

  translateObject: any = {
    first: "Primer Servicio",
    second: "Segundo Servicio",
    third: "Tercer Servicio",
    fourth: "Cuarto Servicio"
  }

  transform(value: string): string {
    return this.translateObject[value];
  }

}
