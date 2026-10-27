import { contactEmail } from "@/lib/email-templates";
import { handleFormSubmission } from "@/lib/form-endpoint";
import { sendMail } from "@/lib/mail";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    name: "contact",
    schema: contactSchema,
    onSubmit: (data) => sendMail(contactEmail(data)),
  });
}
