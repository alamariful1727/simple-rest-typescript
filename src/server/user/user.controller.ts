import { Request, Response, NextFunction } from 'express';
import { IUser, User } from './user.model';
export let getAllUser = (req: Request, res: Response) => {
  // get all User
  User.find()
    .exec()
    .then((users: any) => {
      const response = {
        count: users.length,
        users: users.map((user: IUser) => {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            type: user.type,
            sex: user.sex,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err: any) => {
      res.status(500).json({
        error: err,
      });
    });
};
export let getUser = (req: Request, res: Response) => {
  // get User
  User.findById(req.params.uid)
    .exec()
    .then((user: any) => {
      const response = {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          type: user.type,
          sex: user.sex,
        },
      };
      res.status(200).json(response);
    })
    .catch((err: any) => {
      res.status(500).json({
        error: err,
      });
    });
};
export let addUser = (req: Request, res: Response) => {
  // Check for JSON
  if (!req.is('application/json')) {
    return res.send("Expects 'application/json'");
  }

  const { name, email, type, sex } = req.body;

  const user = new User({
    name,
    email,
    type,
    sex,
  });

  user
    .save()
    .then((user: any) => {
      res.status(201).json({
        message: 'New user added.',
        createdUser: {
          _id: user._id,
          name: user.name,
          email: user.email,
          type: user.type,
          sex: user.sex,
        },
      });
    })
    .catch((err: any) => {
      // console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
export let updateUser = (req: Request, res: Response) => {
  // Check for JSON
  if (!req.is('application/json')) {
    return res.send("Expects 'application/json'");
  }

  User.findOneAndUpdate({ _id: req.params.uid }, req.body)
    .exec()
    .then((user: any) => {
      if (user) {
        res.status(200).json({
          message: 'User updated.',
          request: {
            type: 'GET',
            url: `${req.originalUrl}`,
          },
        });
      } else {
        res.status(400).json({
          message: `No user found to update.`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).json({
        error: err,
      });
    });
};
export let deleteUser = (req: Request, res: Response) => {
  User.findByIdAndRemove({ _id: req.params.uid })
    .exec()
    .then((user: any) => {
      if (user) {
        res.status(200).json({
          message: 'User deleted.',
        });
      } else {
        res.status(400).json({
          message: `No user found to delete.`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).json({
        error: err,
      });
    });
};
