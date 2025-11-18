// src/app/api/destination-card/route.ts
import { supabase } from "@/lib/db";

export async function GET() {
  const { data, error } = await supabase
    .from("destination_card")
    .select("*");

  if (error) return new Response("Error fetching data", { status: 500 });
  console.log(error);
  return Response.json(data);
}
