import isEmpty from 'lodash/isEmpty';
import db from '../models/index';

const validAlpha = /^[A-Za-z]+$/;
export const validateAddCategory = async (categoryName, decoded) => {
  const responseMessage = { status: 200, message: '' };
  if (isEmpty(categoryName)) {
    responseMessage.message = await 'category name can not be empty';
    responseMessage.status = await 400;
  } else if (!categoryName.match(validAlpha)) {
    responseMessage.message = await 'category name must be an alphabet';
    responseMessage.status = await 400;
  } else if (categoryName.length < 3) {
    responseMessage.message = await 'category name should be at least 3';
    responseMessage.status = await 400;
  } else if (categoryName.length < 3) {
    responseMessage.message = await 'category name should be at least 3';
    responseMessage.status = await 400;
  } else if (decoded.role.toString() === 'user') {
    responseMessage.message = await 'Access Denied!';
    responseMessage.status = await 403;
  } else {
    const categoryExist = await db.Categories.findOne({
      where: { categoryName }
    });
    if (categoryExist !== null) {
      responseMessage.message = await 'Book category already exist';
      responseMessage.status = await 400;
    }
  }
  return responseMessage;
};

export default validateAddCategory;
