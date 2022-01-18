import { FireService } from 'src/app/services/fire.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {

  constructor(private fireService: FireService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      await this.fireService.signIn()
      return true;
    }
    catch (ex) {
      console.log(ex)
      return false;
    }


  }
}
