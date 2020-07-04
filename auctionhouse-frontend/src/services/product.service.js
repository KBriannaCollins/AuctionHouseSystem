const { default: axios } = require('axios');

class ProductService{
    constructor(){
        this.URI = 'http://localhost:5000/products/';
    }

    proposeProduct(product){
        return axios.post(this.URI, product, {withCredentials: true})
    }
}

export default ProductService;