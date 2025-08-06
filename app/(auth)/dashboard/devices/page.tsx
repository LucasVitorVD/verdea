import DevicesTable from "@/components/devices-table/DevicesTable";
import AddDeviceDialog from "@/components/dialogs/AddDeviceDialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function DevicesPage() {
  return (
    <section className="flex flex-col flex-1 py-4 px-4 gap-12 md:p-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Seus Dispositivos</h1>
          <p className="text-muted-foreground">
            Gerencie os dispositivos conectados à sua conta.
          </p>
        </div>

        <AddDeviceDialog />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Número total de dispositivos</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              2
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Dispositivos online</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Dispositivos offline</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <DevicesTable />
    </section>
  );
}
