import React from 'react'
import PropTypes from 'prop-types'

class Products extends React.Component {
    
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
            <>
                <tr>
                    <td>{this.props.products.name}</td>
                    <td>{this.props.products.description}</td>
                    <td>{this.props.products.start_bid}</td>
                    <td>{this.props.products.status}</td>
                </tr>
            </>
        )
    }
}

export default Products;
