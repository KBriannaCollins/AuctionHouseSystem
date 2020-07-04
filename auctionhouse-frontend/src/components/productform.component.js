import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductService from '../services/product.service';

class ProductForm extends Component{
    productService = new ProductService();
    constructor(props){
        super(props)
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleProductAmountChange = this.handleProductAmountChange.bind(this);
        this.proposeProduct = this.proposeProduct.bind(this);
    }
    handleProductChange(e){
        let newProduct = Object.assign({}, this.props.product);
        newProduct[e.target.name] = e.target.value;
        this.props.dispatch({type: 'handleProductFieldChange', product: newProduct});
        console.log('Product:', this.props.product);
    }
    handleProductAmountChange(e){
        let newProduct = Object.assign({}, this.props.product);
        const value = e.target.value.replace(/[^\d]/,'');
        newProduct['start_bid'] = parseFloat(value);
        this.props.dispatch({type: 'handleProductFieldChange', product: newProduct})
        console.log('Product:', this.props.product);


    }
    proposeProduct(e){
        e.preventDefault()
        this.productService.proposeProduct(this.props.product).then(
            (resp) => {
                this.props.dispatch({type: 'proposeProduct', product: {'name': '', 'description': '', 'start_bid': 0}})
                if (resp.status === 201){
                    alert('Success')
                } else {
                    alert('Failure')
                }
            }
        )
        console.log('Propose Product')
    }

    render(){
        // const FIELDS = ['name', 'description', 'start_bid']
        return(
            <>
            <h3>Product Proposal Form</h3>
            <form>
                <h5>Product Name:</h5>
                <p><input type="text" name='name' onChange={this.handleProductChange}/></p>
                <h5>Product Description:</h5>
                <p><textarea name='description' rows='10' cols='50' onChange={this.handleProductChange}/></p>
                <h5>Starting Bid:</h5>
                <p><input type="number" name='start_bid' onChange={this.handleProductAmountChange} min='1'/></p>
                <button onClick={(e) => this.proposeProduct(e)}>Submit</button>
            </form>
            </>
        )
    }
}

function mapStateToProps(state){
    const { product } = state;
    return { product: product }
}

export default connect(mapStateToProps)(ProductForm);