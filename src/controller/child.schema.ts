import { z } from "zod";

const childFields = {
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format"),
    guardianName: z.string().trim().min(1).max(120),
    guardianPhone: z.string().trim().min(5).max(30),
    emergencyContact: z.string().trim().max(160).optional(),
    allergies: z.string().trim().max(1000).optional(),
    room: z.string().trim().max(80).optional(),
    enrollmentStatus: z.enum(["enrolled", "waitlisted", "withdrawn"]).optional(),
};

export const createChildSchema = z.object({
    body: z.object(childFields),
});

export const params = z.object({ childId: z.string().uuid() });

export const updateChildSchema = z.object({
    params,
    body: z.object(childFields).partial().refine((body) => Object.keys(body).length > 0, {
        message: "Provide at least one field to update",
    }),
});

export type ParamsInput = z.infer<typeof params>;
export type CreateChildInput = z.infer<typeof createChildSchema>["body"];
export type UpdateChildInput = z.infer<typeof updateChildSchema>;
