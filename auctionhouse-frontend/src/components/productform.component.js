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
                <p><label>Product Name:</label></p>
                <p><input type="text" name='name' onChange={this.handleProductChange}/></p>
                <p><label>Product Description:</label></p>
                <p><input type="text" name='description' onChange={this.handleProductChange}/></p>
                <p><label>Starting Bid:</label></p>
                <p><input type="number" name='start_bid' onChange={this.handleProductAmountChange} min='1'/></p>
                <button className='btn btn-primary' onClick={(e) => this.proposeProduct(e)}>Submit</button>
            </form>
            {/* <div className='container border'>
                <h3>Product Proposal Form</h3>
                {
                FIELDS.map((name)=> {
                    return(
                        <div key={name}>
                            <label htmlFor={name}>{name}</label>
                            <input type="text" className='form-control' name={name}
                                value={this.props.newProduct[name]}
                                onChange={(e)=> this.handleProductFieldChange(e)}/>
                        </div>
                    )
                })    
                }
                <button className='btn btn-primary'
                    onClick={(e) => this.proposeProduct(e)}>Submit</button>


            </div> */}
            </>
        )
    }
}

function mapStateToProps(state){
    const { product } = state;
    return { product: product }
}

export default connect(mapStateToProps)(ProductForm);