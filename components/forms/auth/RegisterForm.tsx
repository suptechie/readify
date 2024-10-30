'use client';

import { memo, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { AVATARIMAGES, GENDER, GENRES } from '@/constants';
import { registerFormSchema } from "@/lib/utils/form-validation";
import type { z } from "zod";
import { createUser } from "@/actions/user.auth";
import { Genres } from "@/types/entities";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { StatusCode } from "@/types";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      age: '',
      preference: [],
      gender: "male",
      bio: "",
      password: "",
      confirmPassword: "",
      name: "",
      image: AVATARIMAGES[0]
    },
  });

  async function onSubmit({ preference, age, confirmPassword, password, ...values }: z.infer<typeof registerFormSchema>) {
    try {
      setIsLoading(true);
      if (confirmPassword !== password) {
        form.setError('confirmPassword', { message: 'Passwords do not match' });
        return;
      }
      const response = await createUser({
        age: age,
        preferences: preference as Genres[],
        password,
        ...values
      });

      if (response) {
        if (response.code === StatusCode.Conflict) {
          form.setError("email", { message: response.message });
        } else {
          form.setError("root", { message: response.message });
        }
      } else {
        toast({
          title: "Registration Successful 🚀. Please Login to continue",
          variant: "success"
        });
        form.reset();
        router.push('/login');
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full mt-6">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your details and preferences to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username *</FormLabel>
                  <FormControl>
                    <Input placeholder="mr_anonimous" {...field} />
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
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Your Age" min={1}  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="preference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-4">Preferred Genres *</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={GENRES.map(genre => ({ label: genre.label, value: genre.id }))}
                      onValueChange={field.onChange}
                      placeholder="Select your favorite genres"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Avatar *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-4 gap-4"
                    >
                      {AVATARIMAGES.map((src, index) => (
                        <FormItem key={index} className="space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value={src}
                              id={`avatar-${index}`}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={`avatar-${index}`}
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={src} alt={`Avatar ${index + 1}`} />
                              <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      {GENDER.map(({ id, label }) => (
                        <FormItem key={id} className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I Write About Aliens"
                      className="resize-none"
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
                <FormItem>
                  <FormLabel>Password *</FormLabel>
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
                <FormItem>
                  <FormLabel>Confirm Password *</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormMessage />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default memo(RegisterForm);