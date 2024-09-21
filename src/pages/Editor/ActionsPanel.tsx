import { Button } from '@/components/ui/button';
import { ImageIcon, TextIcon } from '@radix-ui/react-icons';
import { DragableImage } from './AlbumPage';
export default function ActionsPanel() {
  const actions = [
    {
      icon: <ImageIcon />,
      title: 'Add Image',
      id: 'add-image',
    },
    {
      icon: <TextIcon />,
      title: 'Add Text',
      id: 'add-text',
    },
  ];
  return (
    <div className='flex gap-1 border-l-2 h-screen p-2'>
      <ImagesStack />

      <div className='flex items-center flex-col gap-4'>
        {actions.map((action) => (
          <Button
            key={action.id}
            variant='outline'
            className=' flex items-center flex-col gap-2 p-2 bg-gray-100 rounded-md'
          >
            {action.icon}
            <span>{action.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

const ImagesStack = () => {
  return (
    <div
      style={{
        display: 'Flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: '10px',
        height: 'fit-content',
      }}
    >
      <ImgItem src='https://via.placeholder.com/150' />
      <ImgItem src='https://via.placeholder.com/150' />
      <ImgItem src='https://via.placeholder.com/150' />
    </div>
  );
};

const ImgItem = ({ src }: { src: string }) => {
  return (
    <DragableImage
      src={src}
      layoutId='external'
      index={0}
      id={'external' + Math.random()}
      style={{
        width: '50px',
        height: '50px',
      }}
    />
  );
};
