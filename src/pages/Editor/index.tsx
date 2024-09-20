import Editor from '@/components/Editor';
import { getImages, PhotoAlbum } from '@/tree';
import { useLoaderData } from 'react-router-dom';
import PhotoAlbumCreator from './PagesEditor';

export default function EditorPage() {
  const data = useLoaderData() as PhotoAlbum;
  console.log({ data });
  const images = getImages(data);
  return <PhotoAlbumCreator />;
}
