namespace moduleFirstDemo.common {
    'use strict';

    export interface IDataProductService {
        getResource(): ng.resource.IResourceClass<IProductResource>;
    }
    interface IProductResource
		extends ng.resource.IResource<moduleFirstDemo.domain.IProduct> {

	}
  
    export class DataProductService implements IDataProductService {
        
        static $inject: Array<string> = ['$resource'];
        
        
        constructor(private $resource: ng.resource.IResourceService) {}
        
        getResource(): ng.resource.IResourceClass<IProductResource> {
			return this.$resource("http://localhost:3000/products/", {},
            {
                query: { method: "GET", isArray: true },
                get: { method: "GET", url: "http://localhost:3000/products/:id" },
                remove: { method: "DELETE", url: "http://localhost:3000/products/:id" },
                save: { method: "POST", url: "http://localhost:3000/products/" },
                 update: {method: 'PUT', url: "http://localhost:3000/products/:id"}
            });

        }
                
		}
    

    angular
        .module('common.services')
        .service('DataProductService', DataProductService);
}