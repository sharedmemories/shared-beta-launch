import TextReveal from '@/components/ui/text-reveal';

export function WordReveal({ text }: { text: string }) {
  return (
    <div className="z-10 flex min-h-[16rem] items-center justify-center rounded-lg dark:bg-black text-gradient-to-r from-purple-600 to-pink-600">
      <TextReveal text={text} />
    </div>
  );
}
