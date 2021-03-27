import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AppConstants} from '../util/AppConstants';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})
export class CookieComponent implements OnInit {
  token = '';
  url = '';
  subdomain = '';
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private actRoute: ActivatedRoute,
    private constants: AppConstants,
    private http: HttpClient
  ) {
    this.url = window.location.hostname;
    this.subdomain = constants.getSubdomain(this.url);
    this.token = this.actRoute.snapshot.params.token;
    this.cookieService.set('token', this.token);
    this.token = this.cookieService.get('token');
    if (this.token.length && this.subdomain.length) {
      this.http.get(constants.CHECK_SUBDOMAIN_URL + this.subdomain).subscribe(
        data => {
          this.router.navigate(['/dashboard']).then();
        });
    }
  }

  ngOnInit(): void {}

}
