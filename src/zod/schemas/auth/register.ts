import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, {
      message: "nama minimal 3 karakter",
    }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "password minimal 8 karakter",
    }),
    passwordConfirmation: z.string(),
  })
  .superRefine(({ password, passwordConfirmation }, checkPassMatch) => {
    if (password !== passwordConfirmation) {
      checkPassMatch.addIssue({
        code: "custom",
        path: ["passwordConfirmation"],
        message: "password tidak sama",
      });
    }
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;

    let message = "";

    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }

    if (countOfLowerCase < 1) {
      message += "tambahkan huruf kecil, ";
    }
    if (countOfUpperCase < 1) {
      message += "tambahkan huruf besar, ";
    }
    if (countOfSpecialChar < 1) {
      message += "tambahkan karakter spesial, ";
    }
    if (countOfNumbers < 1) {
      message += "tambahkan angka, ";
    }

    if (message.length > 0) {
      console.log("password tidak memenuhi persyaratan kompleksitas");
      checkPassComplexity.addIssue({
        code: "custom",
        path: ["password"],
        message: message.replace(/,\s*$/, ""),
      });
    }
  });

export type Register = z.infer<typeof registerSchema>;
