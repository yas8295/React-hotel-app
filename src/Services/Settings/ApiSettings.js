import supabase from "../Supabase";

export async function getSettings() {
  let { data, error } = await supabase.from("settings").select("*");

  if (error) throw new Error("cannot loading settings data try again");

  return data;
}

export async function updateSettings(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1);

  if (error) throw new Error("cannot update settings try again");

  return data;
}
