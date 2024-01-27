import supabase, { supabaseUrl } from "../Supabase";

export async function signUp(newUser) {
  const { fullName, email, password } = newUser;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Provided email or password are incorrect");

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.nessage);
  return user;
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateUserData({ fullName, avatar, accountAvatar }) {
  let imagePath = false;

  if (avatar.length >= 1) {
    imagePath = `${supabaseUrl}/storage/v1/object/public/avatar/${avatar[0]?.name}`;
  }

  const { data: userData, error: dataError } = await supabase.auth.updateUser({
    data: { fullName, avatar: imagePath || accountAvatar },
  });

  if (dataError) throw new Error(dataError.message);

  let query = supabase.storage.from("avatar");

  if (avatar.length >= 1 && imagePath !== accountAvatar) {
    query = query.upload(avatar[0].name, avatar[0]);
  }

  const { data: userAvatar, avatarError } = await query;

  if (avatarError) throw new Error(avatarError.message);

  return { userData, userAvatar };
}

export async function updatePassword(newPassword) {
  const { data, error } = supabase.auth.updateUser({ password: newPassword });

  if (error) throw new Error(error.message);

  return data;
}
