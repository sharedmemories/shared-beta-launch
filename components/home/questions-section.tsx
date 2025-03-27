import React from 'react';
import { Questions } from './questions';
import { homeQuestionsList } from '../../lib/data/home-questions-list';

export default function QuestionsSection() {
  return (
    <>
      <section className="hidden h-[60vh] min-h-[100vh] w-full xl:block bg-gray-50">
        <div className="flex h-full w-full justify-between pl-[120px] pr-[20px]">
          <div className="flex w-[60%] flex-col pr-4 pt-40">
            <div className="">
              <Questions questions={homeQuestionsList} />
            </div>
          </div>
        </div>
      </section>
      {/* Mobile */}
      <section className="w-full xl:hidden">
        <Questions questions={homeQuestionsList} />
      </section>
    </>
  );
}
