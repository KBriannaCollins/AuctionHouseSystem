import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import ProductService from '../services/product.service';

class Product extends React.Component {
    productService = new ProductService()
    PropTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        start_bid: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
    }

    componentDidMount() {
        console.log('Mounting Product')
        this.productService.getProducts();
        this.renderTableData = this.renderTableData.bind(this);
    }

    /** componentDidUpdate records when update occurs. */
    componentDidUpdate() {
        console.log('Updating Product')
        this.productService.getProducts().then(
            (resp) => {
                console.log(resp)
                this.props.dispatch({type: 'loadProducts', products: resp.data})
            }
        )
    }
    renderTableData(){
        pro = this.props.products
        return pro.map((product) =>{
            const prod = ['name', 'description', 'start_bid', 'status'];
            return(
                <tr>
                    <td>{product['name']}</td>
                    <td>{product.name}</td>
                </tr>
            )


        })

    }

    /** renders the product component.
     * @return {JSX} Returns an HTML template for products
     */
    render() {
        let products = this.props.products
        
        return (
            <>
            <h3>Auctions</h3>
            <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Starting Bid</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                            {this.renderTableData()}
                    </tbody>
            </table>
            </>
        )
    }
}

function mapStateToProps(state){
    const { product } = state;
    return { product: product }
}

export default connect(mapStateToProps)(Product);