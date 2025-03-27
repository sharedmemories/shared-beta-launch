import { cn } from '@/lib/utils';
import Marquee from '@/components/ui/marquee';

const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: 'Using Shared Memories at our family reunion was fantastic. Everyone could upload and enjoy the photos instantly!',
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'Zanele',
    username: '@zanele_sa',
    body: 'Shared Memories was a game-changer for our wedding. Our guests loved how easy it was to upload their photos!',
    img: 'https://avatar.vercel.sh/zanele',
  },
  {
    name: 'Wang Wei',
    username: '@wangwei',
    body: 'This Shared Memories service is truly a magical tool for collecting event photos! My work efficiency has improved a lot.',
    img: 'https://avatar.vercel.sh/wangwei',
  },
  {
    name: 'Kim Min-su',
    username: '@minsu_k',
    body: 'I am very satisfied using Shared Memories. Photo sharing has become really convenient.',
    img: 'https://avatar.vercel.sh/minsu',
  },
  {
    name: 'Priya',
    username: '@priya_89',
    body: 'We used Shared Memories for our son’s birthday party. Everyone loved how smooth and fun it was to share photos!',
    img: 'https://avatar.vercel.sh/priya',
  },
  {
    name: 'Sam',
    username: '@sam_global',
    body: 'Thanks to Shared Memories, sharing event photos has become so easy. I’m really grateful.',
    img: 'https://avatar.vercel.sh/sam',
  },
  {
    name: 'Shamoki',
    username: '@shamoki',
    body: 'I’m amazed by Shared Memories. It made photo sharing at our gala dinner seamless. I love it!',
    img: 'https://avatar.vercel.sh/shamoki',
  },
  {
    name: 'Ayanda',
    username: '@ayanda_sa',
    body: 'Shared Memories brought so much joy to our family festival. It’s brilliant for large gatherings!',
    img: 'https://avatar.vercel.sh/ayanda',
  },
  {
    name: 'Carlos',
    username: '@carlos_m',
    body: 'We used Shared Memories at our awards ceremony. The ability to share and collect photos in real time was phenomenal!',
    img: 'https://avatar.vercel.sh/carlos',
  },
  {
    name: 'Anika',
    username: '@anika_n',
    body: 'Shared Memories turned our corporate event into a lively, interactive experience. A fantastic tool for any occasion!',
    img: 'https://avatar.vercel.sh/anika',
  },
  {
    name: 'Lungile',
    username: '@lungile_eventpro',
    body: 'As an event planner, Shared Memories has been a lifesaver for managing and collecting media from gala dinners.',
    img: 'https://avatar.vercel.sh/lungile',
  },
  {
    name: 'Mikhail',
    username: '@mikhail_rus',
    body: 'Our festival felt even more connected thanks to Shared Memories. Everyone could relive the best moments immediately.',
    img: 'https://avatar.vercel.sh/mikhail',
  },
  {
    name: 'Leila',
    username: '@leila_dxb',
    body: 'Shared Memories made my friend’s bridal shower unforgettable. Everyone shared photos so effortlessly!',
    img: 'https://avatar.vercel.sh/leila',
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-600 dark:text-white/40">
            {username}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        {body}
      </blockquote>
    </figure>
  );
};

const Comments = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full py-4 overflow-hidden rounded-lg  sm:py-20 md:py-20 xl:py-20">
      <Marquee pauseOnHover className="[--duration:60s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:60s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none bg-gradient-to-r from-white dark:from-gray-900"></div>
      <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none bg-gradient-to-l from-white dark:from-gray-900"></div>
    </div>
  );
};

export { Comments };
