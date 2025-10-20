"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Clock, ImagePlus, Zap } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { plantFormSchema, PlantFormSchema } from "@/zod-schemas/form/plant";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Slider } from "../ui/slider";
import EmptyState from "../empty-state";
import EmptyStateIllustration from "@/public/images/illustrations/undraw_gardening.svg";
import { Plant } from "@/interfaces/plant";
import TimePicker from "./TimePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { usePlants } from "@/hooks/usePlants";
import { useDevices } from "@/hooks/useDevice";
import { handleUploadImage } from "@/lib/uploadImage";

interface PlantFormProps {
  data?: Plant;
  onSuccess?: () => void;
  isAdmin?: boolean;
}

export default function PlantForm({
  data,
  onSuccess,
  isAdmin,
}: PlantFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    data?.imageUrl ?? null
  );
  const { createPlant, updatePlant } = usePlants(!!isAdmin);
  const { devicesQuery } = useDevices(!!isAdmin);

  const form = useForm<PlantFormSchema>({
    resolver: zodResolver(plantFormSchema),
    defaultValues: data
      ? {
          ...data,
          image: null,
          device: data.deviceSummary?.macAddress ?? "",
          mode: data.mode ?? "AUTO",
          wateringTimes: data.wateringTimes ?? [],
        }
      : {
          name: "",
          species: "",
          location: "",
          notes: "",
          wateringFrequency: "once_a_day",
          wateringTimes: ["10:30", "18:30"],
          idealSoilMoisture: 0,
          device: "",
          image: null,
          mode: "AUTO",
        },
  });

  const mode = form.watch("mode");
  const frequency = form.watch("wateringFrequency");

  const onSubmit = async (formData: PlantFormSchema) => {
    const image = formData.image
      ? await handleUploadImage(formData.image)
      : imagePreview;

    if (formData.wateringFrequency === "once_a_day") {
      formData.wateringTimes = [formData.wateringTimes![0]];
    } else if (formData.wateringFrequency !== "twice_a_day") {
      formData.wateringTimes = [];
    }

    const mode = formData.mode;

    if (mode === "AUTO") {
      formData.wateringFrequency = undefined;
      formData.wateringTimes = [];
      formData.idealSoilMoisture = undefined;
    }

    const payload = {
      imageUrl: image,
      name: formData.name,
      species: formData.species,
      location: formData.location,
      notes: formData.notes ?? "",
      mode: formData.mode,
      wateringTimes: formData.wateringTimes ?? [],
      wateringFrequency: formData.wateringFrequency ?? null,
      idealSoilMoisture: formData.idealSoilMoisture ?? 30,
      deviceMacAddress: formData.device,
    } as Omit<Plant, "device"> & {
      deviceMacAddress: string;
    };

    if (!data) {
      createPlant.mutate(payload);
    } else {
      updatePlant.mutate({ ...payload, id: data.id });
    }

    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form
        id="add-plant-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* IMAGEM */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem da Planta</FormLabel>
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden relative flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <ImagePlus className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Clique para adicionar uma imagem
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setImagePreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                          field.onChange(file);
                        }
                      }}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:w-2/3 space-y-4">
            {/* NOME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Planta</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Minha Samambaia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ESPÉCIE */}
            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Espécie</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a espécie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nephrolepis">Samambaia</SelectItem>
                      <SelectItem value="echeveria">Suculenta</SelectItem>
                      <SelectItem value="phalaenopsis">Orquídea</SelectItem>
                      <SelectItem value="ficus">Ficus</SelectItem>
                      <SelectItem value="monstera">Costela de Adão</SelectItem>
                      <SelectItem value="sansevieria">
                        Espada de São Jorge
                      </SelectItem>
                      <SelectItem value="other">Outra</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LOCALIZAÇÃO */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Sala de estar, Varanda"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NOTAS */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Adicione notas sobre sua planta"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* IRRIGAÇÃO */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">
            Configurações de Irrigação
          </h3>
          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Irrigação</FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col lg:flex-row items-center w-full mb-4"
                >
                  <div
                    className={`flex items-center space-x-4 border p-4 rounded-lg w-full cursor-pointer transition-all ${
                      field.value === "AUTO" ? "border-primary" : "border-muted"
                    }`}
                  >
                    <RadioGroupItem value="AUTO" id="AUTO" />
                    <Zap className="h-4 w-4 text-green-600" />
                    <div>
                      <Label htmlFor="AUTO">Automático</Label>
                      <p className="text-muted-foreground text-sm">
                        Irriga quando o solo estiver seco
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center space-x-4 border p-4 rounded-lg w-full cursor-pointer transition-all ${
                      field.value === "SCHEDULED"
                        ? "border-primary"
                        : "border-muted"
                    }`}
                  >
                    <RadioGroupItem value="SCHEDULED" id="SCHEDULED" />
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div>
                      <Label htmlFor="SCHEDULED">Programado</Label>
                      <p className="text-muted-foreground text-sm">
                        Define horários específicos
                      </p>
                    </div>
                  </div>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          {mode === "SCHEDULED" && (
            <div className="flex flex-col gap-4">
              {/* Frequência */}
              <FormField
                control={form.control}
                name="wateringFrequency"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Frequência de Irrigação</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="once_a_day">1x ao dia</SelectItem>
                        <SelectItem value="twice_a_day">2x ao dia</SelectItem>
                        <SelectItem value="every_2_days">
                          A cada 2 dias
                        </SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {frequency !== "twice_a_day" && (
                <FormField
                  control={form.control}
                  name="wateringTimes.0"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário de Irrigação</FormLabel>
                      <FormControl>
                        <TimePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {frequency === "twice_a_day" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-4">
                    <FormField
                      control={form.control}
                      name="wateringTimes.0"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primeiro Horário</FormLabel>
                          <FormControl>
                            <TimePicker
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="wateringTimes.1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Segundo Horário</FormLabel>
                          <FormControl>
                            <TimePicker
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {form.formState.errors.wateringTimes?.root?.message && (
                    <p className="text-red-500 text-sm mt-1 block">
                      {form.formState.errors.wateringTimes.root.message}
                    </p>
                  )}
                </div>
              )}

              {/* Umidade */}
              <FormField
                control={form.control}
                name="idealSoilMoisture"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Nível Mínimo de Umidade</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[field.value ?? 0]}
                          onValueChange={(val) => field.onChange(val[0])}
                          max={100}
                          step={1}
                        />
                        <span className="w-12 text-center font-medium">
                          {field.value}%
                        </span>
                      </div>
                    </FormControl>
                    <FormDescription>
                      A irrigação automática será acionada quando a umidade
                      estiver abaixo deste valor.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* DISPOSITIVO */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Dispositivo</h3>
          <FormField
            control={form.control}
            name="device"
            render={({ field }) => (
              <FormItem>
                {devicesQuery.data?.length === 0 ? (
                  <div className="flex flex-col items-center gap-4">
                    <EmptyState
                      title="Nenhum dispositivo encontrado"
                      description="Você ainda não possui dispositivos conectados. Adicione um dispositivo ESP32 para monitorar suas plantas."
                      imgSrc={EmptyStateIllustration}
                      imgAlt="Sem dispositivos"
                    />
                    <Link
                      href="/dashboard/devices"
                      className="text-blue-500 text-center"
                    >
                      Adicionar dispositivo
                    </Link>
                  </div>
                ) : (
                  <>
                    <FormLabel>Selecione o Dispositivo ESP32</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o dispositivo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {devicesQuery.isLoading && (
                          <SelectItem value="loading" disabled>
                            Carregando dispositivos...
                          </SelectItem>
                        )}

                        {!devicesQuery.isLoading &&
                          devicesQuery.data?.map((device) => (
                            <SelectItem
                              key={device.id}
                              value={device.macAddress}
                            >
                              {device.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
                {devicesQuery.data?.length! > 0 && <FormMessage />}
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
