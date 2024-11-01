'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IUser } from '@/types/entities';
import { CardContent, CardFooter } from "@/components/ui/card";
import { Pencil, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from 'zod';
import { profileSchema } from '../forms/auth/form-validation';
import { toast } from '@/hooks/use-toast';
import { ErrorMessage } from '@/types';


type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Component({ user }: { user: IUser; }) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      age: user.age,
      gender: user.gender,
      bio: user.bio
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, _id: user._id })
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }

      toast({
        title: "Profile Information Updated",
        variant:"success"
      });

      setIsEditing(false)

      //eslint-disable-next-line
    } catch (error: any) {      
      toast({
        title: "Error while updating",
        description: error.message || ErrorMessage.ERROR_DEFAULT,
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-0 md:space-y-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
            <Avatar className="w-24 h-24 border-2 border-border">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="text-lg">{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <FormLabel className="text-sm font-medium text-muted-foreground">Username</FormLabel>
                <Input value={user.username} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <FormLabel className="text-sm font-medium text-muted-foreground">Email</FormLabel>
                <Input value={user.email} disabled className="bg-muted" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className={isEditing ? "border-primary transition-colors" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className={isEditing ? "border-primary transition-colors" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  disabled={!isEditing}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={isEditing ? "border-primary transition-colors" : ""}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
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
                    {...field}
                    disabled={!isEditing}
                    className={`min-h-[120px] resize-none ${isEditing ? "border-primary transition-colors" : ""}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>

        <CardFooter className="flex justify-end space-x-2 pt-6">
          {isEditing ? (
            <>
              <Button
                type="submit"
                variant="default"
                className="bg-primary hover:bg-primary/90"
              >
                <Check className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(false);
                  form.reset();
                }}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/90 hover:text-destructive-foreground"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
              type="button"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </form>
    </Form>
  );
}