import { supabase } from "./supabase";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createProject(name: string, userId: string) {
  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        name,
        user_id: userId,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw error;
}
