
import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import { StackService } from '../stack.service';
import {Subject} from 'rxjs';
const ELEMENT_DATA: StackElement[] = []
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements OnInit{
  displayedColumns: string[] = ['value'];
  
  dataSource = [...ELEMENT_DATA];
  @ViewChild(MatTable) table: MatTable<any> | any;
  @Input('updateSubject') updateSubject!: Subject<any> ;
  constructor(private service:StackService) {}
  ngOnInit() { 
    this.updateSubject.subscribe(e => {
      this.update(e.data, e.action)
    })
    this.service.getStacks().subscribe((res:any) => {
      this.dataSource = res.data.map((item:number) => {
        return {value:item}
      })
    });
  }

  update(data:any, action:string) {
    if(action =="add") {
      this.dataSource.push({value:Number(data)});
      this.table.renderRows();
    }
    if(action == "remove") {
      this.dataSource.pop();
      this.table.renderRows();
    }
    
  }
  ngOnDestory() {
    this.updateSubject.unsubscribe();
  }
}

export interface StackElement {
  value: number;
}

