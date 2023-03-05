import { Router } from '@angular/router';
import { AuthService } from './../../_core/services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { TableDataService } from 'src/app/_core/services/table-data-service/table-data.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  movieList = [];

  constructor(private auth:AuthService,private router:Router,private tableDataService:TableDataService) {
    
  }


  logout(){
    this.auth.logout();
    this.router.navigate(['auth']);
  }

  

  ngOnInit(): void {
    this.tableDataService.getMovies().subscribe((res) => {
      this.movieList = res
  });}
}
