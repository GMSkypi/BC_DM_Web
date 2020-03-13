import { Injectable, RootRenderer } from '@angular/core';

export interface UserDetail {
  fullName : String

  roles : {name : String}

  locality : String
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDetail : UserDetail = {
  fullName: null,
  roles : {name: null},
  locality : null
  }

  constructor() { }
}
