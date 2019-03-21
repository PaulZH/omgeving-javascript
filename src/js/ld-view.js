
import Vue from 'vue'

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
document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector('#content')) {
        return;
    }

	window.vueApp = new Vue({
		el: '#content'
	});
});

