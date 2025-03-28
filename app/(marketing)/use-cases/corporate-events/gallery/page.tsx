import MediaGrid from '@/components/common/media-grid';
const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Everyone listening attentively to the keynote speaker!',
    hashtags: ['#MagicMoments', '#DigitalMarketing'],
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1560439514-e960a3ef5019?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Some salient points from the keynote speaker!',
    hashtags: ['#KeyNote', '#PartyTime'],
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=3918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Imagine! Every! Thing!',
    hashtags: ['#Imagine', '#Quotes'],
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Class is in session! 💫',
    hashtags: ['#SuperSession', '#MagicMoments'],
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1565813086292-604790c8a97b?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Definitely the highlight of the evening! 🌟',
    hashtags: ['#Squad', '#DigitalMarketing'],
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1550177977-ad69e8f3cae0?q=80&w=3861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption:
      "Such a perfect day! It's a pleasure to see so much love and laughter 💕",
    hashtags: ['#Connect', '#DigitalMarketing'],
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1529362487499-b149087a4f62?q=80&w=4791&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Beautiful ceremony moments 💕',
    hashtags: ['#IsThisThingOn', '#DigitalMarketing'],
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Registration was a breeze! ✨',
    hashtags: ['#GettingReady', '#Networking'],
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1550305080-4e029753abcf?q=80&w=5071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Hands up if you want to be a part of this!',
    hashtags: ['#HandsUp', '#MagicMoments', '#DigitalMarketing'],
  },
];

export default function CorporateEventsGallery() {
  return (
    <MediaGrid
      photos={photos}
      title="Digital Marketing Conference"
      description="Europe's leading digital marketing conference"
    />
  );
}
