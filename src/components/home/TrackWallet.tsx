"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Spinner from "../ui/Spinner";
import { createAlertDestination, createNotification } from "@/hooks/useTrackWallet";

const formSchema = z.object({
  alertDestination: z.string().min(1, "destination name must be at least 3 characters"),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
    message: "Invalid Ethereum wallet address",
  }),
});

export default function TrackWallet() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const destination = await createAlertDestination(values.alertDestination);
      await createNotification(destination, values.walletAddress);

      setIsSubmitting(false);
      toast.success("Successfully Tracking wallet!");

      form.reset();
    } catch (error) {
      toast.error("Failed to track", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Track Wallet</CardTitle>
        <CardDescription>Enter an Ethereum wallet address to start tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="alertDestination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alert destination name</FormLabel>
                  <FormControl>
                    <Input placeholder="my destination" {...field} />
                  </FormControl>
                  <FormDescription>Enter a Destination name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormDescription>Enter a valid Ethereum wallet address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner />
                  Tracking...
                </>
              ) : (
                "Track Wallet"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
