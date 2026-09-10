"use client";

import { useState } from "react";
import { FormField, fieldInputClasses } from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { SERVICE_TOPICS } from "@/lib/types";
import { api } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      topic: (form.elements.namedItem("topic") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      await api.post("/inquiries", data);
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-blush bg-white p-10 text-center">
        <p className="font-display text-xl text-ink">Thank you — your inquiry is on its way.</p>
        <p className="mt-2 text-sm text-ink/70">We&apos;ve emailed you a confirmation and will follow up shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-2xl border border-blush bg-white p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Name" htmlFor="name">
          <input id="name" name="name" required className={fieldInputClasses()} />
        </FormField>
        <FormField label="Phone" htmlFor="phone">
          <input id="phone" name="phone" type="tel" required className={fieldInputClasses()} />
        </FormField>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Email" htmlFor="email">
          <input id="email" name="email" type="email" required className={fieldInputClasses()} />
        </FormField>
        <FormField label="Topic" htmlFor="topic">
          <select id="topic" name="topic" required defaultValue="" className={fieldInputClasses()}>
            <option value="" disabled>
              Select a topic
            </option>
            {SERVICE_TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Tell us about your event" htmlFor="message">
        <textarea id="message" name="message" required rows={5} className={fieldInputClasses()} />
      </FormField>

      {status === "error" ? <p className="text-sm text-coral-deep">{errorMessage}</p> : null}

      <Button type="submit" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Sending..." : "Send inquiry"}
      </Button>
    </form>
  );
}
