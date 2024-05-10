"use client";
import { Button } from "@/components/ui/button";
import CardWrapper from "./CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/login";
function LoginForm() {
  const [error, setError] = useState<string | undefined>("");

  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransaction] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransaction(() => {
      setError("");
      setSuccess("");
      login(values).then((data) => {
        console.log(data);
        if (data?.error) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <CardWrapper
      backButtonLabel="Don't have an account"
      backButtonHref="/auth/register"
      headerLabel="Welcome Back"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@mail.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
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
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className=" flex items-center justify-center m-auto w-1/3 font-normal border-primary border-[1px]"
            variant="link"
            disabled={isPending}
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
