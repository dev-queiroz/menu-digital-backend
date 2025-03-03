import { supabase } from "../config/database";

export interface Reservation {
  id: number;
  user_id: string;
  date: string;
  time: string;
  number_of_people: number;
  status: "pending" | "confirmed" | "canceled";
  created_at: string;
}

export const createReservation = async (
  userId: string,
  date: string,
  time: string,
  numberOfPeople: number
): Promise<Reservation> => {
  const { data, error } = await supabase
    .from("reservations")
    .insert([
      {
        user_id: userId,
        date,
        time,
        number_of_people: numberOfPeople,
        status: "pending",
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
};
