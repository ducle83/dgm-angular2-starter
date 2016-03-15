import {Component} from 'angular2/core'

@Component({
  selector: '__templateSelector',
  providers: [],
  directives: [],
  styles: [ require('./__template.scss') ],
  template: require('./__template.jade'),
})
export class __templateClass {
  constructor() {
  }
}
