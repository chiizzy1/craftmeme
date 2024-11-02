"use client";

import { FC } from "react";
import { useAccount } from "wagmi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Trash2, AlertCircle, Plus, Upload } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { useCreateToken } from "@/hooks/useCreateToken";
import Image from "next/image";
import uploadToIPFS from "@/hooks/useUploadToIpfs";
import { useRouter } from "next/navigation";

interface CreateCoinFormProps {}

export const tokenFormSchema = z
  .object({
    tokenName: z.string().min(3, "Token name must be at least 3 characters"),
    tokenSymbol: z
      .string()
      .min(1, "Token symbol must be at least 1 characters")
      .max(10, "Token symbol cannot exceed 10 characters")
      .transform((v) => v.toUpperCase()),
    totalSupply: z
      .string()
      .regex(/^\d+$/, "Must be a valid number")
      .transform(Number)
      .refine((n) => n > 0, "Total supply must be greater than 0"),
    maxSupply: z
      .string()
      .regex(/^\d+$/, "Must be a valid number")
      .transform(Number)
      .refine((n) => n > 0, "Maximum supply must be greater than 0"),
    canMint: z.boolean().default(false),
    canBurn: z.boolean().default(false),
    supplyCapEnabled: z.boolean().default(false),
    signers: z.array(z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Must be a valid Ethereum address")),
    owner: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Must be a valid Ethereum address"),
    newSigner: z.string().optional(),
    tokenImage: z.instanceof(File, { message: "Token image is required" }),
  })
  .refine(
    (data) => {
      if (data.supplyCapEnabled && data.maxSupply < data.totalSupply) {
        return false;
      }
      return true;
    },
    {
      message: "Maximum supply must be greater than or equal to total supply",
      path: ["maxSupply"],
    }
  );

export type TokenFormValues = z.infer<typeof tokenFormSchema>;

const CreateCoinForm: FC<CreateCoinFormProps> = ({}) => {
  const { isConnected } = useAccount();
  const { createToken, isPending, isConfirming, isConfirmed } = useCreateToken();

  const router = useRouter();

  const [newSigner, setNewSigner] = useState("");
  const [signers, setSigners] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<TokenFormValues>({
    resolver: zodResolver(tokenFormSchema),
    defaultValues: {
      tokenName: "",
      tokenSymbol: "",
      totalSupply: 0,
      maxSupply: 0,
      canMint: false,
      canBurn: false,
      supplyCapEnabled: false,
      signers: [],
      owner: "",
    },
    mode: "onChange",
  });

  const watchSupplyCapEnabled = form.watch("supplyCapEnabled");

  const onSubmit = async (data: TokenFormValues) => {
    if (!isConnected) {
      toast.error("Wallet isn't connected, Please connect your wallet!");
      return;
    }

    const formData = { ...data, signers };

    try {
      // IPFS upload
      const imageData = await uploadToIPFS(formData.tokenImage);
      const ipfsHash: string = imageData.requestid;
      console.log("imagehash: ", ipfsHash);

      // deploy contract
      await createToken({
        signers: formData.signers,
        owner: formData.owner,
        name: formData.tokenName,
        symbol: formData.tokenSymbol,
        totalSupply: BigInt(formData.totalSupply),
        maxSupply: BigInt(formData.maxSupply || formData.totalSupply),
        canMint: formData.canMint,
        canBurn: formData.canBurn,
        supplyCapEnabled: formData.supplyCapEnabled,
        ipfsHash,
      });

      toast.success("Token configuration saved!", {
        description: `${formData.tokenName} (${formData.tokenSymbol}) will be created with a total supply of ${formData.totalSupply} tokens.`,
      });
    } catch (error) {
      toast.error("Failed to create token", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  if (isConfirmed) {
    router.push("/");
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("tokenImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSigner = () => {
    if (!newSigner) {
      toast.error("Please enter a signer address");
      return;
    }

    if (signers.includes(newSigner)) {
      toast.error("This address is already added!");
      return;
    }

    const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethereumAddressRegex.test(newSigner)) {
      toast.error("Please enter a valid Ethereum address");
      return;
    }

    setSigners([...signers, newSigner]);
    setNewSigner("");
  };

  const handleRemoveSigner = (addressToRemove: string) => {
    setSigners(signers.filter((address) => address !== addressToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSigner();
    }
  };

  return (
    <div className="py-[200px]">
      <div className="container max-w-5xl mx-auto w-full relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="tokenName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Awesome Token" {...field} />
                      </FormControl>
                      <FormDescription>The full name of your token</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tokenSymbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Symbol</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., MAT"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                          maxLength={10}
                        />
                      </FormControl>
                      <FormDescription>A short symbol for your token (max 10 characters)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="totalSupply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Supply</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1000000" {...field} />
                      </FormControl>
                      <FormDescription>Initial token supply</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxSupply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Supply</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 2000000" {...field} disabled={!watchSupplyCapEnabled} />
                      </FormControl>
                      <FormDescription>Maximum possible token supply</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="canMint"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Mintable</FormLabel>
                        <FormDescription>Allow minting new tokens</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="canBurn"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Burnable</FormLabel>
                        <FormDescription>Allow burning tokens</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supplyCapEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Supply Cap</FormLabel>
                        <FormDescription>Enable max supply</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="owner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Address</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                    <FormDescription>The address that will own and control the token contract</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter signer address (0x...)"
                      value={newSigner}
                      onChange={(e) => setNewSigner(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddSigner} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Signer
                  </Button>

                  {/* <Button type="button" variant="secondary" onClick={handleAddSigner} className="w-full sm:w-auto">
                    <PlusCircle className="h-4 w-4 mr-2" />  Add Signer
                  </Button> */}
                </div>

                {signers.length > 0 ? (
                  <ScrollArea className="h-[120px] rounded-md border">
                    <div className="p-4 space-y-2">
                      {signers.map((address, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-2 p-2 rounded-lg bg-secondary/50 group hover:bg-secondary/70 transition-colors"
                        >
                          <span className="text-sm font-mono truncate">{address}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSigner(address)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex items-center gap-4">
                    <AlertCircle className="h-4 w-4" />
                    <div>Add signer addresses to enable multi-signature functionality</div>
                  </div>
                )}
              </div>

              <FormItem className="space-y-4">
                <FormLabel>Token Image</FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center justify-center w-full">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <Image src={imagePreview} alt="Preview" fill className="object-contain p-2 rounded-lg" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        </div>
                      )}
                      <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>

            {/* <Button type="submit" className="w-full" >
            "Create Token"
            </Button> */}
            <Button type="submit" className="w-full" disabled={!isConnected || isPending || isConfirming}>
              {!isConnected
                ? "Connect your wallet!"
                : isPending
                ? "Confirm in Wallet..."
                : isConfirming
                ? "Creating Token..."
                : "Create Token"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCoinForm;
