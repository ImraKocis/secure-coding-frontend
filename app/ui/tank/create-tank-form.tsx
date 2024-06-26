"use client";

import { ReactElement } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";

import { createTakFormSchema, TankTypes } from "@/lib/tank/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/lib/redux/hooks";
import { useAlertDialogContext } from "@/app/ui/navigation/alert-dialog-context";
import { addTank } from "@/app/actions/tank/actions";

export function CreateTankForm(): ReactElement {
  const { toast } = useToast();
  const user = useUser();
  const { setIsDialogOpen } = useAlertDialogContext();

  const form = useForm<z.infer<typeof createTakFormSchema>>({
    resolver: zodResolver(createTakFormSchema),
    defaultValues: {
      name: "",
      nation: "",
      type: "HEAVY_TANK",
      hitpoints: "0",
      numofcrew: "1",
    },
  });

  async function onSubmit(data: z.infer<typeof createTakFormSchema>) {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Your session has expired",
        description: "Please login again",
      });
      return;
    }

    const tank = await addTank(data);

    if (!tank) {
      toast({
        variant: "destructive",
        title: "We could not create your tank",
        description: "Please try again later",
      });
    } else {
      toast({
        variant: "default",
        title: "Tank created",
        description: "If will be visible to others shortly",
      });
    }

    setIsDialogOpen(false);
  }

  return (
    <div className="w-full min-w-[350px]">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Create a new tank</h2>
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tank name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="TIGER II" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="nation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tank nation</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Germany" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tank type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tank type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TankTypes.map((tankType, index) => (
                        <SelectItem key={index} value={tankType}>
                          {tankType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="hitpoints"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tank hit points</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="numofcrew"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Number of crew members</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full gap-12">
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Publish
            </Button>
            <AlertDialogCancel
              className="w-full"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
          </div>
        </form>
      </Form>
    </div>
  );
}
