import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByText'
})
export class SearchByTextPipe implements PipeTransform {

  transform(args: any[], txt: String): any[] {
    if (!args) return [];
    if (!txt) return args;

    txt = txt.toLowerCase();
    return args.filter(items => {
      if (items.UserName) {
        return items.UserName.toLowerCase().includes(txt);
      } else if (items.Username) {
        return items.Username.toLowerCase().includes(txt);
      } else if (items.GarageName) {
        return items.GarageName.toLowerCase().includes(txt);
      } else if (items.ZoneName) {
        return items.ZoneName.toLowerCase().includes(txt);
      }
     
    })

  }

}
