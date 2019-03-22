
import Vue from 'vue'

// enable components
Vue.component('ld-view', () => import(/* webpackChunkName: "ld-components" */ '../vue/ld-view'));

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
		el: '#content'
	});
}, 1);
