import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

const QuestionItem = ({
  title,
  content,
}: {
  title: string;
  content: string | React.ReactNode;
}) => (
  <AccordionItem value={title} className="rounded-lg mb-4 bg-white">
    <AccordionTrigger className="px-6 py-4 hover:no-underline">
      {title}
    </AccordionTrigger>
    <AccordionContent className="px-6 pb-4 text-gray-600">
      {content}
    </AccordionContent>
  </AccordionItem>
);

interface Question {
  title: string;
  content: string | React.ReactNode;
}

export function Questions({ questions }: { questions: Question[] }) {


  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-gray-600">
              Can&apos;t find what you&apos;re looking for?
              <br />
              Feel free to{' '}
              <Link href="/contact" className="text-gray-900 underline">
                contact us.
              </Link>
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:col-span-8">
            <Accordion type="single" collapsible className="space-y-4">
              {questions.map((question) => (
                <QuestionItem
                  key={question.title}
                  title={question.title}
                  content={question.content}
                />
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

