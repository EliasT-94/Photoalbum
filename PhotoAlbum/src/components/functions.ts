import { Photo } from '../types';
/**
 * Make every second album have sligtly different color
 * Set borderRadius to center side of the element
 * @param {number} item
 */
export const setListBackground = (item: number) => {
  const rightStyle = {
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: "#e6E6E6"
  }
  const leftStyle = {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor:"#D8D8D8"
  }
  return item % 2 === 1 ? rightStyle : leftStyle;
};
  /**
   * Get all photos from a single album
   * @param {number} albumId
   */
  export const getPhotosFromAlbum = (albumId: number, photos: Photo[]) => {
    return photos.filter(photo => photo.albumId === albumId);
  };

