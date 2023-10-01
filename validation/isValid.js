const Joi = require('joi');

// schemes
const userSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(50)
    .error(new Error('Not valid name.')),
    lastname: Joi.string()
    .required()
    .min(3)
    .max(50)
    .error(new Error('Not valid lastname.')),
  email: Joi.string()
    .required()
    .email()
    .max(100)
    .error(new Error('Not valid email')),
    age: Joi.number()
    .integer()
    .required()
    .min(1)
    .max(99)
    .positive()
});

const bookSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(200)
    .error(new Error('Title not valid')),
    authors: Joi.string()
    .required()
    .min(3)
    .max(100)
    .error(new Error('Authors not valid.')),
    coverImg: Joi.string()
    .required()
    .min(10)
    .error(new Error('Cover img not valid.')),
    description: Joi.string()
    .error(new Error('Description not valid.')),
    published: Joi.string()
    .min(9)
    .max(11)
    .error(new Error('Published date not valid.')),
    publisher: Joi.string()
    .min(3)
    .max(50)
    .error(new Error('Publisher not valid.')),
    userid: Joi.string()
    .required()
    .min(24)
    .max(24)
    .error(new Error('Id not valid')),
  });

  const idSchema = Joi.object({
    id: Joi.string()
    .required()
    .min(24)
    .max(24)
    .error(new Error('Id not valid')),
  });

  // validation
  const validateBooks = (req, res, next)=>{
    if (req.body.title && req.body.authors && req.body.coverImg && req.body.description &&
      req.body.published && req.body.publisher && req.body.userid) {
      const { error } = bookSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: 'error',
          message: error.message,
        });
      }
    } 
    next();
  }

  const validateUsers = (req, res, next)=>{
    if (req.body.name && req.body.lastname && req.body.email && req.body.age) {
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: 'error',
          message: error.message,
        });
      }
    } 
    next();
  }

  const validateParams = (req, res, next) => {
    if (req.params.id) {
      const { error } = idSchema.validate(req.params);
      if (error) {
        return res.status(400).json({
          status: 'error',
          message: error.message,
        });
      }
    } 
    next();
  };

module.exports = { validateBooks, validateUsers, validateParams };
