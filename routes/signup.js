const express = require('express');
const Joi = require('joi');
const Users = require('../schemas/users');

const router = express.Router();

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = await signupSchema.validateAsync(
      req.body
    );

    const existemail = await Users.find({ email });

    if (existemail.length) {
      return res.status(412).send({
        errorMessage: 'Email sudah digunakan.',
      });
    }

    await Users.create({ name, email, password });

    return res.status(201).send({ message: 'Akun berhasil dibuat.' });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).send({
      errorMessage: 'Format data tidak valid.',
    });
  }
});

module.exports = router;
