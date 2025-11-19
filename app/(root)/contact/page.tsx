import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react";
import { Suspense } from "react";
import ContactForm from "@/features/contact/contact-form";

export default function ContactPage() {
  return (
    <section className="container w-full py-6">
      <div className="relative flex w-full flex-col justify-between border-x md:flex-row">
        <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />
        <div className="border-b p-4 md:border-b-0">
          <ContactInfo />
        </div>
        <div className="flex w-full flex-1 p-4 md:border-l">
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
        <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
      </div>
    </section>
  );
}

function ContactInfo() {
  return (
    <div className="flex max-w-108 flex-col gap-5 p-2 md:p-5">
      <h3 className="mb-2 font-bold text-4xl text-foreground leading-[1.2] tracking-tighter">
        Talk to our Sales team.
      </h3>
      <div className="flex flex-col gap-5">
        <p className="text-muted-foreground tracking-tight">
          <span className="font-bold text-primary">
            <PhoneIcon className="mr-2 inline-block size-4" />
            Get a custom demo.
          </span>
          Discover the value of Rathon for your enterprise and explore our
          custom plans and pricing.
        </p>
        <p className="text-muted-foreground tracking-tight">
          <span className="font-bold text-primary">
            <ClockIcon className="mr-2 inline-block size-4" />
            Set up your Enterprise trial :{" "}
          </span>
          We&apos;re available anytime, reach out whenever you&apos;re ready to
          see how Rathon can elevate your web presence.
        </p>
        <p className="text-muted-foreground tracking-tight">
          <span className="font-bold text-primary">
            <MailIcon className="mr-2 inline-block size-4" />
            Email us:
          </span>{" "}
          <a className="ml-1 hover:underline" href="mailto:rathonrw@gmail.com">
            rathonrw@gmail.com
          </a>
        </p>
        <p className="text-muted-foreground tracking-tight">
          <span className="font-bold text-primary">
            <MapPinIcon className="mr-2 inline-block size-4" />
            Our Location:
          </span>{" "}
          Kigali, Rwanda
        </p>
        <p className="text-muted-foreground tracking-tight">
          <span className="font-bold text-primary">
            <MessageCircleIcon className="mr-2 inline-block size-4" />
            Whatsapp:
          </span>{" "}
          <a
            className="hover:underline"
            href="https://wa.me/250792636403"
            rel="noopener noreferrer"
            target="_blank"
          >
            +250 792 636 403
          </a>
        </p>
      </div>
    </div>
  );
}
