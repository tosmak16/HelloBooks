import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 * 
 * 
 * @class TableRow
 * @extends {React.Component}
 */
class TableRow extends React.Component {
  /**
   * 
   * 
   * @returns 
   * @memberof TableRow
   */
  render() {
    const { row } = this.props;

    return (
      <tr >
        <td key={ row.id }>.</td>
        <td><img src={ row.image } style={{ width: '30px', height: '30px' }} alt="name" /></td>
        <td key={ row.bookTitle }><Link href="#"> {row.bookTitle}</Link></td>
        <td >{row.author}</td>
        <td>{row.category}</td>
        <td >{row.stocknumber}</td>
        <td><button
          name={ row.id }
          onClick={ this.props.onDelete } className="material-icons red-text "
        >delete_forever</button></td>
      </tr >
    );
  }
}

TableRow.propTypes = {
  onDelete: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
};

export default TableRow;
