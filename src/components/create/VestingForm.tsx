"use client";

import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Coins, Timer, User, Wallet } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface VestingFormProps {}

const formSchema = z.object({
  beneficiaryAddress: z
    .string()
    .min(42, "Invalid Ethereum address")
    .max(42, "Invalid Ethereum address")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format"),
  tokenAddress: z
    .string()
    .min(42, "Invalid token address")
    .max(42, "Invalid token address")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid token address format"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  duration: z
    .string()
    .min(1, "Duration is required")
    .transform((val) => parseInt(val))
    .refine((val) => val > 0, "Duration must be greater than 0"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, "Amount must be greater than 0"),
});

const VestingForm: FC<VestingFormProps> = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beneficiaryAddress: "",
      tokenAddress: "",
      duration: 0,
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Convert date to UNIX timestamp in seconds
      const startTime = Math.floor(values.startDate.getTime() / 1000);

      // Here you would typically call your contract interaction function
      console.log({
        ...values,
        startTime,
      });

      // Add your contract interaction logic here
    } catch (error) {
      console.error("Error submitting vesting schedule:", error);
    }
  }

  return (
    <section className="py-[200px]">
      <div className="container max-w-5xl mx-auto w-full relative">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Create Vesting Schedule</CardTitle>
            <CardDescription>Set up a new token vesting schedule with custom parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="beneficiaryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beneficiary Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="0x..." {...field} className="pl-10" />
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormDescription>The Ethereum address that will receive the vested tokens</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tokenAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="0x..." {...field} className="pl-10" />
                          <Coins className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormDescription>The ERC-20 token contract address to be vested</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn("pl-10 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground hidden" />
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date(Date.now() - 86400000)}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>When the vesting period will begin</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (seconds)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="number" placeholder="31536000" {...field} className="pl-10" />
                          <Timer className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormDescription>Total vesting period in seconds (e.g., 1 year = 31,536,000)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="number" placeholder="1000000" {...field} className="pl-10" />
                          <Wallet className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormDescription>Total number of tokens to be vested</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Create Vesting Schedule
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default VestingForm;
