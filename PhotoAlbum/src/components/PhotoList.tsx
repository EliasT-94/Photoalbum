import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated
} from "react-native";
import { Album, Photo } from "../types";
import { List } from "react-native-paper";
import { setListBackground } from "./functions";
import { openAlbum, openPhoto } from "../reducers/actions";
import { Dispatch } from "redux";
import Image from "react-native-scalable-image";

interface PhotoProps {
  photos: Photo[];
  album: Album;
  dispatch: Dispatch;
}
interface PhotoState {
  anim: Animated.Value;
}
export default class PhotoList extends React.Component<PhotoProps, PhotoState> {
  constructor(props: PhotoProps) {
    super(props);
    this.state = {
      anim: new Animated.Value(800)
    };
  }
  public componentDidMount() {
    Animated.timing(this.state.anim, {
      toValue: 0,
      duration: 700
    }).start();
  }
  public render() {
    const { anim } = this.state;
    return (
      <Animated.View style={{ marginTop: anim }}>
        <FlatList
          key="photos"
          numColumns={2}
          style={styles.photoList}
          renderItem={this.renderPhotoItem}
          data={this.getPhotosFromAlbum(this.props.album.id)}
          keyExtractor={item => {
            return item.id.toString();
          }}
        />
      </Animated.View>
    );
  }
  /**
   * Get all photos from a single album
   * @param {number} albumId
   */
  private getPhotosFromAlbum = (albumId: number) => {
    return this.props.photos.filter(photo => photo.albumId === albumId);
  };

  /**
   * Dispatch a single photo to redux so it'll be opened
   * @param {Photo} photo
   */
  private goToPhoto = (photo: Photo) => () => {
    this.props.dispatch(openPhoto(photo));
  };

  /**
   * Render a single photo thumbnail
   * @param {ListRenderItemInfo} info A single item to be rendered with index and separator (unused)
   */
  private renderPhotoItem = (info: ListRenderItemInfo<Photo>) => {
    return (
      <TouchableOpacity
        style={styles.photoItem}
        onPress={this.goToPhoto(info.item)}
      >
        <Image
          style={[styles.imageThumbnail, setListBackground(info.item.id)]}
          source={{ uri: info.item.thumbnailUrl }}
        />
        <Text style={styles.descText}>{info.item.title}</Text>
      </TouchableOpacity>
    );
  };
}
const styles = StyleSheet.create({
  photoList: {
    margin: 20
  },
  photoItem: {
    flex: 1,
    flexDirection: "column",
    margin: 8
  },
  descText: {
    fontFamily: "BebasNeue-Book",
    color: "white",
    textAlign: "center",
    padding: 4
  },
  imageThumbnail: {
    borderWidth: 3,
    borderColor: "#a6a9ad",
    alignSelf: "center",
    width: 175,
    height: 175
  }
});
