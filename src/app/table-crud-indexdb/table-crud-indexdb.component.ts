import { Component, OnInit } from '@angular/core';
import { IndexdbServiceService } from '../indexdb-service.service';
import { getFakePeople } from './helpers.js';

@Component({
  selector: 'app-table-crud-indexdb',
  templateUrl: './table-crud-indexdb.component.html',
  styleUrls: ['./table-crud-indexdb.component.css'],
})
export class TableCrudIndexdbComponent implements OnInit {
  db: any;
  constructor(private indexdbServiceService: IndexdbServiceService) {}

  ngOnInit() {
    this.indexdbServiceService.init('employee', 1, {});
  }

  onsuccess(e) {
    return this.populateDB().then(initUI);
  }

  populateDB = () => {
    return new Promise((res, rej) => {
      this.db.store.count().onsuccess = function (e) {
        const { result } = e.target;
        if (result !== 0) return res(this.db);
        alert('Need to generate fake data - stand by please...');
        const fakePeople = getFakePeople(5).then((data) =>
          data.map((p) => {
            const [person] = p.results;
            const { title, first, last } = person.name;
            return {
              name: `${title}. ${first} ${last}`,
              email: person.email,
              gender: person.gender,
              phone: person.phone,
            };
          })
        );
        fakePeople
          .then((persons) => this.db.insertAll(persons))
          // in case not able to fetch data
          .catch(() =>
            this.db.insert({
              name: 'Aamir khan',
              email: 'aamir@example.com',
              gender: 'male',
              phone: '9696969696',
            })
          )
          .finally(() => res(this.db));
      };
    });
  };
}
