import { Card } from '@/components/ui/card';
import { CSS } from '@dnd-kit/utilities';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSSProperties } from 'react';
export type AlbumImage = {
  id: string;
  src: string;
  index: number;
  layoutId: string;
};
export type AlbumPageProps = {
  id: string;
  title: string;
  images: AlbumImage[];
};

export const AlbumPage = ({
  id,
  title,
  images,
}: {
  id: string;
  title: string;
  images: AlbumImage[];
}) => {
  useDraggable({
    id,
    data: {
      type: 'page',
    },
  });
  return (
    <Card className='p-4 w-[24%]'>
      {id} - {title}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
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

const Image = ({ id, src, layoutId, index }: AlbumImage) => {
  const { setNodeRef: setDroppableRef, over } = useDroppable({
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
    <Card ref={setDroppableRef} className='max-w-[45%]'>
      <DragableImage src={src} layoutId={layoutId} index={index} id={id} />
    </Card>
  );
};

export const DragableImage = ({
  src,
  layoutId,
  index,
  id,
  style = {},
}: AlbumImage & { style?: CSSProperties }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: {
        type: 'image',
        src,
        layoutId,
        id,
        index,
      },
    });

  return (
    <div
      style={{
        ...style,
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? '0.4' : '1',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <StyledImage src={src} />
    </div>
  );
};
export const StyledImage = ({ src }: { src: string }) => {
  return <img src={src} />;
};
