"use client";
import { NewPasswordForm } from "@/components/auth/new-password-form";
import React, { Suspense } from "react";
import { GridLoader } from "react-spinners";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={
      <div className="flex flex-col justify-center items-center h-max pt-[30vh] gap-4">
        <GridLoader color="#3b82f6" />
        <h1 className="text-gray-500">Loading....</h1>
      </div>
    }>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPasswordPage;
