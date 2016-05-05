var moduleFirstDemo;
(function (moduleFirstDemo) {
    var common;
    (function (common) {
        'use strict';
        var DataProductService = (function () {
            function DataProductService($resource) {
                this.$resource = $resource;
            }
            DataProductService.prototype.getResource = function () {
                return this.$resource("http://localhost:3000/products/", {}, {
                    query: { method: "GET", isArray: true },
                    get: { method: "GET", url: "http://localhost:3000/products/:id" },
                    remove: { method: "DELETE", url: "http://localhost:3000/products/:id" },
                    save: { method: "POST", url: "http://localhost:3000/products/" },
                    update: { method: 'PUT', url: "http://localhost:3000/products/:id" }
                });
            };
            DataProductService.$inject = ['$resource'];
            return DataProductService;
        }());
        common.DataProductService = DataProductService;
        angular
            .module('common.services')
            .service('DataProductService', DataProductService);
    })(common = moduleFirstDemo.common || (moduleFirstDemo.common = {}));
})(moduleFirstDemo || (moduleFirstDemo = {}));
//# sourceMappingURL=dataProductServices.js.map