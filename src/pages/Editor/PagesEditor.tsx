import { PropsWithChildren, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
  AlbumPage,
  AlbumImage,
  AlbumPageProps,
  StyledImage,
} from './AlbumPage';

import ActionsPanel from './ActionsPanel';
import { initialPages } from './initialPages';

export default function PhotoAlbumCreator() {
  const [pages, setPages] = useState<AlbumPageProps[]>(initialPages);
  const [activePhoto, setActivePhoto] = useState<AlbumImage>();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!activePhoto || !over?.data.current) return;
    let updatedPages: AlbumPageProps[] = [];
    if (activePhoto.layoutId === 'external') {
      updatedPages = handleAddExternalImage({
        pages,
        draggedImage: activePhoto,
        droppableContainer: over.data.current as AlbumImage,
      });
    } else {
      updatedPages = getUpdatedPagesAfterImageSwap({
        pages,
        draggedImage: activePhoto,
        droppableContainer: over.data.current as AlbumImage,
      });
    }

    setPages(updatedPages);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const activeId = active.id as string;
    setActivePhoto({ ...active.data.current, id: activeId } as AlbumImage);
  };

  return (
    <div className='p-4 w-screen'>
      <h1 className='text-2xl font-bold mb-4'>Photo Album Creator</h1>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
      >
        <EditorLayout>
          <SortableContext
            items={pages.map((page) => page.id)}
            strategy={rectSortingStrategy}
          >
            {pages.map((page) => (
              <AlbumPage
                id={page.id}
                key={page.id}
                title={page.title}
                images={page.images}
              />
            ))}
          </SortableContext>
          <DragOverlay>
            {activePhoto && <StyledImage {...activePhoto} />}
          </DragOverlay>
        </EditorLayout>
      </DndContext>
    </div>
  );
}

const EditorLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex gap-4'>
      <div className='min-w-[90%] flex flex-wrap gap-4'>{children}</div>
      <ActionsPanel />
    </div>
  );
};

const handleAddExternalImage = ({
  pages,
  droppableContainer,
  draggedImage,
}: {
  draggedImage: AlbumImage;
  droppableContainer: AlbumImage;
  pages: AlbumPageProps[];
}) => {
  const updatedPages = pages.map((page) => {
    if (page.id === droppableContainer.layoutId) {
      draggedImage.layoutId = droppableContainer.layoutId;
      draggedImage.index = page.images.length;
      page.images.push(draggedImage);
      return page;
    }

    return page;
  });

  return updatedPages;
};
const getUpdatedPagesAfterImageSwap = ({
  pages,
  droppableContainer,
  draggedImage,
}: {
  draggedImage: AlbumImage;
  droppableContainer: AlbumImage;
  pages: AlbumPageProps[];
}) => {
  const handleMultiPageImageSwap = () => {
    return pages.map((page) => {
      if (page.id === draggedImage.layoutId) {
        page.images[draggedImage.index].src = droppableContainer.src;
        return page;
      }

      if (page.id === droppableContainer.layoutId) {
        page.images[droppableContainer.index].src = draggedImage.src;
        return page;
      }
      return page;
    });
  };

  const handleInPageImageSwap = () => {
    return pages.map((page) => {
      if (page.id === draggedImage.layoutId) {
        const [removed] = page.images.splice(draggedImage.index, 1);
        page.images.splice(droppableContainer?.index, 0, removed);
        return page;
      }
      return page;
    });
  };

  if (draggedImage.layoutId !== droppableContainer.layoutId) {
    return handleMultiPageImageSwap();
  }

  return handleInPageImageSwap();
};
