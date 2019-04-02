
import Vue from 'vue'
import Vuex from 'vuex'


// Vuex
Vue.use(Vuex);
// enable components
Vue.component('ld-view', () => import(/* webpackChunkName: "ld-components" */ '../vue/ld-view'));
Vue.component('ld-card', () => import(/* webpackChunkName: "ld-components" */ '../vue/ld-card'));
Vue.component('ld-card-title', () => import(/* webpackChunkName: "ld-components" */ '../vue/ld-card-title'));
Vue.component('ld-card-content', () => import(/* webpackChunkName: "ld-components" */ '../vue/ld-card-content'));
Vue.component('department-header', () => import(/* webpackChunkName: "ld-components" */ '../vue/department-header'));
Vue.component('flex-container', () => import(/* webpackChunkName: "ld-components" */ '../vue/flex-container'));
Vue.component('flex-item', () => import(/* webpackChunkName: "ld-components" */ '../vue/flex-item'));
Vue.component('ld-accordion', () => import(/* webpackChunkName: "ui" */ '../vue/ld-accordion'));

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

    window.vueApp = new Vue({
        el: '#content',
        store: new Vuex.Store()
    });
}, 1);
