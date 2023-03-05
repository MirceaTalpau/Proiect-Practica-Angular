import { Router } from '@angular/router';
import { TableDataService } from './../../_core/services/table-data-service/table-data.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent implements OnInit {

  movieList:any = [];



  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  getMovies(){
    this.tableDataService.getMovies().subscribe((res) => {
      this.movieList = res;
      console.log(this.movieList);
  });
  }
 

  validateForm!: UntypedFormGroup;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    const movieInfo = {
      title: this.validateForm.get("title")?.value,
      director: this.validateForm.get("director")?.value,
      length: this.validateForm.get("length")?.value,
      description: this.validateForm.get("description")?.value,
      rating: this.validateForm.get("rating")?.value
    }
    this.tableDataService.addMovie(movieInfo).subscribe((res) =>     window.location.reload())
  }

  constructor(private fb: UntypedFormBuilder,private tableDataService: TableDataService,private router:Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null,[Validators.required,Validators.minLength(2)]],
      director: [null,[Validators.required,Validators.minLength(5),Validators.pattern('[a-zA-Z ]*')]],
      length: [null,[Validators.required,Validators.min(40),Validators.max(350)]],
      description: [null,[Validators.required,Validators.minLength(5)]],
      rating: [null,[Validators.required,Validators.min(1),Validators.max(100)]],
    });
  }

}
