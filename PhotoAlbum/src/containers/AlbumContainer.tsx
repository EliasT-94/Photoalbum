import React, { Component, Dispatch } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View
} from "react-native";
import { List } from "react-native-paper";
import { Album, Photo } from "../types";
import { connect, DispatchProp } from "react-redux";
import {
  openAlbum,
  NavActionState
} from "../reducers/navActions";

interface AlbumProps extends DispatchProp<any> {
  albums: Album[];
  photos: Photo[];
  album: Album | undefined;
  photo: Photo | undefined;
}

class AlbumContainer extends React.Component<AlbumProps> {
  constructor(props: AlbumProps) {
    super(props);
  }
  public componentWillReceiveProps(props: AlbumProps) {
    console.log("props", props);
  }
  public render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Select Album</Text>
        {(!this.props.album && (
          <FlatList
            style={styles.list}
            renderItem={this.renderAlbumItem}
            data={this.props.albums}
            keyExtractor={item => {
              return item.id.toString();
            }}
          />
        )) ||
          (this.props.album && (
            <FlatList
              style={styles.list}
              renderItem={this.renderPhotoItem}
              data={this.getPhotosFromAlbum(this.props.album.id)}
              keyExtractor={item => {
                return item.id.toString();
              }}
            />
          )) || <Text>No albums, no photos, only bums </Text>}
      </View>
    );
  }
  private getPhotosFromAlbum = (albumId: number) => {
    console.log(albumId);
    const photos = this.props.photos.filter(photo => photo.albumId === albumId);
    return photos;
  };
  private goToAlbum = (album: Album) => () => {
    this.props.dispatch(openAlbum(album));
  };

  private renderAlbumItem = (info: ListRenderItemInfo<Album>) => {
    return (
      <List.Item
        onPress={this.goToAlbum(info.item)}
        left={props => <List.Icon {...props} icon="folder" />}
        title={`${info.item.id}. ${info.item.title}`}
        style={styles.listItem}
      />
    );
  };
  private renderPhotoItem = (info: ListRenderItemInfo<Photo>) => {
    return (
      <List.Item
        /* onPress={this.goToPhoto(info.item)} */
        left={props => <List.Icon {...props} icon="folder" />}
        title={`${info.item.id}. ${info.item.title}`}
        style={styles.listItem}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F5FCFF"
  },
  list: {
    margin: 20
  },
  listItem: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    textAlign: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
const mapStateToProps = (state: NavActionState) => {
  return {
    album: state.album,
    photo: state.photo,

  };
};

export default connect<any>(mapStateToProps as any)(AlbumContainer);
