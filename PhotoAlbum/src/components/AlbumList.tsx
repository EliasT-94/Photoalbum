import React from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text } from "react-native";
import { Album } from "../types";
import { List } from "react-native-paper";
import { setListBackground } from "./functions";
import { openAlbum } from "../reducers/actions";
import { Dispatch } from "redux";

interface AlbumProps {
  albums: Album[];
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
    return (
      <List.Item
        onPress={this.goToAlbum(info.item)}
        left={props => (
          <List.Icon
            {...props}
            icon="collections"
            style={{ marginLeft: -8, marginRight: -8 }}
          />
        )}
        title={<Text style={styles.listItemText}>{info.item.title}</Text>}
        style={[styles.listItem, setListBackground(info.item.id)]}
      />
    );
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
  listItem: {
    width: "45%",
    borderWidth: 1,
    borderColor: "#a6a9ad",
    margin: 8
  },
  listItemText: {
    fontFamily: "BebasNeue-Book"
  },
  albumList: {
    margin: 20
  }
});
