"use client";

import { ReactElement, useState } from "react";
import { twMerge } from "tailwind-merge";
import "./auth-container.css";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { SignupForm } from "@/app/ui/auth/signup-form";
import { LoginForm } from "@/app/ui/auth/login-form";

export function AuthContainer(): ReactElement {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={twMerge(
        "custom-container",
        isActive ? "right-panel-active" : "",
      )}
    >
      <div className="form-container sign-up-container">
        <SignupForm />
      </div>
      <div className="form-container sign-in-container">
        <LoginForm />
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="text-left overlay-panel overlay-left">
            <div className="p-3 absolute left-5 top-5 z-[100]">
              <AlertDialogCancel className="bg-transparent border-0 hover:bg-transparent">
                <X className="text-gray-300" />
              </AlertDialogCancel>
            </div>
            <h1>Welcome Back!</h1>
            <p className="mb-4">
              To keep connected with us please login with your personal info
            </p>
            <Button
              className="text-white border bg-transparent"
              onClick={() => setIsActive(false)}
            >
              Sign In
            </Button>
          </div>
          <div className="overlay-panel overlay-right">
            <div className="p-3 absolute right-5 top-5 z-[100]">
              <AlertDialogCancel className="bg-transparent border-0 hover:bg-transparent">
                <X className="text-gray-300" />
              </AlertDialogCancel>
            </div>
            <h1>Hello, Friend!</h1>
            <p className="mb-4">
              Enter your personal details and start journey with us
            </p>
            <Button
              className="text-white border bg-transparent"
              onClick={() => setIsActive(true)}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
