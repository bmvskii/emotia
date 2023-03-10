import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  onClick() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  ngOnInit(): void {}
}
