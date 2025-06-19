import { Droplet, Thermometer, Info, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";

interface Props {
  name: string
  species: string
  image: string
  moisture: number
  lastWatered: string
  status: string
  alert?: boolean
}

export default function PlantCard({ name, species, image, moisture, lastWatered, status, alert = false }: Props) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/plant/${name.toLowerCase()}/details`} className="block">
        <div className="aspect-square relative">
          <img src={image || "/placeholder.svg"} alt={name} className="object-cover w-full h-full" />
          {alert && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Atenção
            </div>
          )}
        </div>
        <CardHeader className="mb-4">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{species}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplet className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Umidade</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${moisture > 60 ? "bg-plant" : moisture > 30 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${moisture}%` }}
                  />
                </div>
                <span className="ml-2 text-sm font-medium">{moisture}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Última Irrigação</span>
              </div>
              <span className="text-sm">{lastWatered}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-plant" />
                <span className="text-sm">Status</span>
              </div>
              <span className={`text-sm font-medium ${status === "Saudável" ? "text-plant" : "text-amber-500"}`}>
                {status}
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/plant/${name.toLowerCase()}`}>
            <Settings className="mr-2 h-4 w-4" />
            Configurar
          </Link>
        </Button>
        <Button size="sm">
          <Droplet className="mr-2 h-4 w-4" />
          Irrigar Agora
        </Button>
      </CardFooter>
    </Card>
  )
}