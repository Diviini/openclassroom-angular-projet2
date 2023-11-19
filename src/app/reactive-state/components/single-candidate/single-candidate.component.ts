import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidatesService } from '../../services/candidates.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidateComponent implements OnInit {


  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;

  constructor(private candidateService: CandidatesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    this.loading$ = this.candidateService.loading$;
    this.candidate$ = this.route.params.pipe(
      switchMap(params => this.candidateService.getCandidateById(+params['id']))
    );
  }

  onHire() {
    throw new Error('Method not implemented.');
  }

  onRefuse() {
    throw new Error('Method not implemented.');
  }

  onGoBack() {
    this.router.navigateByUrl('/reactive-state/candidates');
  }


}
