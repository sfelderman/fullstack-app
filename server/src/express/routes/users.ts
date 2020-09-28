import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Router } from 'express';

import User from '../../models/User';
import validateLoginInput from '../validation/users/userLogin';
import validateRegistrationInput from '../validation/users/userRegistration';
import useCheckJWT from '../init/checkJwt';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);
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

userRouter.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json({ errors });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'Email not found' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: 'Password incorrect' });
  }

  const payload = {
    id: user.id,
    username: user.username
  };

  jwt.sign(
    payload,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.secretOrKey!,
    {
      expiresIn: 60 * 60 * 4 // 4 hours
    },
    (err, token) => {
      if (err) console.error(err);

      return res.status(200).json({
        success: true,
        token: 'Bearer ' + token
      });
    }
  );
});

userRouter.delete('/', useCheckJWT, async (req, res) => {
  const userId = req.user?.id;
  try {
    const user = await User.findByIdAndRemove(userId); // Returns the updated document.

    if (!user) {
      return res.status(404).json({
        message: 'User not found with id: ' + userId
      });
    }
    return res.status(200).json({
      message: 'User deleted successfully',
      user
    });
  } catch (err) {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).json({
        message: 'User not found with id: ' + userId,
        error: err
      });
    }
    return res.status(500).json({
      message: 'Error deleting user with id: ' + userId,
      error: err
    });
  }
});

export default userRouter;
