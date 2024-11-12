"use client";
import React, { Suspense } from "react";
import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { GridLoader } from "react-spinners";

const NewVerificationPage = () => {
  return (
    <Suspense fallback={
      <div className="flex flex-col justify-center items-center h-max pt-[30vh] gap-4">
        <GridLoader color="#3b82f6" />
        <h1 className="text-gray-500">Loading....</h1>
      </div>
    }>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerificationPage;
