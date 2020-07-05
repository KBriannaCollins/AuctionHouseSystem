const { default: axios } = require('axios');

class ProductService{
    constructor(){
        this.URI = 'http://localhost:5000/products';
    }

    proposeProduct(product){
        console.log('sending axios')
        return axios.post(this.URI, product, {withCredentials: true})
    }
    getProducts() {
        return axios.get('http://localhost:5000/viewproducts', {withCredentials: true});
    }

}

export default ProductService;