import {Component, ViewEncapsulation} from 'angular2/core'
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {Header} from '../../components/header/header.component'
import {Footer} from '../../components/footer/footer.component'
import {Home} from '../../components/home/home.component'
import {Time} from '../../components/time/time.component'

@Component({
	selector: 'app',
	directives: [...ROUTER_DIRECTIVES, Header, Footer],
	styles: [require('../../styles/core.scss'), require('./app.component.scss')],
	template: require('./app.component.jade'),
	encapsulation: ViewEncapsulation.None
})
@RouteConfig([
	{ path: "/", component: Home, name: "Home" },
	{ path: "/time", component: Time, name: "Time"}
])
export class App {
}
