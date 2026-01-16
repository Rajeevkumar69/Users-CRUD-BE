import StatusCode from "http-status-codes";
import userModel from "../models/user.model.js";

const { OK, CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST, CONFLICT, NOT_FOUND } = StatusCode;

const userController = {

     getAll: async (req, res) => {
          try {
               const users = await userModel.find(req.query);
               return res.status(OK).json({
                    status: OK,
                    message: "All users",
                    data: users
               });
          } catch (err) {
               return res.status(INTERNAL_SERVER_ERROR).json({ status: INTERNAL_SERVER_ERROR, message: err.message });
          }
     },

     createUser: async (req, res) => {
          try {
               const { email, name } = req.body;
               if (!email && name) {
                    return res.status(BAD_REQUEST).json({
                         status: BAD_REQUEST,
                         message: "Email and Name is required"
                    });
               }

               const existingUser = await userModel.findOne({ email });

               if (existingUser) {
                    return res.status(CONFLICT).json({
                         status: CONFLICT,
                         message: "User already exists"
                    });
               }

               const data = await userModel.create(req.body);

               return res.status(CREATED).json({
                    status: CREATED,
                    message: "User created",
                    data
               });

          } catch (err) {
               return res.status(INTERNAL_SERVER_ERROR).json({
                    status: INTERNAL_SERVER_ERROR,
                    message: err.message
               });
          }
     },

     updateUser: async (req, res) => {
          try {
               const { id } = req.params;

               if (!id) {
                    return res.status(BAD_REQUEST).json({
                         status: BAD_REQUEST,
                         message: "User ID is required"
                    });
               }

               const data = await userModel.findByIdAndUpdate(id, req.body, { new: true });

               if (data) {
                    return res.status(OK).json({
                         status: OK,
                         message: "User updated successfully",
                         data
                    });
               } else {
                    return res.status(NOT_FOUND).json({
                         status: NOT_FOUND,
                         message: "User not found"
                    });
               }

          } catch (err) {
               return res.status(INTERNAL_SERVER_ERROR).json({
                    status: INTERNAL_SERVER_ERROR,
                    message: err.message
               });
          }
     },

     deleteUser: async (req, res) => {
          try {
               const { id } = req.params;
               if (!id) {
                    return res.status(BAD_REQUEST).json({
                         status: BAD_REQUEST,
                         message: "User ID is required"
                    });
               }
               const deletedUser = await userModel.findByIdAndDelete(id);

               if (deletedUser) {
                    return res.status(NOT_FOUND).json({
                         status: NOT_FOUND,
                         message: "User not found"
                    });
               } else {
                    return res.status(OK).json({
                         status: OK,
                         message: "User deleted successfully"
                    });

               }

          } catch (err) {
               return res.status(INTERNAL_SERVER_ERROR).json({
                    status: INTERNAL_SERVER_ERROR,
                    message: err.message
               });
          }
     },

     getUserById: async (req, res) => {
          try {
               const { id } = req.params;
               if (!id) {
                    return res.status(BAD_REQUEST).json({
                         status: BAD_REQUEST,
                         message: "User ID is required"
                    });
               }
               const user = await userModel.findById(req.params.id);
               if (user) {
                    return res.status(OK).json({
                         status: OK,
                         message: "User found",
                         data: user
                    });
               } else {
                    return res.status(NOT_FOUND).json({
                         status: NOT_FOUND,
                         message: "User not found"
                    });
               }
          } catch (err) {
               return res.status(INTERNAL_SERVER_ERROR).json({
                    status: INTERNAL_SERVER_ERROR,
                    message: err.message
               });
          }
     }
};

export default userController;