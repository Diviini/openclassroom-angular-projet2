import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, mapTo, of } from "rxjs";
import { ComplexFormValue } from "../models/complex-form-value.model";
import { environment } from "src/environments/environment.development";

@Injectable()
export class ComplexFormService {

    constructor(private http: HttpClient) { }

    saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
        return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
            mapTo(true),
            delay(30000),
            catchError(() => of(false).pipe((
                delay(15000)
            )))
        )
    }
}