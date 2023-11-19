import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, delay, map, take, tap } from "rxjs";
import { Candidate } from "../models/candidate.model";
import { environment } from "src/environments/environment.development";

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

    private lastCandidatesLoad = 0;

    private setLoadingStatus(loading: boolean) {
        this._loading$.next(loading);
    }

    getCandidatesFromServer() {
        if(Date.now() - this.lastCandidatesLoad <= 300000) {
            return;
        }
        this.setLoadingStatus(true);
        this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
            delay(1000),
            tap(candidates => {
                this.lastCandidatesLoad = Date.now();
                this.setLoadingStatus(false);
                this._candidate$.next(candidates);
            })
        ).subscribe();
    }

    getCandidateById(id: number): Observable<Candidate> {
        if(!this.lastCandidatesLoad) {
            this.getCandidatesFromServer();
        }
        return this.candidate$.pipe(
            map(candidates => candidates.filter(candidate => candidate.id === id)[0])
        )
    }



}