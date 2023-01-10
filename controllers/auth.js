import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import config from 'config';
import ApiError from '../helpers/ApiError.js';
import User from '../models/user.js';

import validateUser from '../services/validation/user.js';
// import {
//   validateUser,
//   validateChangePassword,
// } from '../services/validation/user.js';

export default {
  async create(req, res, next) {
    const { error } = validateUser(req.body);
    try {
      if (error)
        return res.send({ success: false, message: error.details[0].message });

      // if (!req.file)
      //   return res.send({ success: false, message: 'Image required' });

      const user = await User.findOne({ email: req.body.email });
      if (user)
        return res.send({
          success: false,
          message: 'This email is already in use',
        });
      await new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        department: req.body.department,
        classroom: req.body.classroom,
        semester: req.body.semester,
        city: req.body.city,
        avatar: req.avatar,
        mobile: req.body.mobile,
      }).save();
      res.send({ success: true, message: 'User created!' });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.send({
          success: false,
          message: 'Email or password is not valid',
        });

      if (req.body.password != user.password)
        return res.send({
          success: false,
          message: 'Email or password is not valid',
        });

      res.send({ success: true, token: createToken(user._id), user: user });
    } catch (error) {
      next(error);
    }
  },
  async getUser(req, res, next) {
    try {
      const user = await User.findById(req.user._id);
      if (!user)
        throw new ApiError(404, {
          message: `user with id : ${req.user._id} is not found`,
        });
      res.send({ success: true, user: user });
    } catch (error) {
      next(error);
    }
  },
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user)
        throw new ApiError(404, {
          message: `user with id : ${req.user._id} is not found`,
        });
      res.send({ success: true, user: user });
    } catch (error) {
      next(error);
    }
  },
  async getAdminUser(req, res, next) {
    try {
      const user = await User.findById(req.params.userId);
      if (!user)
        throw new ApiError(404, {
          message: `user with id : ${req.params.userId} is not found`,
        });
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },
  async getAll(req, res, next) {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    const { userId } = req.params;
    const { error } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user)
        return res.send({
          success: false,
          message: 'No user found with the provided id',
        });

      if (error)
        return res.send({ success: false, message: error.details[0].message });

      let imageUrl = user.avatar;
      if (req.file && user.avatar != req.file.path) {
        imageUrl = req.file.path;
        clearImage(user.avatar);
      }

      const updateUser = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        department: req.body.department,
        classroom: req.body.classroom,
        semester: req.body.semester,
        city: req.body.city,
        avatar: imageUrl,
        mobile: req.body.mobile,
      };
      await User.findByIdAndUpdate(userId, updateUser, { new: true });
      res.send({ success: true, message: 'User updated!' });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    let { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user)
        return res
          .status(400)
          .send({ success: false, message: 'User not Found.' });

      clearImage(user.avatar);

      await User.deleteOne({ _id: userId });
      res.status(200).send({ success: true, message: 'User Deleted!' });
    } catch (error) {
      next(error);
    }
  },
  async changePassword(req, res, next) {
    // const { error } = userValidation.validateChangePassword(req.body);
    let error;
    try {
      if (error)
        return res.send({ success: false, message: error.details[0].message });

      const user = await User.findOne({ email: req.user.email });
      if (!user)
        return res.send({ success: false, message: 'Email not exist' });

      if (req.body.password !== req.user.password)
        return res.send({ success: false, message: 'Wrong Password' });

      await User.findByIdAndUpdate(
        req.user._id,
        { password: req.body.newPassword },
        { new: true }
      );
      res.send({ success: true, message: 'Password Changed' });
    } catch (error) {
      next(error);
    }
  },
  async AnsweredSuject(req, res, next) {
    try {
      await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { isAnswered: req.body.subjectId } },
        { new: true }
      );
      res.send({ success: true });
    } catch (error) {
      next(error);
    }
  },
};

const createToken = (userId) => {
  return jwt.sign({ _id: userId }, config.get('jwtSecret'), {
    expiresIn: 600000,
  });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
