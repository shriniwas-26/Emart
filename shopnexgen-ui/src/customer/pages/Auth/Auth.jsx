import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { Alert, Button, Snackbar } from '@mui/material';
import SignupForm from './SignupForm';
import { useAppSelector } from '../../../Redux Toolkit/Store';

const Auth = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleCloseSnackbar = () => setSnackbarOpen(false);

    const auth = useAppSelector(store => store.auth);

    useEffect(() => {
        if (auth.error) {
            setSnackbarOpen(true);
            console.log("store error ", auth.error);
        }
    }, [auth.error]);

    return (
        <div className='flex justify-center h-[90vh] items-center'>
            <div className='max-w-md h-[85vh] rounded-md border shadow-lg flex flex-col'>
                {/* Emart Banner Header */}
                <div className='w-full rounded-t-md bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-center relative overflow-hidden'>
                    {/* Background effects */}
                    <div className='absolute inset-0 opacity-20'>
                        <div className='absolute top-4 left-4 w-8 h-8 bg-white rounded-full opacity-30'></div>
                        <div className='absolute top-8 right-8 w-4 h-4 bg-white rounded-full opacity-40'></div>
                        <div className='absolute bottom-6 left-8 w-6 h-6 bg-white rounded-full opacity-25'></div>
                        <div className='absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full opacity-35'></div>
                    </div>
                    
                    {/* Emart Branding */}
                    <h1 className='text-4xl font-bold text-yellow-300 mb-2 relative z-10'>
                        Emart
                    </h1>
                    <p className='text-white text-sm relative z-10'>
                        next generation shopping
                    </p>
                </div>
                
                <div className='flex-1 px-10 py-6 overflow-y-auto'>
                    {isLoginPage ? <LoginForm /> : <SignupForm />}

                    <div className='flex items-center gap-1 justify-center mt-4'>
                        <p className="text-sm">{isLoginPage ? "Don't have an account?" : "Already have an account?"}</p>
                        <Button onClick={() => setIsLoginPage(!isLoginPage)} size='small'>
                            {isLoginPage ? "Create Account" : "Login"}
                        </Button>
                    </div>
                </div>
            </div>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {auth.error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Auth;
