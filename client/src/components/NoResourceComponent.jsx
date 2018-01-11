import React from 'react';

/**
 * @description This componet is should to notify a user that books are not available
 * 
 * @function NoResourceComponent
 * 
 * @param {object} props
 * 
 * @returns {views} Searchbar element and properties
 */
const NoResourceComponent = () =>
  (<div id="bb_table" className="row">
    <div className="  col l10 offset-l2 col m10 offset-m2 col s12" >
      <img
        id="emptyShelf"
        src="https://res.cloudinary.com/tosmak/image/upload/v1515057695/emptyShelf_snazji.jpg"
        alt="emptyShelf"
      />
      <p id="emptyShelfMessage">
        <strong>
          No Available Books!
        </strong>
      </p>
      <img
        id="emptyShelfIcon"
        src="https://res.cloudinary.com/tosmak/image/upload/v1515058191/smiley_sad_wdjuay.png"
        alt="emptyShelfIcon"
      />
    </div>
  </div>);
export default NoResourceComponent;
