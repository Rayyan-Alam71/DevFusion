"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateRoomAction } from "./actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(1).max(240),
  language : z.string().min(1).max(50),
  GithubRepo : z.string().optional()
})


export function CreateRoomForm(){
  const router = useRouter();
  const [loading, setLoading] = useState(false); 
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name :  "",
      description : "",
      language :"",
      GithubRepo : "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Create Room in the db using server actions
    setLoading(true);
    // @ts-ignore
    await CreateRoomAction(values)
    router.push("/")
    setLoading(false);
  }

  return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is your public room name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input{...field} />
              </FormControl>
              <FormDescription>
                Describe in brief about what you are working on.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Langauge</FormLabel>
              <FormControl>
                <Input{...field} />
              </FormControl>
              <FormDescription>
                What will be your primary language.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="GithubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Repo</FormLabel>
              <FormControl>
                <Input{...field} />
              </FormControl>
              <FormDescription>
                Provide the Github repo url (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          !loading ?  
          <Button type="submit">Submit</Button>
          :
          <Button>...</Button>
        }
      </form>
    </Form>
  )
}