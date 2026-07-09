import { z } from "zod";

export const communityRoles = ["builder", "backer", "investor"] as const;

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .or(z.literal("").transform(() => undefined));

export const communitySignupSchema = z.object({
  role: z.enum(communityRoles),
  name: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(320),
  organization: optionalText(200),
  country: optionalText(120),
  interestArea: optionalText(200),
  message: optionalText(2000),
  sourcePage: optionalText(200),
});

export type CommunitySignupInput = z.infer<typeof communitySignupSchema>;
