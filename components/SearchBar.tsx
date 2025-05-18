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
import { useState } from "react"
import { useRouter } from "next/navigation"
import LoadingSpinner from "@/app/create-room/loading"
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

const formSchema = z.object({
  search: z.string().min(0).max(50),
})


export function SearchBar(){
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search :  ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // @ts-ignore
    // if(values.search="") 
    //   router.push("/")
    // // else 
    // if(values.search=undefined){
    //   router.push("/")
    // }
    // else{
    //   router.push(`/?search=${values.search}`)
    // }
    if(values.search != ''){
      router.push(`/browse-room/?search=${values.search}`)
      return
    }
    else{
      router.push('/browse-room');
      return
    }
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:flex-row flex flex-col gap-2 mt-2  ">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Search for tags like typescript, node etc..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}