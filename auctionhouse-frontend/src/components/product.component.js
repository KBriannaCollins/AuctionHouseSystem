import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class Product extends React.Component {
    
    PropTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        start_bid: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
    }

    componentDidMount() {
        console.log('Mounting Product')
    }

    /** componentDidUpdate records when update occurs. */
    componentDidUpdate() {
        console.log('Updating Product')
    }

    /** renders the product component.
     * @return {JSX} Returns an HTML template for products
     */
    render() {
        return (
        <table>
            <tbody>
                <tr>
                    <td>{this.props.product.name}</td>
                    <td>{this.props.product.description}</td>
                    <td>{this.props.product.start_bid}</td>
                    <td>{this.props.product.status}</td>
                </tr>
            </tbody>
        </table>
        )
    }
}

function mapStateToProps(state){
    const { product } = state;
    return { product: product }
}

export default connect(mapStateToProps)(Product);