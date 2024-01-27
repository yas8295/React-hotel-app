import supabase, { supabaseUrl } from "../Supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("cannot loading cabins data try again");

  return cabins;
}

export async function addCabin(cabin) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

  const imagePath = `${supabaseUrl}/storage/v1/object/public/images/${cabin.image.name}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: hasImagePath ? cabin.image : imagePath }]);

  if (error) throw new Error("cabin could not be created");

  const { error: imageError } = await supabase.storage
    .from("images")
    .upload(cabin.image.name, cabin.image);

  if (imageError) throw new Error("something wrong with upload image");

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("cabin could not be deleted");
  return data;
}

export async function updateCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

  const imagePath = `${supabaseUrl}/storage/v1/object/public/images/${cabin.image[0].name}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: hasImagePath ? cabin.image : imagePath })
    .eq("id", id)
    .select();

  const { data: images } = await supabase.storage.from("images").list();

  const uploadImage = images
    .slice()
    .filter((image) => image.name === cabin.image[0].name);

  if (!uploadImage) {
    const { error: imageError } = await supabase.storage
      .from("images")
      .upload(cabin.image[0].name, cabin.image[0]);

    if (imageError) throw new Error("something wrong with upload image");
  }

  if (error) throw new Error("Could not update cabin try again");

  return data;
}

export async function duplicateCabin(cabin) {
  const { data, error } = await supabase.from("cabins").insert([{ ...cabin }]);

  if (error) throw new Error("cabin could not be dublicated");

  return data;
}
