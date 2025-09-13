import { z } from "zod";

export const loginSchema = z.object({
  memberId: z.string().min(1, "아이디를 입력해주세요."),
  memberPassword: z.string().min(1, "비밀번호를 입력해주세요.")
});

export type LoginFormData = z.infer<typeof loginSchema>;
