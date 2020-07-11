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
            <div className="form-group w-50">
                <form>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <h3 className="form-group">Product Proposal Form</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h5>Product Name:</h5>
                        </div>
                        <div className="col">
                        <input type="text" className="form-control" name='name' onChange={this.handleProductChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"><h5>Product Description:</h5></div>
                        <div className="col">
                            <textarea className="form-control" name='description' rows="10" onChange={this.handleProductChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"><h5>Starting Bid:</h5></div>
                        <div className="col">
                            <input className="form-control" type="number" name='start_bid' onChange={this.handleProductAmountChange} min='1'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                        <button className="form-control" onClick={(e) => this.proposeProduct(e)}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { product } = state;
    return { product: product }
}

export default connect(mapStateToProps)(ProductForm);