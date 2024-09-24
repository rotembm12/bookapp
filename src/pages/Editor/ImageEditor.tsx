import { createDefaultImageWriter, getEditorDefaults } from '@pqina/pintura';
import img1 from './images/img1.jpg';
import { PinturaEditor } from '@pqina/react-pintura';
import '@pqina/pintura/pintura.css';
import { useRef } from 'react';
export default function ImageEditor() {
  let options = {
    imageWriter: createDefaultImageWriter({
      canvasMemoryLimit: 4096 * 4096,
      orientImage: true,
      copyImageHead: false,
      mimeType: 'image/jpg',
      quality: 0.5,
      targetSize: {
        width: 1200,
        height: 1200,
        upscale: false,
      },
      outputProps: [],
    }),
  };
  const ref = useRef();
  const editorConfig = getEditorDefaults(options);
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PinturaEditor
        {...editorConfig}
        ref={ref}
        frameStyles={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        src={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Dw7-4lVfRq74_YEiPEt4e-bQ0_6UA2y73Q&s'
        }
        onLoad={(res) => console.log(res)}
        cropEnableButtonFlipHorizontal={true}
        cropEnableButtonFlipVertical={true}
        imageCropLimitToImage={true}
        cropEnableButtonRotateRight={true}
        cropEnableRotationInput={true}
        cropEnableZoomAutoHide={true}
        cropActiveTransformTool='zoom'
      />
    </div>
  );
}
