import supabase from "../config/supabase";
import sharp from "sharp";

export const uploadImage = async (file: Buffer, fileName: string) => {
  const webpBuffer = await sharp(file).webp({ quality: 80 }).toBuffer();

  const { data, error } = await supabase.storage
    .from("imagens") // Nome do bucket no Supabase
    .upload(`produtos/${fileName}.webp`, webpBuffer, {
      contentType: "image/webp",
    });

  if (error || !data) {
    throw new Error(
      `Erro ao fazer upload da imagem: ${error?.message || "Erro desconhecido"}`
    );
  }

  return data?.path;
};
