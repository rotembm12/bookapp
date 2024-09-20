import { act, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { AlbumPage, Image, AlbumPageProps } from './AlbumPage';
import img1 from './images/img1.jpg';
import img2 from './images/img2.jpg';
import img3 from './images/img3.jpg';
const initialLayouts: AlbumPageProps[] = [
  { id: 'layout1', images: [{ id: 'img1', src: img1 }], title: 'Page 1' },
  {
    id: 'layout2',
    title: 'Page2',
    images: [
      { id: 'img21234124', src: img2 },
      { id: 'img366767gfvb', src: img3 },
    ],
  },
  {
    id: 'layout3',
    title: 'Page2',
    images: [
      { id: 'img2szdvszaasaa', src: img1 },
      { id: 'img3zsdvzsd', src: img3 },
    ],
  },
  {
    id: 'layout4',
    title: 'Page2',
    images: [
      { id: 'img212fdd', src: img2 },
      { id: 'img3erg bd', src: img1 },
    ],
  },
  {
    id: 'layout5',
    title: 'Page2',
    images: [
      { id: 'img2waef', src: img2 },
      { id: 'img3hjkkklk', src: img3 },
    ],
  },
];

export default function PhotoAlbumCreator() {
  const [pages, setPages] = useState<AlbumPageProps[]>(initialLayouts);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [activePhoto, setActivePhoto] = useState<Image>();

  const getPageIndex = (id: string) => {
    return pages.findIndex((page) => page.id === id);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    console.log({ activePhoto, over });
    if (activePhoto.layoutId !== over?.data.current.layoutId) {
      const updatedPages = pages.map((page) => {
        if (page.id === activePhoto.layoutId) {
          page.images[activePhoto.index].src = over?.data.current.src;
          return page;
        }

        if (page.id === over?.data.current.layoutId) {
          page.images[over?.data.current.index].src = activePhoto.src;
          return page;
        }
        return page;
      });
      setPages(updatedPages);
    }
  };
  const handleDragStart = ({ active }: DragStartEvent) => {
    console.log({ active });
    setActivePhoto({ ...active.data.current, id: active.id });
  };
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Photo Album Creator</h1>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
      >
        <SortableContext
          items={pages.map((page) => page.id)}
          strategy={rectSortingStrategy}
        >
          <div className='grid grid-cols-3 gap-4'>
            {pages.map((page) => (
              <AlbumPage
                id={page.id}
                key={page.id}
                title={page.title}
                images={page.images}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
