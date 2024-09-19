import { LoginForm } from "@/components/auth/login-form"
import React, { Suspense } from "react";
const LoginPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}

export default LoginPage