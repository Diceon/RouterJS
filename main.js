import {Router} from './router.js';

const router = new Router({
    root: 'http://localhost/RouterJS',
});

router.addRoute({
    name: 'home',
    path: '/',
    handler: () => console.log('Home handler')
});

router.addRoute({
    name: 'about',
    path: '/about',
    handler: () => console.log('About handler')
});

router.addRoute({
    name: 'contacts',
    path: '/contacts',
    handler: () => console.log('Contacts handler')
});

const activeRoutes = Array.from(document.querySelectorAll('[route]'));

activeRoutes.forEach(route => route.addEventListener('click', e => {
    e.preventDefault();
    router.navigate(e.target.getAttribute('route'));
}, false));