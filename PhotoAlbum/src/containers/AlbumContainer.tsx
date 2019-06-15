import React, { Component, Dispatch } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { List } from "react-native-paper";
import { Album, Photo } from "../types";
import { connect, DispatchProp } from "react-redux";
import { openAlbum, ActionState, openPhoto } from "../reducers/actions";

interface AlbumProps extends DispatchProp<any> {
  album: Album | undefined;
  photo: Photo | undefined;
  photos: Photo[];
  albums: Album[];
}

class AlbumContainer extends React.Component<AlbumProps> {
  constructor(props: AlbumProps) {
    super(props);
  }
  public componentWillReceiveProps(props: AlbumProps) {
    console.log("props", props);
  }
  public render() {
    return (
      <View>
        <Text style={styles.welcome}>
          {this.props.album ? this.props.album.title : "Select Album"}
        </Text>
        {(!this.props.album && (
          <FlatList
            key="albums"
            numColumns={1}
            style={styles.albumList}
            renderItem={this.renderAlbumItem}
            data={this.props.albums}
            keyExtractor={item => {
              return item.id.toString();
            }}
          />
        )) ||
          (this.props.album && !this.props.photo && (
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
          )) ||
          (this.props.photo && (
            <View
              style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
            >
              <Image
                source={{ uri: this.props.photo.url }}
                style={{ width: 300, height: 300 }}
              />
              <Text style={{ fontSize: 20, width: 300, textAlign:'center' }}>
                {this.props.photo.title}
              </Text>
            </View>
          ))}
      </View>
    );
  }
  private getPhotosFromAlbum = (albumId: number) => {
    const photos = this.props.photos.filter(photo => photo.albumId === albumId);
    return photos;
  };

  private goToAlbum = (album: Album) => () => {
    this.props.dispatch(openAlbum(album));
  };

  private navigateToPhoto = (photo: Photo) => () => {
    this.props.dispatch(openPhoto(photo));
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
      <TouchableOpacity
        style={styles.photoItem}
        onPress={this.navigateToPhoto(info.item)}
      >
        <Image
          style={styles.imageThumbnail}
          source={{ uri: info.item.thumbnailUrl }}
        />
        <Text style={styles.descText}>{`${info.item.id}. ${
          info.item.title
        }`}</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5"
  },
  albumList: {
    margin: 20
  },
  photoList: {
    margin: 20
  },
  photoItem: {
    flex: 1,
    flexDirection: "column",
    margin: 8
  },
  descText: {
    textAlign: "center",
    padding: 4
  },
  listItem: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5
  },
  imageThumbnail: {
    borderWidth: 5,
    borderRadius: 3,
    borderColor: "#a6a9ad",
    alignSelf: "center",
    width: 150,
    height: 150
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
const mapStateToProps = (state: ActionState, ownProps: AlbumProps) => {
  return {
    album: state.album,
    photo: state.photo,
    albums: state.albums,
    photos: state.photos
  };
};

export default connect<Partial<ActionState>>(mapStateToProps as any)(
  AlbumContainer as any
);
