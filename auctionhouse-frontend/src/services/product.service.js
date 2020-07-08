const { default: axios } = require('axios');

class ProductService{
    constructor(){
        this.URI = 'http://localhost:5000/products';
    }

    proposeProduct(product){
        console.log('sending axios')
        return axios.post(this.URI, product, {withCredentials: true})
    }
    updateStatus(product) {
        let uri = `${this.URI}/${product}/status`
        return axios.put(uri, {withCredentials:true});
    }
    getProducts(querydict) {
        console.log('sending axios get')
        return axios.get(this.URI, {withCredentials: true});
    }

}

export default ProductService;