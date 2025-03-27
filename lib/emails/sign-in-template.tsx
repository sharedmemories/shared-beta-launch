import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Link,
} from '@react-email/components';

interface OtpEmailProps {
  email: string;
  otp: string;
}

export const OtpEmail = ({ email, otp }: OtpEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your one time pin for secure access</Preview>
      <Body className="bg-gray-100 font-sans">
        <Container className="mx-auto my-8 max-w-md rounded-lg bg-white p-8 shadow-lg">
          <Heading className="text-primary mb-4 text-center text-2xl font-bold">
            OTP
          </Heading>

          <Text className="mb-4 text-gray-600">Hello,</Text>

          <Text className="mb-4 text-gray-600">
            Your email was used to request a one time pin to access your
            account. Please use the otp code below to complete the process:
          </Text>

          <Section className="my-6 rounded-md border border-gray-200 bg-gray-50 p-4 text-center">
            <Text className="text-primary font-mono text-2xl font-bold tracking-wide">
              {otp}
            </Text>
          </Section>

          <Text className="mb-4 text-gray-600">
            This code will expire in 10 minutes. If you didn&apos;t request this
            code, you can safely ignore this email.
          </Text>

          <Text className="mb-4 text-gray-600">
            For security reasons, this code was sent to: {email}
          </Text>

          <Hr className="my-6 border-gray-200" />

          <Text className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Shared Memories. All rights reserved.
          </Text>

          <Text className="mt-2 text-center text-xs text-gray-400">
            If you have any questions, please contact our support team at{' '}
            <Link
              href="mailto:support@sharedmemories.app"
              className="text-primary underline"
            >
              support@sharedmemories.app
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OtpEmail;
