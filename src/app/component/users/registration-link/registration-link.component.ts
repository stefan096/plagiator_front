import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-registration-link',
  templateUrl: './registration-link.component.html',
  styleUrls: ['./registration-link.component.css']
})
export class RegistrationLinkComponent implements OnInit {
  proccessId: string;
  userId: number;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('userId');
    this.userService.activateUser(this.userId)
      .subscribe(
        pp => alert("Uspesno aktiviran"),
        err => alert("Nalog je vec aktiviran"));
  }

}
