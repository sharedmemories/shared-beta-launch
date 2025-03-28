import MediaGrid from '@/components/common/media-grid';
const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Everyone having fun on the dance floor! 🎉',
    hashtags: ['#MagicMoments', '#PartyTime', '#DJ'],
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1520242739010-44e95bde329e?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'The DJ was on fire! 🔥',
    hashtags: ['#MainStage', '#PartyTime'],
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1651439330208-fab5f16b0084?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Feeling very full after this delicious cake! 🍰',
    hashtags: ['#RedLightsEverywhere', '#MagicMoments'],
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1546006508-5bd647796a4c?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Epic moment captured! 💫',
    hashtags: ['#Love', '#MagicMoments'],
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1633358050629-bb6a292616ff?q=80&w=2250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Definitely the highlight of the evening! 🌟',
    hashtags: ['#Squad', '#PartyTime'],
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1596131397999-bb01560efcae?q=80&w=4608&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption:
      "Such a perfect day! It's a pleasure to see so much love and laughter 💕",
    hashtags: ['#Sunset', '#Love'],
  },
  {
    id: 7,
    src: 'https://images.pexels.com/photos/2240771/pexels-photo-2240771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Beautiful ceremony moments 💕',
    hashtags: ['#Lasers', '#Love'],
  },
  {
    id: 8,
    src: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Getting ready for the big moment ✨',
    hashtags: ['#MainStage', '#MusicFestival'],
  },
  {
    id: 9,
    src: 'https://images.pexels.com/photos/51330/girl-colorful-happy-cool-51330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'First dance as newlyweds 💃🕺',
    hashtags: ['#Selfie', '#MagicMoments', '#Color'],
  },
];

export default function CelebrationsGallery() {
  return (
    <MediaGrid
      photos={photos}
      title="Music Festival"
      description="A celebration of love and music."
    />
  );
}
