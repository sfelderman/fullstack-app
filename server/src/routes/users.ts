import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import keys from '../../config/keys';
// import passport from 'passport';
import { Router } from 'express';

// Load input validation
// const validateLoginInput = require('../../validation/login');

// Load User model
import User from '../models/User';
import validateRegistration from '../validation/userRegistration';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ email: 'Email already exists' });
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  // Hash password before saving in database
  bcrypt.genSalt(10, (_err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) res.send(err);
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => res.send(err));
    });
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
// router.post('/login', (req, res) => {
//   // Form validation

//   const { errors, isValid } = validateLoginInput(req.body);

//   // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   const email = req.body.email;
//   const password = req.body.password;

//   // Find user by email
//   User.findOne({ email }).then(user => {
//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ emailnotfound: 'Email not found' });
//     }

//     // Check password
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         // User matched
//         // Create JWT Payload
//         const payload = {
//           id: user.id,
//           name: user.name
//         };

//         // Sign token
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           {
//             expiresIn: 31556926 // 1 year in seconds
//           },
//           (err, token) => {
//             res.json({
//               success: true,
//               token: 'Bearer ' + token
//             });
//           }
//         );
//       } else {
//         return res.status(400).json({ passwordincorrect: 'Password incorrect' });
//       }
//     });
//   });
// });

export default userRouter;
