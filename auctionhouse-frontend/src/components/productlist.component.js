import React, { Component } from 'react';
import ProductService from '../services/product.service'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

function ProductCard(props) {
    const history = useHistory();

    let productId = props.productInfo._id

    function handleClick() {
        history.push(`/products/${productId}`)
    }

    return(
        <>
            <Card style={{width: '18rem'}}>
                <Card.Title>Product</Card.Title>
                <Card.Body>Here are all the products</Card.Body>
                <Button onClick={handleClick}>Change status on this product</Button>
            </Card>
        </>
    )
}

class ProductList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.productService.getProducts().then(resp => {
            this.props.getProductList(resp.data.products)
        })
    }

    productService = new ProductService;

    fullProductList(products) {
        
        return (
            <>
                {
                    products.map((product) => {
                        return <ProductCard key={product._id} productInfo={product} />
                    })
                }
            </>
        )
    }

    render() {
        console.log(this.props.productList)
        if(this.props.productList && this.props.productList.length != 0) {
            return this.fullProductList(this.props.productList)
        }
        else {
            return(
                <>
                    <h1>Loading...</h1>
                </>
            )
        }
    }
}

function mapStateToProps(state) {
    const { productList } = state;
    return { productList: productList }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductList: (list) => dispatch({type: 'loadProductList', productList: list})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)