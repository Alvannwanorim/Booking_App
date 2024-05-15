"use server";
export const bookAppointment = async (
  slot: string,
  doctor: string,
  user: any,
  note: string
) => {
  console.log("slot", slot);
  console.log("doctor", doctor);
  console.log("note", note);
  console.log("user", user);
};
