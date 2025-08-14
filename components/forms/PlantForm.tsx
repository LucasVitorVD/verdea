"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ImagePlus } from "lucide-react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Device } from "@/interfaces/device";
import Link from "next/link";
import { Slider } from "../ui/slider";
import EmptyState from "../empty-state";
import EmptyStateIllustration from "@/public/images/illustrations/undraw_gardening.svg";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Plant } from "@/interfaces/plant";
import TimePicker from "./TimePicker";

interface PlantFormProps {
  data?: Plant;
  onSuccess?: () => void;
}

export default function PlantForm({ data, onSuccess }: PlantFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    data?.imageUrl ?? null
  );
  const queryClient = useQueryClient();

  const form = useForm<PlantFormSchema>({
    resolver: zodResolver(plantFormSchema),
    defaultValues: data
      ? {
          ...data,
          image: null,
          device: data.device?.macAddress ?? "",
        }
      : {
          name: "",
          species: "",
          location: "",
          notes: "",
          wateringFrequency: "once_a_day",
          wateringTime: "10:30",
          idealSoilMoisture: 0,
          device: "",
          image: null,
        },
  });

  const devicesQuery = useQuery({
    queryKey: ["getUserDevices"],
    queryFn: async () => {
      try {
        const request = await axiosInstance.get(
          process.env.NEXT_PUBLIC_API_URL + "/device/my-devices"
        );

        return request.data as Device[];
      } catch (error) {
        toast.error("Erro ao carregar dispositivos.");
      }
    },
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: async (plantData: Omit<Plant, "device">) => {
      if (data) {
        return axiosInstance.patch(
          process.env.NEXT_PUBLIC_API_URL + `/plant/update/${data.id}`,
          plantData
        );
      } else {
        return axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/plant/add`,
          plantData
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserPlants"] });
      toast.success(`Planta ${data ? "editada" : "adicionada"} com sucesso!`);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Erro desconhecido. Por favor, tente novamente.";

      toast.error(`Erro ao ${data ? "editar" : "adicionar"} planta.`, {
        description: errorMessage,
        richColors: true,
        style: {
          background: "hsl(0 50% 45%)",
          color: "white",
          border: "1px solid hsl(0 50% 45%)",
        },
      });
    },
  });

  const onSubmit = async (data: PlantFormSchema) => {
    const image = data.image
  ? await handleUploadImage(data.image)
  : imagePreview;

    const newPlant = {
      name: data.name,
      species: data.species,
      location: data.location,
      notes: data.notes ?? "",
      wateringTime: data.wateringTime ?? "",
      wateringFrequency: data.wateringFrequency,
      idealSoilMoisture: data.idealSoilMoisture,
      imageUrl: image,
      deviceMacAddress: data.device,
    } as Omit<Plant, "id" | "device"> & {
      deviceMacAddress: string;
    };

    mutation.mutate(newPlant);

    console.log(newPlant);

    if (onSuccess) onSuccess();
  };

  async function handleUploadImage(imageFile: File) {
    try {
      const formData = new FormData();
      formData.append("imageFile", imageFile);

      const request = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      const signedUrl = await request.json();

      return signedUrl.url;
    } catch (error) {
      toast.error("Erro ao enviar imagem.");
      console.error("Error uploading image:", error);
    }
  }

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Frequência */}
            <FormField
              control={form.control}
              name="wateringFrequency"
              render={({ field }) => (
                <FormItem>
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

            {/* Horário */}
            <FormField
              control={form.control}
              name="wateringTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de Irrigação</FormLabel>
                  <FormControl>
                    <TimePicker
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
