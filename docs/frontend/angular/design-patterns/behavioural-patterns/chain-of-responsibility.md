# Chain of Responsibility

Use case: Passing a request along a chain of handlers until one handles it.

Example: Angular's HTTP interceptors that process HTTP requests/responses.

How to find: Look for implementations of HttpInterceptor and the use of next.handle().

Explanation:

The Chain of Responsibility pattern allows an event to be processed by multiple handlers, one after the other, until it is handled. In Angular, HTTP interceptors form a chain where each interceptor can modify the request or response and then pass it along to the next interceptor.

```js
// auth.interceptor.ts
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = "Bearer xyz123";
    const authReq = req.clone({
      setHeaders: { Authorization: authToken },
    });
    return next.handle(authReq);
  }
}

// logging.interceptor.ts
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Outgoing request", req);
    return next.handle(req);
  }
}

// app.module.ts
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
})
export class AppModule {}
```

- Multiple interceptors (AuthInterceptor, LoggingInterceptor) are applied in sequence.
- Each interceptor can handle the request and pass it to the next one using next.handle(req).
- This forms a chain of responsibility where each interceptor has the opportunity to process the request.
