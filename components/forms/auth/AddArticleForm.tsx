'use client';

import { memo } from "react";
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
import { ImageUpload } from "./image-upload";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  genre: z.string().min(1, "Genre is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  image: z.string({ message: "Image is required" }),
});

const AddArticleForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      genre: '',
      tags: [],
      image: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
    } catch (error: any) {
      toast({
        title: "Article creation failed",
        description: error.message || "Unknown error occurred",
        variant: "destructive"
      });
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
                  <SelectContent>
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
                  <MultiSelect
                    options={GENRES.map(genre => ({ label: genre.label, value: genre.id }))}
                    onValueChange={field.onChange}
                    placeholder="Select your favorite genres"
                  />
                </FormControl>
                <FormDescription>Select one or more tags for your article</FormDescription>
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
          <Button type="submit">Add Article</Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default memo(AddArticleForm);