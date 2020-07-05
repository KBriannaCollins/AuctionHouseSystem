const { default: axios } = require('axios');

class ProductService{
    constructor(){
        this.URI = 'http://localhost:5000/products/';
    }

    proposeProduct(product){
        console.log('sending axios')
        return axios.post(this.URI, product, {withCredentials: true})
    }
    getProduct() {
        return axios.get(this.URI);
    }

}

export default ProductService;