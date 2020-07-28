import { Redirect } from 'react-router-dom';
import React from 'react';

export const LoginRedirector = () => {
    return <Redirect to="/login" />;
}