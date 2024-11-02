"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { userId } = useParams();

  return (
    <section className="py-[200px]">
      <div className="container mx-auto w-full relative">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-6">
            <div className="flex gap-6">
              <Image src={"https://picsum.photos/71"} alt="user profile image" width={60} height={60} className="rounded-full" />

              <div className="flex flex-col">
                <span>{userId}</span>
                <span>Edit profile</span>
              </div>
            </div>

            <div className="">en9PWnAKVQmeReEesyWSyC5RWGuAUW7bW8UEQTrsGxR</div>
          </div>

          <Tabs defaultValue="account" className="bg-slate-600">
            <TabsList>
              <TabsTrigger value="held">Coins held</TabsTrigger>
              <TabsTrigger value="created">coin created</TabsTrigger>
              <TabsTrigger value="notifications">notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="held">20</TabsContent>
            <TabsContent value="created">12</TabsContent>
            <TabsContent value="notifications">2</TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
