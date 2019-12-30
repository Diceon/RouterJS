import {Route} from './route.js';

export class Router {

    constructor(parameters) {
        this._mode = parameters.mode || 'history';
        this._routes = [];
        this._root = parameters.root || '/';
    }

    get root() {
        return this_root;
    }

    set root(root) {
        this_root = root;
    }

    get mode() {
        return this._mode;
    }

    set mode(mode) {
        this._mode = (mode == 'history' && window.history.pushState) ? 'history' : 'hash';
    }

    get routes() {
        return this._routes;
    }

    set routes(routes) {
        this._routes = routes;
    }

    addRoute(route) {
        this._routes.push(new Route(route.name, route.path, route.handler));
        return this;
    }

    navigate(path) {
        path = path ? path : '';
        this.match(path);
    }

    match(path) {
        this.routes.forEach(route => {
            let paramNames = [];

            let regexPath = route.path.replace(/([:*])(\w+)/g, function (full, colon, name) {
                paramNames.push(name);
                console.log(full)
                console.log(colon)
                console.log(name)
                return '([^\/+])'
            }) + '(?:\/|$)';



            let routeMatch = path.match(new RegExp(regexPath));

            if (routeMatch !== null) {
                let params = routeMatch
                .slice(1, routeMatch.length)
                .reduce((params, value, index) => {
                    if (params == null) params = {};
                    params[paramNames[index]] = value;
                    return params;
                }, null)

                if (params === null) {
                    route.handler();
                } else {
                    route.handler(params);
                }

                this.location(path);
            }

        });
    }

    location(path) {
        if (this._mode === 'history') {
            window.history.pushState(null, null, this._root + path);
        } else {
            path = path.replace(/^\//, '').replace(/\/$/, '');
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
    }

}