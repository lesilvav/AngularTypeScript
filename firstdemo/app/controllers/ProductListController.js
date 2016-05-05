var moduleFirstDemo;
(function (moduleFirstDemo) {
    'use strict';
    var ProductListController = (function () {
        function ProductListController(DataProductService) {
            var _this = this;
            this.DataProductService = DataProductService;
            this.title = "Product list";
            this.showImage = false;
            this.products = [];
            this.dataProductResource = DataProductService;
            var productResource = DataProductService.getResource();
            productResource.query(function (data) {
                _this.products = data;
            });
        }
        ProductListController.prototype.toggleImage = function () {
            this.showImage = !this.showImage;
        };
        ProductListController.prototype.productGetById = function (id) {
            this.dataProductResource.getResource().get({ id: id }, function (data) {
                console.log(data);
            });
        };
        ProductListController.prototype.productCreate = function (product) {
            var _this = this;
            var exist;
            exist = false;
            for (var index = 0; index < this.products.length; index++) {
                if (this.products[index].id == product.id) {
                    alert("id exist");
                    exist = true;
                }
            }
            if (!exist) {
                this.dataProductResource.getResource().save(product, function (data) {
                    _this.currentProduct = [];
                    _this.products.push(product);
                });
            }
        };
        ProductListController.prototype.productUpdate = function (product) {
            var _this = this;
            this.dataProductResource.getResource().update({ id: product.id }, product, function (data) {
                _this.currentProduct = [];
            });
        };
        ProductListController.prototype.productRemove = function (id) {
            var _this = this;
            this.dataProductResource.getResource().remove({ id: id }, function (data) {
                var temp;
                temp = _this.products;
                _this.products = [];
                for (var index = 0; index < temp.length; index++) {
                    if (temp[index].id != id) {
                        _this.products.push(temp[index]);
                    }
                }
            });
        };
        return ProductListController;
    }());
    moduleFirstDemo.ProductListController = ProductListController;
    angular
        .module('demoModule')
        .controller('ProductListController', ProductListController);
})(moduleFirstDemo || (moduleFirstDemo = {}));
//# sourceMappingURL=ProductListController.js.map