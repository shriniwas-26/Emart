import { Button, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { signup } from '../../../Redux Toolkit/Customer/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword, isValidName, getEmailRequirements, getPasswordRequirements, getNameRequirements } from '../../../util/validation';

// Validation schema using Yup with regex patterns
const validationSchema = Yup.object({
    email: Yup.string()
        .required('Email is required')
        .test('email-format', getEmailRequirements(), (value) => {
            return value ? isValidEmail(value) : false;
        }),
    name: Yup.string()
        .required('Full name is required')
        .test('name-format', getNameRequirements(), (value) => {
            return value ? isValidName(value) : false;
        }),
    password: Yup.string()
        .required('Password is required')
        .test('password-format', getPasswordRequirements(), (value) => {
            return value ? isValidPassword(value) : false;
        }),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(store => store.auth);

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(signup({ 
                fullName: values.name, 
                email: values.email, 
                password: values.password,
                confirmPassword: values.confirmPassword,
                navigate 
            }));
            console.log('Form data:', values);
        }
    });

    const handleSignup = () => {
        formik.handleSubmit();
    };

    return (
        <div className="w-full">
            <h1 className='text-center font-bold text-xl text-primary-color pb-3'>Signup</h1>
            <form className="space-y-3">
                <TextField
                    fullWidth
                    size="small"
                    name="name"
                    label="Enter Your Full Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                />

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

                <TextField
                    fullWidth
                    size="small"
                    name="confirmPassword"
                    label="Confirm Your Password"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : undefined}
                />

                <Button
                    disabled={auth.loading || !formik.isValid}
                    onClick={handleSignup}
                    fullWidth
                    variant='contained'
                    sx={{ py: "8px", mt: 1 }}
                >
                    {auth.loading ? <CircularProgress size={20} /> : "Signup"}
                </Button>
            </form>
        </div>
    );
};

export default SignupForm;
