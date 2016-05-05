namespace moduleFirstDemo {
    'use strict';
    export interface IProductListController{
        title:string;
        showImage:boolean;
        products:moduleFirstDemo.domain.IProduct[];
        toggleImage():void;
        currentProduct: Object;
        dataProductResource: moduleFirstDemo.common.IDataProductService;
    }
    export class ProductListController implements IProductListController{
        //static $inject: Array<string> = ['dependency1'];
        //constructor(private dependency1: dependency1Type) {}
        title:string;
        showImage:boolean;
        products:moduleFirstDemo.domain.IProduct[];
        currentProduct: Object;
        dataProductResource: moduleFirstDemo.common.IDataProductService;

        
        constructor(private DataProductService: moduleFirstDemo.common.IDataProductService){
            this.title="Product list";
            this.showImage=false;
            this.products=[];
            this.dataProductResource=DataProductService;
            var productResource=DataProductService.getResource();
            productResource.query((data:moduleFirstDemo.domain.IProduct[])=>{
                this.products=data;
            })

        }
        toggleImage():void{
            this.showImage=!this.showImage;
        }
        productGetById(id:number):void{
           this.dataProductResource.getResource().get({id:id}, (data:moduleFirstDemo.domain.IProduct)=>{
               console.log(data);
            })
        }
        
         productCreate(product:moduleFirstDemo.domain.IProduct):void{
             var exist:boolean;
             exist=false;
           for (var index = 0; index < this.products.length; index++) {
                        if(this.products[index].id==product.id){
                            alert("id exist")
                           exist=true;
                        }
                    }
               
              if(!exist){
                    this.dataProductResource.getResource().save(product, (data:moduleFirstDemo.domain.IProduct)=>{
                            this.currentProduct=[]
                                this.products.push(product);
                                })
              }
           
                  
        }
        
         productUpdate(product:moduleFirstDemo.domain.IProduct):void{
           this.dataProductResource.getResource().update({id:product.id},product, (data:moduleFirstDemo.domain.IProduct)=>{
             this.currentProduct=[]
            })
        }
       productRemove(id:number):void{
           this.dataProductResource.getResource().remove({id:id}, (data:moduleFirstDemo.domain.IProduct)=>{
               var temp:moduleFirstDemo.domain.IProduct[];
                   temp =this.products;
                   this.products=[];
                    for (var index = 0; index < temp.length; index++) {
                        if(temp[index].id!=id){
                            this.products.push(temp[index]);
                        }
                    }

               
            })
        }
         
        
    }

    angular
        .module('demoModule')
        .controller('ProductListController', ProductListController);
}