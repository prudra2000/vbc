"use client";
import { useState, useTransition, useEffect } from "react";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { Check, X } from "lucide-react";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  
  // Function to validate password
  const validatePassword = (password: string) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*()_\-+={}[\]:;"'<>,.?/\\|`~]/.test(password),
    });
  };
  

  // Update validation on password change
  useEffect(() => {
    const subscription = form.watch((value) => {
      validatePassword(value.password || "");
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Register"
      backButtonLabel="Already have an account?"
      backButtonUrl="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@gmail.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="********"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="py-2 border-l-2 pl-2">
                    <ul className="list-none p-0 m-0 text-sm flex flex-col gap-1 ">
                      <li
                        className={`flex items-center gap-1 ${passwordValidation.length ? "text-green-500" : "text-red-500"}`}
                      >
                        {passwordValidation.length ? <Check /> : <X />} At least 8
                        characters
                      </li>
                      <li
                        className={`flex items-center gap-1 ${passwordValidation.uppercase ? "text-green-500" : "text-red-500"}`}
                      >
                        {passwordValidation.uppercase ? <Check /> : <X />} At least 1
                        uppercase letter
                      </li>
                      <li
                        className={`flex items-center gap-1 ${passwordValidation.lowercase ? "text-green-500" : "text-red-500"}`}
                      >
                        {passwordValidation.lowercase ? <Check /> : <X />} At least 1
                        lowercase letter
                      </li>
                      <li
                        className={`flex items-center gap-1 ${passwordValidation.number ? "text-green-500" : "text-red-500"}`}
                      >
                        {passwordValidation.number ? <Check /> : <X />} At least 1
                        number
                      </li>
                      <li
                        className={`flex items-center gap-1 ${passwordValidation.specialChar ? "text-green-500" : "text-red-500"}`}
                      >
                        {passwordValidation.specialChar ? <Check /> : <X />} At least
                        1 special character
                      </li>
                    </ul>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || ""} />
          <FormSuccess message={success || ""} />
          <Button className="w-full" type="submit" disabled={isPending}>
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
