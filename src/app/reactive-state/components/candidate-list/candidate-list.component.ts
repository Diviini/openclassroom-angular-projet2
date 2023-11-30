import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { CandidatesService } from '../../services/candidates.service';
import { Candidate } from '../../models/candidate.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { CandidateSearchType } from '../../enums/candidate-search-type.enum';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
  }[]

  constructor(private candidateService: CandidatesService,
              private formBuilder: FormBuilder) {}



  ngOnInit(): void {
    this.initForm();
    this.initObservable();
    this.candidateService.getCandidatesFromServer();
  }

  initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions = [
      {value: CandidateSearchType.LASTNAME, label: 'Nom'},
      {value: CandidateSearchType.FIRSTNAME, label: 'Prénom'},
      {value: CandidateSearchType.COMPANY, label: 'Entreprise'}
    ]
  }

  private initObservable() {
    this.loading$ = this.candidateService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );

    const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );

    this.candidates$ = combineLatest([
      search$,
      searchType$,
      this.candidateService.candidate$
    ]).pipe(
      map( ([search, searchType, candidates]) =>  candidates.filter(candidate => candidate[searchType]
        .toLowerCase()
        .includes(search as string)))
    );
  }
}
