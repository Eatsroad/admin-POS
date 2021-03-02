import Resizer from 'react-image-file-resizer';
const maxWidth = 375;
const maxHeight = 375;
const compressFormat = 'JPEG';
const quality = 100;
const rotation = 0;

export const resizeFile = (file:any) => new Promise ( resolve => {

    Resizer.imageFileResizer(file,maxWidth, maxHeight, compressFormat, quality, rotation,
        uri => {
            resolve(uri);
        },
        'base64'
    );
});