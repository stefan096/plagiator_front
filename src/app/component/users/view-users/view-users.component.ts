import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/service/user.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'app/model/user/user';
import { Role } from 'app/model/user/role';
import { RoleService } from 'app/service/role.service';
import { AuthService } from 'app/service/auth.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  users: User[];
  allRoles: Role[];
  //userRoles: Role[];
  userRoles: Role;
  selectedUser: User;
  selectedRole: String;
  modalReference: NgbActiveModal;
  rolesDropDown: String[] = [];
  dropdownSettings = {};
  p: any;
  loggedUser: User = new User();

  constructor(private authService: AuthService, 
    private modalService: NgbModal, private userService: UserService,
     private roleService: RoleService, private router: Router) {
    let res = localStorage.getItem('token');
    if(res == null){
      this.router.navigate(['login']);
    }
    if(res != null){
      this.loggedUser.email = this.authService.getUsername(res);
    }
  }

  ngOnInit() {
    
    this.userService.findByEmail(this.loggedUser.email).subscribe(
      e => {
        this.loggedUser = e;
      }
    );
    this.userService.findAll().subscribe(
      s => {
        this.users = s
      }
    );

    this.roleService.findAll().subscribe(
      s => {
        this.allRoles = s;
      }
    )


    this.dropdownSettings = {
      singleSelection: true,
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  viewRoles(user: User, viewConnected:any){
      this.selectedUser = user;
      this.userRoles = user.role;
      this.modalReference = this.modalService.open(viewConnected, { centered: true });
  }

  deleteRole(role: Role){
    // this.userService.deleteRoleFromUser(this.selectedUser.id, role.id).subscribe(
    //   s =>{

    //     let pomRole: Role = new Role();
    //     this.selectedUser.role.forEach(element => {
    //       if(element.id === role.id){
    //         pomRole = element;
    //       }
    //     })

    //     this.selectedUser.role.splice(this.selectedUser.role.indexOf(pomRole), 1)
    //   }
    // );
  }

  goToRolesPage(){
    this.router.navigate(['roles']);
  }

  openAddingRolePopup(connect, user: User){
    // this.rolesDropDown = [];
    // this.selectedRole = "";
    // this.selectedUser = user;
    // this.allRoles.forEach(role => {
    //       let hasRole = false;
    //       user.role.forEach(userRole => {
    //         if(role.id == userRole.id){
    //           hasRole = true;
    //         }
    //       }
    //     )
    //     if(!hasRole){
    //       this.rolesDropDown.push(role.userType);
    //     }
    //   }
    // )
    // this.modalReference = this.modalService.open(connect, { centered: true });
  }

  addRoleAction(){
    // let roleForAdd = this.allRoles.find(element => element.userType == this.selectedRole);
    // this.userService.addRoleToUser(this.selectedUser.id, roleForAdd.id).subscribe(
    //   s => {
    //     this.selectedUser.role.push(roleForAdd)
    //     this.modalReference.close()
    //   }
    // );
  }

  changeStateOfUser(user:User, boolState: boolean){
    this.userService.changeStateOfUser(user.id, boolState).subscribe(
      s => {
        this.userService.findAll().subscribe(
          novi => {
            this.users = novi
            this.users[0].role
          }
        );
      }
    );
  }

  removeUser(user: User){
    this.userService.deleteUser(user.id).subscribe(
      s =>{
        this.userService.findAll().subscribe(
          novi => {
            this.users = novi
          }
        );
      }
    );
  }
}
