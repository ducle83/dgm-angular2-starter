/// <reference path="../../typings/main.d.ts" />

import 'angular2/bundles/angular2-polyfills.js'
import 'angular2/platform/browser'
import 'angular2/platform/common_dom'
import 'angular2/core'
import 'angular2/router'
import 'angular2/http'
import 'rxjs'
import {enableProdMode, provide} from 'angular2/core'
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser'
import {ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http'
import {App} from './components/app/app.component'

const ENV_PROVIDERS = [];
if (process.env.ENV === 'prod') {
  enableProdMode()
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS)
}

function main() {
  return bootstrap(App, [
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
  ]);
}

document.addEventListener('DOMContentLoaded', main)
