import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Image from "react-native-scalable-image";
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

  public render() {
    return (
      <>
        <View>
          <Text style={styles.welcome}>
            {this.props.album ? this.props.album.title : "Select Album"}
          </Text>
          {(!this.props.album && (
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
            ))}
        </View>
        {this.props.photo && (
          <View style={styles.fullPhoto}>
            <Image
              width={Dimensions.get("window").width}
              source={{ uri: this.props.photo.url }}
            />
            <View style={styles.photoTitleContainer}>
            <Text style={styles.photoTitle}>{this.props.photo.title}</Text>

            </View>
          </View>
        )}
      </>
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
   * Dispatch info about an album to redux so it'll be opened
   * @param {Album} album
   */
  private goToAlbum = (album: Album) => () => {
    this.props.dispatch(openAlbum(album));
  };
  /**
   * Dispatch a single photo to redux so it'll be opened
   * @param {Photo} photo
   */
  private goToPhoto = (photo: Photo) => () => {
    this.props.dispatch(openPhoto(photo));
  };

  /**
   * Render single item in album list
   * @param {ListRenderItemInfo} info A single item to be rendered with index and separator (unused)
   */
  private renderAlbumItem = (info: ListRenderItemInfo<Album>) => {
    return (
      <List.Item
        onPress={this.goToAlbum(info.item)}
        left={props => <List.Icon {...props} icon="collections" style={{marginLeft:-8, marginRight: -8}} />}
        title={info.item.title}
        style={[
          styles.listItem,
          { backgroundColor: this.setListBackground(info.item.id) }
        ]}
      />
    );
  };

  /**
   * Make every second album have sligtly different color
   * @param {number} item
   */
  private setListBackground = (item: number) => {
    return item % 2 === 1 ? "#e6e6e6" : "#D9D9D9";
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
          style={styles.imageThumbnail}
          source={{ uri: info.item.thumbnailUrl }}
        />
        <Text style={styles.descText}>{info.item.title}</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  photoTitle: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    lineHeight: 50
  },
  photoTitleContainer: {
    width: '100%',
  },
  fullPhoto: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
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
    color: "white",
    textAlign: "center",
    padding: 4
  },
  listItem: {
    width: "45%",
    backgroundColor: "#bfe5ae",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#a6a9ad",
    margin: 8
  },
  imageThumbnail: {
    borderWidth: 5,
    borderRadius: 3,
    borderColor: "#a6a9ad",
    alignSelf: "center",
    width: 175,
    height: 175
  },
  welcome: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 8
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
