import React from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../../Redux Toolkit/Customer/AuthSlice';
import { isValidEmail, isValidPassword, getEmailRequirements, getPasswordRequirements } from '../../../util/validation';

// Validation schema using Yup with regex patterns
const validationSchema = Yup.object({
    email: Yup.string()
        .required('Email is required')
        .test('email-format', getEmailRequirements(), (value) => {
            return value ? isValidEmail(value) : false;
        }),
    password: Yup.string()
        .required('Password is required')
        .test('password-format', getPasswordRequirements(), (value) => {
            return value ? isValidPassword(value) : false;
        })
});

const AdminLoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector(store => store);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(signin({ email: values.email, password: values.password, navigate }));
        },
    });

    const handleLogin = () => {
        formik.handleSubmit();
    };

    return (
        <div>
            <h1 className='text-center font-bold text-xl text-primary-color pb-8'>Admin Login</h1>
            <form onSubmit={formik.handleSubmit} className="space-y-5">
                <TextField
                    fullWidth
                    name="email"
                    label="Enter Your Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                />

                <TextField
                    fullWidth
                    name="password"
                    label="Enter Your Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                />

                <Button
                    disabled={auth.loading || !formik.isValid}
                    onClick={handleLogin}
                    fullWidth
                    variant='contained'
                    sx={{ py: "11px" }}
                >
                    {auth.loading ? <CircularProgress size={24} /> : "Login"}
                </Button>
            </form>
        </div>
    );
};

export default AdminLoginForm;
