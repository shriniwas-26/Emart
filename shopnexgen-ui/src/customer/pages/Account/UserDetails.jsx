import { Avatar, Box, Button, Divider, Modal, TextField, Alert, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ProfileFildCard from "../../../seller/pages/Account/ProfileFildCard";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserProfile } from "../../../Redux Toolkit/Customer/UserSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const UserDetails = () => {
  const { user } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      mobile: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      mobile: Yup.string().required("Mobile number is required"),
    }),
    onSubmit: (values) => {
      console.log("Updating user profile:", values);
      dispatch(updateUserProfile(values));
      handleClose();
      setSnackbarOpen(true);
    },
  });

  useEffect(() => {
    if (user.user) {
      formik.setValues({
        fullName: user.user.fullName || "",
        email: user.user.email || "",
        mobile: user.user.mobile || "",
      });
    }
  }, [user.user]);

  useEffect(() => {
    if (user.profileUpdated || user.error) {
      setSnackbarOpen(true);
    }
  }, [user.profileUpdated, user.error]);

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center pb-6 justify-between">
            <h1 className="text-2xl font-bold text-gray-600">Personal Details</h1>
            <div>
              <Button
                onClick={handleOpen}
                size="small"
                sx={{ borderRadius: "2.9rem" }}
                variant="contained"
                className="w-16 h-16"
              >
                <EditIcon />
              </Button>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex justify-center">
              <Avatar
                sx={{ width: "10rem", height: "10rem" }}
                src="https://cdn.pixabay.com/photo/2014/11/29/19/33/bald-eagle-550804_640.jpg"
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <ProfileFildCard keys="Name" value={user.user?.fullName} />
              <Divider />
              <ProfileFildCard keys="Email" value={user.user?.email} />
              <Divider />
              <ProfileFildCard keys="Mobile" value={user.user?.mobile} />
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-xl font-bold text-center mb-6">Update Profile</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              id="fullName"
              name="fullName"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="mobile"
              name="mobile"
              label="Mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
            <div className="flex gap-3 pt-4">
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={!formik.isValid || user.loading}
              >
                {user.loading ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={user.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {user.error ? user.error : "Profile Updated Successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserDetails;
