"use server";
/**
 * Server actions for AdvocateProfile (/admin/we).
 */
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/auth";

export type AdvocateInput = {
  id?: string;
  name: string;
  designation: string;
  credentials: string;
  bio: string;
  imageUrl: string;
  barCouncilId: string;
  email: string;
  phone: string;
  order: number;
};

export async function upsertAdvocateAction(input: AdvocateInput) {
  await assertAdminSession();

  const name = input.name.trim();
  const designation = input.designation.trim();
  const bio = input.bio.trim();

  if (!name || !designation || !bio) {
    return { ok: false, error: "Name, designation, and legal bio are required." };
  }

  const data = {
    name,
    designation,
    credentials: input.credentials.trim() || "LL.B. (Hons.), LL.M.",
    bio,
    imageUrl: input.imageUrl.trim() || null,
    barCouncilId: input.barCouncilId.trim() || null,
    email: input.email.trim() || null,
    phone: input.phone.trim() || null,
    order: Number(input.order) || 0,
  };

  try {
    if (input.id) {
      await prisma.advocateProfile.update({ where: { id: input.id }, data });
    } else {
      await prisma.advocateProfile.create({ data });
    }
    revalidatePath("/admin/we");
    revalidatePath("/admin");
    revalidatePath("/we");
    revalidatePath("/team");
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to save advocate profile." };
  }
}

export async function deleteAdvocateAction(id: string) {
  await assertAdminSession();

  try {
    await prisma.advocateProfile.delete({ where: { id } });
    revalidatePath("/admin/we");
    revalidatePath("/admin");
    revalidatePath("/we");
    revalidatePath("/team");
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to delete advocate profile." };
  }
}
