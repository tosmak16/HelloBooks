import lodash from 'lodash';

const validAlpha = /^[A-Za-z]+$/;

export const validateCategoryName = async (categoryName) => {
  const responseMessage = { status: 'ok', message: '' };
  if (lodash.isEmpty(categoryName)) {
    responseMessage.message = await 'category name can not be empty';
    responseMessage.status = await 'error';
  } else if (!categoryName.match(validAlpha)) {
    responseMessage.message = await 'category name must be an alphabet';
    responseMessage.status = await 'error';
  } else if (categoryName.length < 3) {
    responseMessage.message = await 'category name should be at least 3';
    responseMessage.status = await 'error';
  }
  return responseMessage;
};
export default validateCategoryName;
