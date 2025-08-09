import { Button, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { signin } from '../../../Redux Toolkit/Customer/AuthSlice';
import { useNavigate } from 'react-router-dom';
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

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(store => store.auth);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(signin({ email: values.email, password: values.password, navigate }));
            console.log('Form data:', values);
        }
    });

    const handleLogin = () => {
        formik.handleSubmit();
    };

    return (
        <div className="w-full">
            <h1 className='text-center font-bold text-xl text-primary-color pb-3'>Login</h1>
            <form className="space-y-3">
                <TextField
                    fullWidth
                    size="small"
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
                    size="small"
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
                    sx={{ py: "8px", mt: 1 }}
                >
                    {auth.loading ? <CircularProgress size={20} /> : "Login"}
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
