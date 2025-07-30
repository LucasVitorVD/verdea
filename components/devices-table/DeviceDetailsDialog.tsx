import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Device } from "@/interfaces/device";
import { ReactNode } from "react";

interface Props {
  dialogTrigger: ReactNode
  device: Device
}

export default function DeviceDetailsDialog({ dialogTrigger, device }: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        {dialogTrigger}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
