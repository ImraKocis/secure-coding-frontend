"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signup } from "@/app/actions/auth/actions";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { set as setUser } from "@/lib/redux/features/userSlice";
import { getUser } from "@/app/actions/user/actions";
import { registerFormSchema } from "@/lib/auth/definitions";

export function SignupForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerFormSchema>) {
    const response = await signup(data);

    if (!response) {
      toast({
        variant: "destructive",
        title: "Registration has failed!",
        description: "Something went wrong, please try again later",
      });
      return;
    }
    // else if (!response.ok) {
    //   toast({
    //     variant: "destructive",
    //     title: "Registration has failed!",
    //     description: "User with this email already exists",
    //   });
    // }

    const user = await getUser();
    dispatch(setUser(user));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-full min-w-[370px] h-full flex flex-col justify-center items-center bg-white p-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...field}
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
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full flex"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {form.formState.isSubmitting ? "Please wait" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
