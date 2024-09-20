import { Card } from '@/components/ui/card';
import { CSS } from '@dnd-kit/utilities';

import { useDraggable, useDroppable } from '@dnd-kit/core';
export type Image = {
  id: string;
  src: string;
};
export type AlbumPageProps = {
  id: string;
  title: string;
  images: Image[];
};
export const AlbumPage = ({
  id,
  title,
  images,
}: {
  id: string;
  title: string;
  images: Image[];
}) => {
  return (
    <Card className='p-4'>
      {id} - {title}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '10px',
        }}
      >
        {images.map((image, index) => (
          <Image
            layoutId={id}
            key={image.id}
            id={image.id}
            index={index}
            src={image.src}
          />
        ))}
      </div>
    </Card>
  );
};

const Image = ({
  id,
  src,
  layoutId,
  index,
}: {
  id: string;
  src: string;
  index: number;
  layoutId: string;
}) => {
  const { setNodeRef: setDroppableRef } = useDroppable({
    id,
    data: {
      accepts: 'image',
      layoutId,
      src,
      index,
      id,
    },
  });
  return (
    <Card ref={setDroppableRef}>
      <DragableImage src={src} layoutId={layoutId} index={index} id={id} />
    </Card>
  );
};

const DragableImage = ({
  src,
  layoutId,
  index,
  id,
}: {
  src: string;
  layoutId: string;
  index: number;
  id: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      type: 'image',
      src,
      layoutId,
      index,
    },
  });
  return (
    <img
      style={{ transform: CSS.Transform.toString(transform) }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      src={src}
      alt='asdas'
    />
  );
};
