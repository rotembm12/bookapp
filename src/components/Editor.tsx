import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Upload } from 'lucide-react';
import './Editor.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/tree';

const Label = ({
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className='block mb-2 font-bold' {...props}>
    {children}
  </label>
);

const useBookState = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const addImages = (newImages: Image[]) => {
    setImages([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    if (currentPage >= Math.ceil((images.length - 1) / 2)) {
      setCurrentPage(Math.max(0, currentPage - 1));
    }
  };

  const flipPage = (direction: 'next' | 'prev') => {
    if (
      direction === 'next' &&
      currentPage < Math.ceil(images.length / 2) - 1
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleBook = () => {
    setIsOpen(!isOpen);
  };

  return {
    images,
    currentPage,
    isOpen,
    addImages,
    removeImage,
    flipPage,
    toggleBook,
  };
};

const ImageUploader = ({
  onImageUpload,
}: {
  onImageUpload: (images: Image[]) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    const newImages = files.map((file) => ({
      src: URL.createObjectURL(file),
      alt: file.name,
    }));
    onImageUpload(newImages);
  };

  return (
    <div className='mb-4'>
      <Label htmlFor='image-upload'>Upload Images</Label>
      <div className='flex items-center'>
        <Input
          id='image-upload'
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          ref={fileInputRef}
          className='hidden'
          multiple
        />
        <Button onClick={() => fileInputRef.current?.click()}>
          <Upload className='w-4 h-4 mr-2' />
          Choose Images
        </Button>
        <span className='ml-4 text-sm text-gray-500'>
          {selectedFiles.length > 0
            ? `${selectedFiles.length} file(s) selected`
            : 'No files selected'}
        </span>
      </div>
    </div>
  );
};

const ImageList = ({
  images,
  onRemove,
}: {
  images: Image[];
  onRemove: (index: number) => void;
}) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8'>
      {images.map((image, index) => (
        <div key={index} className='relative'>
          <img
            src={image.m_image_name}
            alt={image.m_image_name}
            className='w-full h-48 object-cover rounded-lg'
          />
          <Button
            className='absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-1'
            onClick={() => onRemove(index)}
          >
            <X className='w-4 h-4' />
          </Button>
        </div>
      ))}
    </div>
  );
};

const BookPreview = ({
  images,
  currentPage,
  isOpen,
  onFlipPage,
  onToggleBook,
}: {
  images: Image[];
  currentPage: number;
  isOpen: boolean;
  onFlipPage: (direction: 'next' | 'prev') => void;
  onToggleBook: () => void;
}) => {
  const pageVariants = {
    initial: (direction: 'next' | 'prev') => ({
      rotateY: direction === 'next' ? 0 : -180,
      boxShadow: '0 0 0 rgba(0, 0, 0, 0.2)',
    }),
    animate: {
      rotateY: 0,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
      },
    },
    exit: (direction: 'next' | 'prev') => ({
      rotateY: direction === 'next' ? -180 : 0,
      boxShadow: '0 0 0 rgba(0, 0, 0, 0.2)',
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
      },
    }),
  };

  return (
    <div className='relative w-full h-[600px] bg-gray-100 rounded-lg shadow-lg overflow-hidden perspective'>
      <AnimatePresence initial={false} custom={currentPage}>
        {isOpen && (
          <motion.div
            key={currentPage}
            custom={currentPage}
            variants={pageVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='absolute inset-0 flex origin-left'
          >
            <div className='w-1/2 h-full bg-white border-r border-gray-300'>
              {images[currentPage * 2] && (
                <img
                  src={images[currentPage * 2].src}
                  alt={images[currentPage * 2].alt}
                  className='w-full h-full object-cover'
                />
              )}
            </div>
            <div className='w-1/2 h-full bg-white'>
              {images[currentPage * 2 + 1] && (
                <img
                  src={images[currentPage * 2 + 1].src}
                  alt={images[currentPage * 2 + 1].alt}
                  className='w-full h-full object-cover'
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <div className='absolute inset-0 bg-blue-500 flex items-center justify-center'>
          <h2 className='text-4xl font-bold text-white'>My Photo Album</h2>
        </div>
      )}
      <div className='absolute bottom-4 left-4 right-4 flex justify-between'>
        <Button
          onClick={() => onFlipPage('prev')}
          disabled={currentPage === 0 || !isOpen}
        >
          <ChevronLeft className='w-4 h-4 mr-2' />
          Previous
        </Button>
        <Button onClick={onToggleBook}>
          {isOpen ? 'Close Book' : 'Open Book'}
        </Button>
        <Button
          onClick={() => onFlipPage('next')}
          disabled={currentPage >= Math.ceil(images.length / 2) - 1 || !isOpen}
        >
          Next
          <ChevronRight className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </div>
  );
};

export default function Editor({ images }: { images: Image[] }) {
  const { currentPage, isOpen, addImages, removeImage, flipPage, toggleBook } =
    useBookState();

  return (
    <div className='container mx-auto p-4' data-test='editor'>
      <h1 className='text-3xl font-bold mb-6'>Photo Album Editor</h1>
      <div className='space-y-8'>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Edit Album</h2>
          <ImageUploader onImageUpload={addImages} />
          <ImageList images={images} onRemove={removeImage} />
        </div>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Preview</h2>
          <BookPreview
            images={images}
            currentPage={currentPage}
            isOpen={isOpen}
            onFlipPage={flipPage}
            onToggleBook={toggleBook}
          />
        </div>
      </div>
    </div>
  );
}
