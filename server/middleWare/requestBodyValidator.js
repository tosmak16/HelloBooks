
/**
 * @description middle ware for user details validation
 * 
 * @param {object} req -request object
 * 
 * @param {object} res - response object
 * 
 * @param {function} next 
 * 
 * @returns {object} response message
 */
export const userDetailsValidator = (req, res, next) => {
  req.checkBody({
    firstName: {
      notEmpty: {
        options: true,
        errorMessage: 'first name is required'
      },
      isLength: {
        options: [{ min: 2 }],
        errorMessage: 'first name length should be at least 2'
      }
    },
    lastName: {
      notEmpty: {
        options: true,
        errorMessage: 'last name is required'
      },
      isLength: {
        options: [{ min: 2 }],
        errorMessage: 'last name length should be at least 2'
      }
    },
    email: {
      notEmpty: {
        options: true,
        errorMessage: 'email is required'
      },
      isEmail: {
        errorMessage: 'email is invalid'
      }
    },
    username: {
      notEmpty: {
        options: true,
        errorMessage: 'username is required'
      },
      isLength: {
        options: [{ min: 3 }],
        errorMessage: 'username should be at least 3'
      }
    },
    password: {
      notEmpty: {
        options: true,
        errorMessage: 'password is required'
      },
      isLength: {
        options: [{ min: 6 }],
        errorMessage: 'password should be at least 6'
      }
    },
  });
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send({ message: errors[0].msg });
  }
  next();
};
/**
 * @description middle ware for book details validation
 * 
 * @param {object} req -request object
 * 
 * @param {object} res - response object
 * 
 * @param {function} next 
 * 
 * @returns {object} response message
 */
export const bookDetailsValidator = (req, res, next) => {
  req.checkBody({
    bookTitle: {
      notEmpty: {
        options: true,
        errorMessage: 'book title is required'
      },
      isLength: {
        options: [{ min: 2 }],
        errorMessage: 'book title length should be at least 2'
      }
    },
    author: {
      notEmpty: {
        options: true,
        errorMessage: 'author is required'
      },
      isLength: {
        options: [{ min: 2 }],
        errorMessage: 'author length should be at least 2'
      }
    },
    stockNumber: {
      notEmpty: {
        options: true,
        errorMessage: 'stock number is required'
      },
      matches: {
        options: /^[0-9]+$/,
        errorMessage: 'stock number should be a number'
      }
    },
    isbn: {
      notEmpty: {
        options: true,
        errorMessage: 'isbn is required'
      },
      matches: {
        options: /^[0-9]+$/,
        errorMessage: 'isbn should be a number'
      },
      isLength: {
        options: [{ min: 10 }],
        errorMessage: 'isbn length should be at least 10'
      }
    },
    category: {
      notEmpty: {
        options: true,
        errorMessage: 'book category is required'
      },
      matches: {
        options: /^[a-zA-Z]+$/,
        errorMessage: 'book category should be an aphabet'
      }
    },
    summary: {
      notEmpty: {
        options: true,
        errorMessage: 'summary is required'
      }
    }
  });
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send({ message: errors[0].msg });
  }
  next();
};

