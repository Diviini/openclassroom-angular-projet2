import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidatesService } from '../../services/candidates.service';
import { Candidate } from '../../models/candidate.model';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  constructor(private candidateService: CandidatesService) {}



  ngOnInit(): void {
    this.initObservable();
    this.candidateService.getCandidatesFromServer();
  }

  private initObservable() {
    this.loading$ = this.candidateService.loading$;
    this.candidates$ = this.candidateService.candidate$;
  }

}
