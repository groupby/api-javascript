!function(e){function t(a){if(r[a])return r[a].exports;var i=r[a]={exports:{},id:a,loaded:!1};return e[a].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){e.exports=r(1)},function(e,t){"use strict";function r(){return i()?"poc":"Production"}function a(){return i()?"productsPOC":"products"}function i(){return"undefined"!=typeof gbSearchEnvironment||"uat.cvs.com"==location.hostname}function n(e){return console.log(e),e.variants?(e.variants=e.variants.map(function(e){return e.image="http://www.cvs.com/bizcontent/merchandising/productimages/large/"+e.p_Product_UPCNumber+".jpg",e}),e):e}function o(){searchandiser.attach("gb-search-page")}searchandiser({customerId:"cvshealth",area:r(),collection:a(),pageSizes:[12,24,50],fields:["*"],structure:{title:"title",variants:"variants",_transform:n,_variantStructure:{image:"image",price:"p_Product_Price",unitPrice:"p_Unit_Price_Measamt",shortName:"p_Sku_ShortName",productRating:"p_Product_Review",productSize:"p_Sku_Size",productAvailability:"Product_Availability",rating:"p_Product_Rating"}},tags:{sayt:{area:"Production",collection:"products",structure:{image:"image_url"},products:12,queries:9,categoryField:"QtopRatedType",navigationNames:{brand:"Brand"},allowedNavigations:["brand"]},collections:{options:[{label:"Products",value:"products"},{label:"Drug Information",value:"drug"}]},sort:{options:[{label:"Relevance",value:{field:"_relevance",order:"Descending"}},{label:"Price Low to High",value:{field:"variants.p_Product_Price",order:"Ascending"}},{label:"Price High to Low",value:{field:"variants.p_Product_Price",order:"Descending"}},{label:"Most Reviewed",value:{field:"variants.p_Product_Review",order:"Descending"}},{label:"Name A-Z",value:{field:"title",order:"Ascending"}},{label:"Name Z-A",value:{field:"title",order:"Descending"}}]}},initialSearch:!1,stylish:!0}),o()}]);