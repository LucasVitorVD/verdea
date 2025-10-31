"use client";

import ActivityCard from "@/components/cards/ActivityCard";
import PrivacyCard from "@/components/cards/PrivacyCard";
import ProfileCard from "@/components/cards/ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { userQuery } = useAuth()
  const user = userQuery.data;

  return (
    <section className="flex flex-col flex-1 py-4 px-4 gap-10 md:p-6">
      <div>
        <h1 className="text-3xl font-semibold">Meu perfil</h1>
        <p className="text-muted-foreground">
          Gerencie sua conta e configurações de privacidade.
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          {user && user.role !== "ADMIN" && (
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          )}
          <TabsTrigger value="privacy">Privacidade</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileCard />
        </TabsContent>
        <TabsContent value="activity">
          <ActivityCard />
        </TabsContent>
        <TabsContent value="privacy">
          <PrivacyCard />
        </TabsContent>
      </Tabs>
    </section>
  );
}
