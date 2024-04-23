import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, from, throwError } from 'rxjs';
import { Utility } from 'src/app/constants/utility';
//import { TokenService } from '../services/auth/token.service';
import { CommonmasterService } from '../services/common/commonmaster.service';
import { TokenService } from '../services/auth/token.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  decryptionBlock: boolean = environment.decryptionBlock; 

  constructor(private commonService: CommonmasterService, private tokenService: TokenService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): any {
    if (this.tokenService.isTokenExprire) {
      return next.handle(req);
    } else {
      //return from(this.handle(req, next));
      return this.handle(req, next);
    }
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    let token = null
    let decryptionBlock = false;
    return this.tokenService.getToken().then(tokenValue => {
      token = tokenValue

      let newHeaders = req.headers;
      newHeaders = newHeaders.append("CorelationId", Utility.getSessionCorelationId());
      newHeaders = newHeaders.append("Content-Type", "application/json");


      if (token && newHeaders.get("Authorization") == null) {
        newHeaders = newHeaders.append("Authorization", `Bearer ${this.commonService.sessionStorageData.authToken}`);
      }

      let newBody = req.body;
      var kv = Utility.KeyIv();
      var KV = Utility.createEncryptedKV(kv);
      newHeaders = newHeaders.append("kv", KV);

      if (this.decryptionBlock && req.method.toLowerCase() === 'post') {
        if (kv != undefined && kv != null && kv != "") {
          var enBody = Utility.getEncryptedBody(newBody, kv);
          newBody = enBody;
        }
      }

      const authReq = decryptionBlock ? 
      req.clone({ headers: newHeaders, body: { msg: newBody } }) :
      req.clone({ headers: newHeaders, body: newBody });

    return next.handle(authReq).toPromise();
      //console.log("NEW BODY", newBody)
     // const authReq = req.clone({ headers: newHeaders, body: { msg: newBody } });
      //const authReq = req.clone({ headers: newHeaders, body: newBody  });

     // return next.handle(authReq).toPromise()
    })
    
  }

}

