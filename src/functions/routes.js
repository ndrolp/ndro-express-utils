"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineRoutes = defineRoutes;
function defineRoutes(controllers, application, addApi = true, version = 1) {
    for (let i = 0; i < controllers.length; i++) {
        const controller = new controllers[i]();
        const routeHandlers = Reflect.getMetadata('routeHandlers', controller);
        const controllerPath = Reflect.getMetadata('baseRoute', controller.constructor);
        const methods = Array.from(routeHandlers.keys());
        for (let j = 0; j < methods.length; j++) {
            const method = methods[j];
            const routes = routeHandlers.get(method);
            if (routes) {
                const routeNames = Array.from(routes.keys());
                for (let k = 0; k < routeNames.length; k++) {
                    const handlers = routes.get(routeNames[k]);
                    if (handlers) {
                        const versionText = version && addApi ? `/v${version}` : '';
                        const route = `${addApi ? '/api' : ''}${versionText}${controllerPath + routeNames[k]}`;
                        application[method](route, handlers);
                    }
                }
            }
        }
    }
}
