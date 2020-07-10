import React, { Component } from 'react';
import ProductService from '../services/product.service'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

function ProductCard(props) {
    const history = useHistory();
    
    const handleClickApprove = props.handleClickApprove
    const handleClickDecline = props.handleClickDecline

    let productId = props.productInfo._id
    let productName = props.productInfo.name
    let productDescription = props.productInfo.description
    let productStartingBid = props.productInfo.start_bid
    let productStatus = props.productInfo.status

    
    return(
        <>
            <Card style={{width: '18rem'}}>
                <Card.Title>
                    <div>
                        {productName}
                    </div>
                </Card.Title>
                <Card.Body>
                    <div>
                        Description: {productDescription}
                    </div>
                    <div>
                        Starting bid: {productStartingBid}
                    </div>
                    <div>
                        Status: {productStatus}
                    </div>
                </Card.Body>
                <Button onClick={handleClickApprove} name={productId}>Approve Product</Button>
                <Button onClick={handleClickDecline} name={productId}>Decline Product</Button>
            </Card>
        </>
    )
}

class ProductList extends Component {
    constructor(props) {
        super(props)
        this.handleClickApprove = this.handleClickApprove.bind(this);
        this.handleClickDecline = this.handleClickDecline.bind(this);
    
    }

    componentDidMount() {
        this.productService.getProducts().then(resp => {
            this.props.getProductList(resp.data)
        })
    }

    productService = new ProductService();

    fullProductList(products) {
        
        return (
            <>
                {
                    products.map((product) => {
                        return <ProductCard handleClickApprove={this.handleClickApprove} handleClickDecline={this.handleClickDecline} key={product._id} productInfo={product} />
                    })
                }
            </>
        )
    }
    handleClickApprove(e) {
        e.preventDefault()
        console.log("In handle click Approve")
        let infoObject = {_id: e.target.name, status: 'Approved'}
        this.productService.updateProductStatus(infoObject).then(
            (resp) => {
                this.props.dispatch({type: 'loadProduct', product: {}})
            }
        )
    }
    handleClickDecline(e) {
        e.preventDefault()
        console.log("In handle click Decline")
        let infoObject = {_id: e.target.name, status: 'Declined'}
        this.productService.updateProductStatus(infoObject).then(
            (resp) => {
                this.props.dispatch({type: 'loadProduct', product: {}})
            }
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
                    <h1>Nothing to show</h1>
                </>
            )
        }
    }
}

function mapStateToProps(state) {
    const { productList, product } = state
    return { productList: productList, product: product }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductList: (list) => dispatch({type: 'loadProductList', productList: list}),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)