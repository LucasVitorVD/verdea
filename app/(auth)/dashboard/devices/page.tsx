import DevicesTable from "@/components/devices-table/DevicesTable";
import AddDeviceDialog from "@/components/dialogs/AddDeviceDialog";

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

      <DevicesTable />
    </section>
  );
}
