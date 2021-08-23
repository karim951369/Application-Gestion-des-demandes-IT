import { Component,OnDestroy, OnInit } from '@angular/core';
import { TicketService } from '../../shared/ticket.service';
import { UserService } from '../../shared/user.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-agent-panel',
  templateUrl: './agent-panel.component.html',
  styleUrls: ['./agent-panel.component.css']
})
export class AgentPanelComponent implements OnDestroy, OnInit {

  requests;
  request;
  TicketDetails;
  fName:any;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};


  constructor(private service:TicketService) { }

  ngOnInit() {
    this.service.getTickets().subscribe(
      res =>{
        this.requests = res;
        this.dtTrigger.next();
      },
      err =>{
        console.log(err);
      }

    );
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  Tickets(): void {
    this.service
        .getTickets()
        .subscribe((response: any) => {
          this.request = response;
          // initiate our data table
          this.dtTrigger.next();
        });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onSubmit(d) {
    this.service.getTicketsById(d).subscribe(
      res =>{
        this.TicketDetails = res;
      },
      err =>{
        console.log(err);
      }

    );
  }

  onDelete(d) {
    this.service.deleteTicket(d).subscribe(
      res =>{
        this.TicketDetails = res;
        this.ngOnInit();
      },
      err =>{
        console.log(err);
      }

    );
  }

  Accepter(i,n,d,a,s,t,p) {
    this.service.StatusTicket(i,n,d,'Accepté',a,s,t,p).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.onSubmit(i);
          //this.toastr.success('New user created!', 'Registration successful.');
        } else {
          err => {
            console.log(err);
          }
        }
      }
      
    );
  }

  toDo(i,n,d,a,s,t,p) {
    this.service.EmailNotif(t,a,'Ticket accepted','your submittion is in queue, estimated time: between 1 and 3 days').subscribe();
    this.service.StatusTicket(i,n,d,'In queue',a,s,t,p).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.onSubmit(i);
          //this.toastr.success('New user created!', 'Registration successful.');
        } else {
          err => {
            console.log(err);
          }
        }
      }
      
    );
  }

  inProg(i,n,d,a,s,t,p) {
    this.service.EmailNotif(t,a,'In progress','The agent started working on your request, estimated time: 24 hours').subscribe();
    this.service.StatusTicket(i,n,d,'In progress',a,s,t,p).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.onSubmit(i);
          //this.toastr.success('New user created!', 'Registration successful.');
        } else {
          err => {
            console.log(err);
          }
        }
      }
      
    );
  }

  tDone(i,n,d,a,s,t,p) {
    this.service.EmailNotif(t,a,'Problem solved','Your problem is solved if you need any help send us another request').subscribe();
    this.service.StatusTicket(i,n,d,'Done',a,s,t,p).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.onSubmit(i);
          //this.toastr.success('New user created!', 'Registration successful.');
        } else {
          err => {
            console.log(err);
          }
        }
      }
      
    );
  }

  Refuser(i,n,d,a,s,t,p) {
    this.service.EmailNotif(t,a,'in prog test','body').subscribe();
    this.service.StatusTicket(i,n,d,'Refusé',a,s,t,p).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.onSubmit(i);
          //this.toastr.success('New user created!', 'Registration successful.');
        } else {
          err => {
            console.log(err);
          }
        }
      }
      
    );
  }


  onComment(d,e) {
    this.service.commentTicket(d,e).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          //this.toastr.success('New user created!', 'Registration successful.');
        } else {
          err => {
            console.log(err);
          }
        }
      }
      
    );
  }
/*
  Search(){
    if(this.fName == ""){
      this.ngOnInit();
    } else {
      this.requests.filter(res =>{
        return res.fName.toLocaleLowerCase().match(this.fName.toLocaleLowerCase());
      });
    }
  }
  */
 /*
  key:string ='id';
  reverse:boolean = false;
  sort(key){
    this.key= key;
    this.reverse = !this.reverse;
  }
  */
  
/*
  sortP(key){
    this.key= key;
    this.reverse = !this.reverse;

  }
*/
  









}
