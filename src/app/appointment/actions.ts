"use server";
/**
 * Public Server Action for persisting appointment submissions into PostgreSQL.
 */
import { prisma } from "@/lib/prisma";

export type AppointmentSubmitInput = {
  name: string;
  contactNo: string;
  email: string;
  appointmentTime: string;
};

export type AppointmentSubmitResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

/** Validate and save a new appointment request to the database. */
export async function submitAppointmentAction(
  input: AppointmentSubmitInput,
): Promise<AppointmentSubmitResult> {
  const name = input.name.trim();
  const contactNumber = input.contactNo.trim();
  const email = input.email.trim();
  const preferredTime = input.appointmentTime.trim();

  if (name.length < 3 || contactNumber.length < 3 || preferredTime.length < 3) {
    return { ok: false, error: "Please fill in all required fields." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }

  try {
    const created = await prisma.appointment.create({
      data: {
        name,
        contactNumber,
        email,
        preferredTime,
        status: "PENDING",
      },
    });
    return { ok: true, id: created.id };
  } catch {
    return {
      ok: false,
      error: "Unable to save your appointment right now. Please try again shortly.",
    };
  }
}
