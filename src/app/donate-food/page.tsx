
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";

const formSchema = z.object({
  ngo: z.string().min(2, {
    message: "NGO must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  pickupTime: z.string().min(1, {
    message: "PickUp must be at least 5 characters.",
  }),
  ampm: z.string().min(1),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Contact must be 10 characters.",
    })
    .max(10, {
      message: "Contact must be 10 characters.",
    }),
  foodItems: z.string().min(4, {
    message: "Food Items must be at least 4 characters.",
  }),
});
export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ngo: "",
      address: "",
      pickupTime: "",
      phoneNumber: "",
      foodItems: "",
      ampm: "AM",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    toast.success("Successfull submitted Values");
    form.reset()
  }

  return (
    <div className="flex flex-col justify-center items-center pt-40 mb-40">
      Donate Food
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col justify-center items-center gap-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ngo"
              render={({ field }) => (
                <FormItem className="w-[19rem]">
                  <FormLabel>Ngo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select NGO" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">NGO 1</SelectItem>
                      <SelectItem value="m@google.com">NGO 2</SelectItem>
                      <SelectItem value="m@support.com">NGO 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foodItems"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Items</FormLabel>
                  <FormControl>
                    <Input placeholder="food " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="pickupTime"
                render={({ field }) => (
                  <FormItem className="w-32">
                    <FormLabel>Pick Up Time</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ampm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AM/PM</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="bg-[#65d453]" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
