
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import _debounce from 'lodash.debounce'


// activate Vuetify
import Vuetify from 'vuetify/lib'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
//import 'vuetify/dist/vuetify.min.css'
//import 'vuetify/src/stylus/app.styl'
Vue.use(Vuetify);

// Vuex
Vue.use(Vuex);

// Vue Resource
Vue.use(VueResource);

// enable components
Vue.component('department-header', () => import(/* webpackChunkName: "layout" */ '../vue/department-header'));

Vue.component('ld-view', () => import(/* webpackChunkName: "ui" */ '../vue/ld-view'));
Vue.component('ld-card', () => import(/* webpackChunkName: "ui" */ '../vue/ld-card'));
Vue.component('ld-card-title', () => import(/* webpackChunkName: "ui" */ '../vue/ld-card-title'));
Vue.component('ld-card-content', () => import(/* webpackChunkName: "ui" */ '../vue/ld-card-content'));
Vue.component('ld-accordion', () => import(/* webpackChunkName: "ui" */ '../vue/ld-accordion'));
Vue.component('flex-container', () => import(/* webpackChunkName: "ui" */ '../vue/flex-container'));
Vue.component('flex-item', () => import(/* webpackChunkName: "ui" */ '../vue/flex-item'));

Vue.component('ld-lookup-form', () => import(/* webpackChunkName: "api-explorer" */ '../vue/ld-lookup-form'));
Vue.component('ld-sparql-form', () => import(/* webpackChunkName: "api-explorer" */ '../vue/ld-sparql-form'));
Vue.component('ld-search-form', () => import(/* webpackChunkName: "api-explorer" */ '../vue/ld-search-form'));

// HMR, auto-refresh CSS
if (module && module.hot) {
    module.hot.addStatusHandler(status => {
        if (status === 'idle') {
            const styleLinks = document.querySelectorAll('link[rel="stylesheet"]');
            styleLinks.forEach((link) => {
                link.setAttribute('href', link.getAttribute('href').replace(/\.css.*$/, '.css?' + Math.random()))
            });
        }
    });
}

// start Vue
setTimeout(() => {
    if (!document.querySelector('#content')) {
        return console.warn('#content element not available');
    }

    window._ = {
        debounce: _debounce
    };

    window.vueApp = new Vue({
        el: '#content',
        store: new Vuex.Store({}),
        http: {
            root: '/',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: true
        }
    });
}, 100);
