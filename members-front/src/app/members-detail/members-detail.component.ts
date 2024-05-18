import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { NgFor } from '@angular/common';

interface Member {
  id: number;
  name: string;
  surname: string;
}

@Component({
  selector: 'app-members-detail',
  standalone: true,
  imports: [NgFor, RouterOutlet],
  templateUrl: './members-detail.component.html',
  styleUrl: './members-detail.component.css',
})
export class MembersDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  selected_member: Member | undefined;

  ngOnInit() {
    this.loadMember();
  }

  loadMember() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const numericId = Number(id);
      if (!isNaN(numericId)) {
        this.api.getMember(numericId).subscribe(
          (data: Member) => {
            console.log(data);
            this.selected_member = data;
          },
          (error) => {
            console.log('Erro', error.message);
          }
        );
      } else {
        console.log('Formato de ID inválido');
      }
    } else {
      console.log('ID é nulo');
    }
  }
}
