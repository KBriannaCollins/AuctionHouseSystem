const { default: axios } = require('axios');

class ProductService{
    constructor(){
        this.URI = 'http://localhost:5000/products';
    }
    proposeProduct(product){
        console.log('sending axios')
        return axios.post(this.URI, product, {withCredentials: true})
    }
    updateProductStatus(infoObject) {
        console.log(infoObject)
        return axios.put(this.URI + '/' + infoObject._id, infoObject, {withCredentials: true})
    }
    getProducts(querydict) {
        console.log('sending axios get')
        return axios.get(this.URI, {withCredentials: true});
    }
    getProductsByAuctionIDArr(auctIdArr){
        return axios.get('http://localhost:5000/bidderhistory', auctIdArr,{withCredentials: true})

    }

}

export default ProductService;