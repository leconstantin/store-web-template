import {
  Body,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type EmailTemplateProps = {
  companyEmail: string;
  content: string;
  service?: string;
};

export const EmailTemplate = ({
  companyEmail,
  content,
  service,
}: EmailTemplateProps) => {
  const name = companyEmail.split("@")[0];

  return (
    <Html>
      <Preview>Message from {name}</Preview>
      <Tailwind>
        <Body className="max-w-[600px] font-sans text-black/80">
          {/* Main Content */}
          <Section>
            {service && <Text>{service}</Text>}
            <Text>{content}</Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};
