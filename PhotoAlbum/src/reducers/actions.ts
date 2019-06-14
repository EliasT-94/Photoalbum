import { Photo, Album } from "./../types";

export interface ActionState {
  readonly photo: Photo | undefined;
  readonly album: Album | undefined;
  readonly photos: Photo[];
  readonly albums: Album[];
}
export enum ActionType {
  NAVIGATE_TO_PHOTO = "NAVIGATE_TO_PHOTO",
  OPEN_ALBUM = "OPEN_ALBUM",
  GET_PHOTOS = "GET_PHOTOS",
  GET_ALBUMS = "GET_ALBUMS"
}
export type Action =
  | {
      type: "NAVIGATE_TO_PHOTO";
      payload: Photo;
    }
  | {
      type: "OPEN_ALBUM";
      payload: Album | undefined;
    }
  | {
      type: "GET_PHOTOS";
      payload: Photo[];
    }
  | {
      type: "GET_ALBUMS";
      payload: Album[];
    };

export const navigateToPhoto = (photo: Photo): Action => {
  return {
    type: "NAVIGATE_TO_PHOTO",
    payload: photo
  };
};

export const openAlbum = (album: Album | undefined): Action => {
  return {
    type: "OPEN_ALBUM",
    payload: album
  };
};

export const getPhotos = (photos: Photo[]): Action => {
  return {
    type: "GET_PHOTOS",
    payload: photos
  };
};
export const getAlbums = (album: Album[]): Action => {
  console.log(album);
  return {
    type: "GET_ALBUMS",
    payload: album
  };
};
