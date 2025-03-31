import UseCaseMediaGrid from '@/components/common/use-media-grid';

const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?q=80&w=4480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Everyone having fun on the dance floor! 🎉',
    hashtags: ['#MagicMoments', '#PartyTime', '#CatchFire'],
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1615828959248-55e459f74401?q=80&w=5187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'The DJ was on fire! 🔥',
    hashtags: ['#WeddingDay', '#PartyTime'],
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1636664601730-bc6bde08c0c7?q=80&w=5041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Suit and tie!',
    hashtags: ['#WeddingDay', '#MagicMoments'],
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1606490194864-f380e19e55cd?q=80&w=4016&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Epic moment captured! 💫',
    hashtags: ['#Love', '#MagicMoments'],
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1621510007869-775c2657e580?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Definitely the highlight of the evening! 🌟',
    hashtags: ['#Squad', '#PartyTime'],
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1636664619894-64ec30b6af08?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption:
      "Such a perfect day! It's a pleasure to see so much love and laughter 💕",
    hashtags: ['#Sunset', '#Love'],
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1519654793190-2e8a4806f1f2?q=80&w=3369&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Feeling very full after this delicious cake! 🍰',
    hashtags: ['#WeddingCake', '#Love'],
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1582470584920-7946b028fdea?q=80&w=5143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Getting ready for the big moment ✨',
    hashtags: ['#GettingReady', '#WeddingDay'],
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1660243353143-f77ba06d4913?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'First dance as newlyweds 💃🕺',
    hashtags: ['#FirstDance', '#MagicMoments', '#Love'],
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1606490208247-b65be3d94cd1?q=80&w=4016&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'First dance as newlyweds 💃🕺',
    hashtags: ['#FirstDance', '#MagicMoments', '#Love'],
  },
];

export default function WeddingGallery() {
  return (
    <UseCaseMediaGrid
      photos={photos}
      title="Greg & Sasha"
      description="A journey of love captured in moments."
    />
  );
}
