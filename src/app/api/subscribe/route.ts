import { subscribeEmail } from "@/lib/email-templates";
import { handleFormSubmission } from "@/lib/form-endpoint";
import { sendMail } from "@/lib/mail";
import { subscribeSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    name: "subscribe",
    schema: subscribeSchema,
    onSubmit: (data) => sendMail(subscribeEmail(data)),
  });
}
