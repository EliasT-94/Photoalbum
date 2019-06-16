import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { Album, Photo } from "../types";
import { setListBackground, getPhotosFromAlbum } from "./functions";
import { openAlbum } from "../reducers/actions";
import { Dispatch } from "redux";
import Image from "react-native-scalable-image";
import { ActivityIndicator } from "react-native";

interface AlbumProps {
  albums: Album[];
  photos: Photo[];
  dispatch: Dispatch;
}
export default class AlbumList extends React.Component<AlbumProps> {
  constructor(props: AlbumProps) {
    super(props);
  }
  public render() {
    return (
      <FlatList
        key="albums"
        numColumns={2}
        style={styles.albumList}
        renderItem={this.renderAlbumItem}
        data={this.props.albums}
        keyExtractor={item => {
          return item.id.toString();
        }}
      />
    );
  }

  /**
   * Render single item in album list
   * @param {ListRenderItemInfo} info A single item to be rendered with index and separator (unused)
   */
  private renderAlbumItem = (info: ListRenderItemInfo<Album>) => {
    const photos = getPhotosFromAlbum(info.item.id, this.props.photos);
    if (photos && photos.length) {
      return (
        <View style={[styles.listItem, setListBackground(info.item.id)]}>
          <TouchableOpacity onPress={this.goToAlbum(info.item)}>
            <View style={styles.imageView}>
              <Image width={55} source={{ uri: photos[0].thumbnailUrl }} />
              <Image width={55} source={{ uri: photos[1].thumbnailUrl }} />
              <Image width={55} source={{ uri: photos[2].thumbnailUrl }} />
            </View>
            <Text style={styles.listItemText}>{info.item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <ActivityIndicator />;
    }
  };
  /**
   * Dispatch info about an album to redux so it'll be opened
   * @param {Album} album
   */
  private goToAlbum = (album: Album) => () => {
    this.props.dispatch(openAlbum(album));
  };
}
const styles = StyleSheet.create({
  imageView: {
    flexDirection: "row"
  },
  listItem: {
    borderWidth: 1,
    borderColor: "#a6a9ad",
    margin: 6
  },
  listItemText: {
    fontSize: 12,
    height:25,
    width: 150,
    textAlign: "center",
    color: "black",
    fontFamily: "BebasNeue-Book"
  },
  albumList: {
    margin: 20
  }
});
