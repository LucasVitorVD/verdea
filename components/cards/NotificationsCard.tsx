"use client"

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label"

export default function NotificationsCard() {
  const [notifications, setNotifications] = useState({
    irrigation: false,
    lowMoisture: false,
    maintenance: false,
    weeklyTips: false,
    email: false,
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Preferências de Notificação</CardTitle>
          <CardDescription>
            Configure como e quando deseja receber notificações.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Alertas de Irrigação</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações quando suas plantas forem irrigadas.
                </p>
              </div>
              <Switch
                checked={notifications.irrigation}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, irrigation: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Alertas de Umidade Baixa</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações quando a umidade estiver abaixo do nível
                  recomendado.
                </p>
              </div>
              <Switch
                checked={notifications.lowMoisture}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, lowMoisture: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Lembretes de Manutenção</Label>
                <p className="text-sm text-muted-foreground">
                  Receba lembretes para verificar o nível de água e fazer
                  manutenção.
                </p>
              </div>
              <Switch
                checked={notifications.maintenance}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, maintenance: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Dicas Semanais</Label>
                <p className="text-sm text-muted-foreground">
                  Receba dicas semanais sobre como cuidar melhor das suas
                  plantas.
                </p>
              </div>
              <Switch
                checked={notifications.weeklyTips}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, weeklyTips: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Receba todas as notificações também por email.
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
