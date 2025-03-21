
import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Link } from "@react-email/components"

interface OtpEmailProps {
  email: string
  otp: string
}

export const OtpEmail = ({ email, otp }: OtpEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your verification code for secure access</Preview>
      <Body className="bg-gray-100 font-sans">
        <Container className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto my-8">
          <Heading className="text-2xl font-bold text-center text-primary mb-4">Verification Code</Heading>

          <Text className="text-gray-600 mb-4">Hello,</Text>

          <Text className="text-gray-600 mb-4">
            We received a request to verify your account. Please use the verification code below to complete the
            process:
          </Text>

          <Section className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center my-6">
            <Text className="font-mono text-2xl tracking-wide font-bold text-primary">{otp}</Text>
          </Section>

          <Text className="text-gray-600 mb-4">
            This code will expire in 10 minutes. If you didn&apos;t request this code, you can safely ignore this email.
          </Text>

          <Text className="text-gray-600 mb-4">For security reasons, this code was sent to: {email}</Text>

          <Hr className="border-gray-200 my-6" />

          <Text className="text-sm text-gray-500 text-center">© 2025 Your Company. All rights reserved.</Text>

          <Text className="text-xs text-gray-400 text-center mt-2">
            If you have any questions, please contact our support team at{" "}
            <Link href="mailto:support@yourcompany.com" className="text-primary underline">
              support@yourcompany.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default OtpEmail

