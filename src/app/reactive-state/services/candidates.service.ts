import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Candidate } from "../models/candidate.model";

@Injectable()
export class CandidatesService {
    
    constructor(private http: HttpClient) {}

    private _loading$ = new BehaviorSubject<boolean>(false);
    get loading$(): Observable<boolean>{
        return this._loading$.asObservable();
    }

    private _candidate$ = new BehaviorSubject<Candidate[]> ([]);
    get candidate$(): Observable<Candidate[]> {
        return this._candidate$.asObservable();
    }

    private setLoadingStatus(loading: boolean) {
        this._loading$.next(loading);
    }
}