!function(e){function t(o){if(r[o])return r[o].exports;var n=r[o]={exports:{},id:o,loaded:!1};return e[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){"use strict";function o(){var e=function(e,t,r,o){return function(n){n.map(function(n){for(var a,i=0;i<n.addedNodes.length;++i){var c=n.addedNodes[i];c.id===t&&(a=c)}if(a){var s=document.querySelector(r);null!==s&&searchandiser.attach("gb-cvs-search-box",r,{boxid:o}),e.observer.disconnect()}})}},t={childList:!0,subtree:!0},r={},o=new MutationObserver(e(r,"dMainHeader","#GlobalSearchForm","searchbox"));r.observer=o,o.observe(document.documentElement,t);var n={},a=new MutationObserver(e(n,"bodyCVSContainer","#head-page-search > form","searchboxMobile"));n.observer=a,a.observe(document.documentElement,t)}function n(e){return e.variants?(e.variants=e.variants.map(function(e){return e.image=(s.isHttps()?"https":"http")+"://www.cvs.com/bizcontent/merchandising/productimages/small/"+e.p_Product_UPCNumber+".jpg",e}),e):e}function a(){riot.route.base(s.getUrl()),riot.route.start(!0)}function i(){searchandiser.flux.query.allowPrunedRefinements(),a(),o(),searchandiser.attach("gb-search-page",{env:s})}var c=r(2),s=new c.CvsEnvironments(window.location,"undefined"!=typeof gbSearchEnvironment?gbSearchEnvironment:void 0);searchandiser({customerId:c.CUSTOMERID,area:s.getArea(),collection:s.getCollection(),initialSearch:!1,bridge:{skipCache:"Production"!==s.getArea(),https:s.isHttps(),timeout:1e4},url:{queryParam:"searchTerm",searchUrl:""},pageSizes:[50,100],fields:["*"],structure:{title:"title",parentPdpUrl:"BV_ParentProductPageUrl",variants:"variants",_transform:n,_variantStructure:{image:"image",price:"p_Product_Price",unitPrice:"gbi_Price_Each",salePrice:"p_Sale_Price",unitSalePrice:"gbi_Sale_Price_Each",saveAmount:"gbi_Sale_Price_Saving",shortName:"p_Sku_ShortName",productRating:"p_Product_Review",productSize:"p_Sku_Size",productAvailability:"Product_Availability",rating:"p_Product_Rating",pdpUrl:"BV_ProductPageUrl",promotionDescription:"p_Promotion_Description"}},tags:{sayt:{area:s.getArea(),collection:s.getCollection(),structure:{image:"image_url"},products:3,queries:5,highlight:!0,categoryField:"variants.ProductBrand_Brand",navigationNames:{"variants.ProductBrand_Brand":"Brand"},allowedNavigations:["variants.ProductBrand_Brand"],minimumCharacters:3,delay:300},collections:{options:[{label:"Products",value:s.getCollection()},{label:"Drug Information",value:"drug"}]},sort:{options:[{label:"Relevance",value:{field:"_relevance",order:"Descending"}},{label:"Price Low to High",value:{field:"variants.gbi_Actual_Price",order:"Ascending"}},{label:"Price High to Low",value:{field:"variants.gbi_Actual_Price",order:"Descending"}},{label:"Most Reviewed",value:{field:"variants.p_Product_Review",order:"Descending"}},{label:"Name A-Z",value:{field:"title",order:"Ascending"}},{label:"Name Z-A",value:{field:"title",order:"Descending"}}]}},stylish:!0}),i()},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o="cvshealth",n=function(){function e(t,o,n){r(this,e),this._hostname=t?t.hostname:void 0,this._environmentSetting=o,this._protocol=t?t.protocol:"http:",this._baseurl=t?t.pathname:void 0,this._environments=n?n:this.loadenv()}return e.prototype.getEnvironment=function(){var e,t=this;return"undefined"!=typeof this._environmentSetting&&(e=Object.values(this._environments).find(function(e){return e.name===t._environmentSetting}))?e:this.getEnvironementFromDomain(this._hostname)},e.prototype.getEnvironementFromDomain=function(e){var t=e;e&&e.startsWith("www.")&&(t=e.substring(4));var r=this._environments[t];if(r)return r;if(t&&t.startsWith("m-")){var o="www-"+t.substring(2);r=this._environments[o]}return r?r:this.defaultEnvironment()},e.prototype.getArea=function(){return this.getEnvironment().area},e.prototype.getCollection=function(){return this.getEnvironment().collection},e.prototype.isHttps=function(){return"https:"===this._protocol},e.prototype.getUrl=function(){return this._baseurl},e.prototype.defaultEnvironment=function(){return Object.values(this._environments)[0]},e.prototype.loadenv=function(){return{"cvs.com":{name:"prod",collection:"products",area:"Production"},"www-it1.cvs.com":{name:"it1",collection:"devProducts",area:"devProd"},"www-it2.cvs.com":{name:"it2",collection:"devProducts",area:"devProd"},"www-it3.cvs.com":{name:"it3",collection:"devProducts",area:"devProd"},"www-it4.cvs.com":{name:"it4",collection:"devProducts",area:"devProd"},"www-qa1.cvs.com":{name:"qa1",collection:"devProducts",area:"devProd"},"www-qa2.cvs.com":{name:"qa2",collection:"devProducts",area:"devProd"},"www-qa3.cvs.com":{name:"qa3",collection:"devProducts",area:"devProd"},"www-qa4.cvs.com":{name:"qa4",collection:"devProducts",area:"devProd"},"www-uat1.cvs.com":{name:"uat1",collection:"devProducts",area:"devProd"},"www-uat2.cvs.com":{name:"uat2",collection:"devProducts",area:"devProd"},"www-uat3.cvs.com":{name:"uat3",collection:"devProducts",area:"devProd"},"www-uat4.cvs.com":{name:"uat4",collection:"devProducts",area:"devProd"},"www-reg1.cvs.com":{name:"reg1",collection:"regProducts",area:"regProd"},"www-reg2.cvs.com":{name:"reg2",collection:"regProducts",area:"regProd"},"cdcpt.cvs.com":{name:"cdcpt",collection:"ptProducts",area:"ptProd"},"www-pt2.cvs.com":{name:"pt2",collection:"ptProducts",area:"ptProd"},"cdcprd1-stg.cvs.com":{name:"cdcprd1",collection:"busProducts",area:"busProd"},"cdcprd2-stg.cvs.com":{name:"cdcprd2",collection:"busProducts",area:"busProd"},"cvsprototype.demo.groupbyinc.com":{name:"demo",collection:"products",area:"GroupByTest"}}},e}();t.CUSTOMERID=o,t.CvsEnvironments=n}]);