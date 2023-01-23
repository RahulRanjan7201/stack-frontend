import { Component } from '@angular/core';
import { StackService } from '../stack.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subject} from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  value:string ='';
  showTable:boolean = false;
  updateSubject:Subject<any> = new Subject();
  constructor(private service:StackService, private _snackBar: MatSnackBar){}
  showStacks() {
    this.showTable = true;
  }
  updateTable(data:any, action:string) {
    this.updateSubject.next({data, action})
  }
  popstack() {
    this.service.popStack()
    .subscribe((res) => {
      this.openSnackBar(res.message, "Removed")
      this.updateTable(undefined, "remove")
      },
       (err) => {
        let {error} = err.error
        this.openSnackBar(error, "Error")
    }
      );
  }
  addStack() {
    if(this.validateForm(this.value)) {
    this.service.addStack({value:this.value})
    .subscribe((res) => {
      this.openSnackBar(res.message, "Added")
      this.updateTable(this.value, "add")
      },
       (err) => {
        let {error} = err.error
        this.openSnackBar(error, "Error")
    }
      );
    } else {
       this.openSnackBar("Only Number Type is Allowed", "Validation Error")
    }
  }

  validateForm(value:any):boolean {
    if(value == '0') return true;
    if (!value ) {
      return false;
    }
    else if (isNaN(Number(value))) {
     return false;
    }
    return true
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
