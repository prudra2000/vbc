import LoginButton from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import React from 'react';

const HomePage: React.FC = () => {
    return (
        <main className="flex h-full flex-col items-center justify-center bg-blue-500">
            <h1>Welcome to the Home Page</h1>
            <p>This is a simple home page.</p>
            <div className="flex flex-row gap-2"> 
              <LoginButton>
                <Button>
                  Login
                </Button>
              </LoginButton>
            </div>
        </main>
    );
};

export default HomePage;
