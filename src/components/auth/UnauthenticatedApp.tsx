
import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

const UnauthenticatedApp = () => {
  return (
    <div className="min-h-screen flex flex-col bg-recruiter-background">
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="font-bold text-xl">
            <span className="gradient-text">People</span>GPT
          </div>
          
          <div className="flex items-center gap-3">
            <SignInButton>
              <Button variant="outline" size="sm">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center space-y-10 p-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Welcome to <span className="gradient-text">PeopleGPT</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please sign in or sign up to access the AI-powered recruitment platform.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <SignInButton>
              <Button size="lg" variant="outline">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button size="lg">Sign Up</Button>
            </SignUpButton>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 py-8 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-xl">
                <span className="gradient-text">People</span>GPT
              </div>
              <p className="text-gray-500 text-sm mt-1">
                AI-powered recruitment platform
              </p>
            </div>
            <div className="text-gray-500 text-sm">
              © 2025 PeopleGPT. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UnauthenticatedApp;
