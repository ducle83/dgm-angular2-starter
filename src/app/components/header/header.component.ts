import {Component} from 'angular2/core'
import {RouterLink} from 'angular2/router'

@Component({
  selector: 'header',
  providers: [],
  directives: [RouterLink],
  styles: [ require('./header.component.scss') ],
  template: require('./header.component.jade'),
})
export class Header {
  constructor() {
  }
}
