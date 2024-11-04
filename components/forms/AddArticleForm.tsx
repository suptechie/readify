'use client';

import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GENRES } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { toast } from "@/hooks/use-toast";
import { NEXT_PUBLIC_API_URL } from "@/config";
import { ImageUpload } from "@/components/common/ImageUpload";
import { useRouter } from "next/navigation";
import { addArticleFormSchema } from "./auth/form-validation";
import Loader from "../skeleton/Loader";

const AddArticleForm = () => {
  const router = useRouter();
  const [isSubmitting,setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof addArticleFormSchema>>({
    resolver: zodResolver(addArticleFormSchema),
    defaultValues: {
      title: "",
      content: "",
      genre: '',
      tags: "",
      image: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof addArticleFormSchema>) => {
    setSubmitting(true)
    try {
      if (values.image.trim() === '') {
        form.setError("image", { message: "Image is required" });
        return;
      }
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/article`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error("Failed to create article");
      }
      form.reset();
      router.refresh()
      toast({
        title: "Article Created Successfully",
        description: "You can edit and manage the articles from the articles tab",
        variant: "success"
      });
      //eslint-disable-next-line
    } catch (error: any) {
      toast({
        title: "Article creation failed",
        description: error.message || "Unknown error occurred",
        variant: "destructive"
      });
    }finally{
      setSubmitting(false);
    }
  };

  return (
    <ScrollArea className="max-h-[500px] remove-scrollbar">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h-52">
                    {GENRES.map(({ label, id }) => (
                      <SelectItem key={id} value={id}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mr-4">Tags</FormLabel>
                <FormControl>
                  <Input placeholder="#Mern #Javascript" {...field} />
                </FormControl>
                <FormDescription>Add tags for your article separated by # and space.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={field.onChange}
                    value={field.value!}
                    folder="/articles"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting?(
              <Loader /> 
            ):(
              "Add Article"
            )}
            </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default memo(AddArticleForm);