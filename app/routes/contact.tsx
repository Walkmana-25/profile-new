import type { Route } from "./+types/contact";
import { ContactPage } from "~/contact/ContactPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact | Y.Takahashi" },
  ];
}

export default function Contact() {
  return <ContactPage />;
}
