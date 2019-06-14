import { Photo, Album } from '../types';

export interface NavActionState {
  readonly photo: Photo | undefined;
  readonly album: Album | undefined
  readonly albums: Album[] | undefined;
  readonly photos: Photo[] | undefined
}
export enum NavActionType {
  NAVIGATE_TO_PHOTO = "NAVIGATE_TO_PHOTO",
  OPEN_ALBUM = 'OPEN_ALBUM'
}
export type NavAction = {
  type: "NAVIGATE_TO_PHOTO";
  payload: Photo;
} | {
  type: "OPEN_ALBUM";
  payload: Album;
};

export const navigateToPhoto = (photo: Photo) => {
  return {
    type: "NAVIGATE_TO_PHOTO",
    payload: photo
  };
};
export const openAlbum = (album: Album) => {
  console.log(album)
  return {
    type: "OPEN_ALBUM",
    payload: album
  };
};
