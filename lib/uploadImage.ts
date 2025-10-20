import { toast } from "sonner";

export async function handleUploadImage(imageFile: File) {
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