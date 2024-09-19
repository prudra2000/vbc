"use client";
import { BeatLoader } from "react-spinners";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(async () => {
    if(error || success) return;
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div>
      <CardWrapper
        headerLabel="Confirming your email..."
        backButtonLabel="Back to login"
        backButtonUrl="/auth/login"
      >
        <div className="flex flex-col gap-4 justify-center items-center">
            {!success && !error && <BeatLoader />}
            {success && <FormSuccess message={success || ""} />}
            {error && <FormError message={error || ""} />}
        </div>
      </CardWrapper>
    </div>
  );
};
