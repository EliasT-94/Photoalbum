import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { connect, DispatchProp } from "react-redux";
import AlbumContainer from "./AlbumContainer";
import { Album, Photo } from "../types";
import {
  getAlbums,
  getPhotos,
  openAlbum,
  openPhoto
} from "../reducers/actions";
import { ActionState } from "../reducers/actions";
import { Appbar } from "react-native-paper";

interface RootProps extends DispatchProp<any> {
  albums: Album[];
  photos: Photo[];
  album: Album;
  photo: Photo;
}

class RootContainer extends React.Component<RootProps, any> {
  constructor(props: RootProps) {
    super(props);
    this.state = {
      photos: this.props.photos ? this.props.photos : [],
      albums: this.props.albums ? this.props.albums : []
    };
  }

  public componentDidMount() {
    if (!this.props.albums || !this.props.albums.length) {
      fetch("https://jsonplaceholder.typicode.com/albums")
        .then(response => response.json())
        .then((albums: Album[]) => {
          this.props.dispatch(getAlbums(albums)) && this.setState({ albums });
        })
        .catch(error => {
          console.log("Error fetching albums", error);
        });
    }
    if (!this.props.photos || !this.props.photos.length) {
      fetch("https://jsonplaceholder.typicode.com/photos")
        .then(response => response.json())
        .then(
          (photos: Photo[]) =>
            this.props.dispatch(getPhotos(photos)) && this.setState({ photos })
        )
        .catch(error => {
          console.log("Error fetching photos", error);
        });
    }
  }
  public render() {
    return (
      <View style={styles.container}>
        <Appbar style={styles.appbar}>
          {(this.props.album && (
            <Appbar.BackAction onPress={this.handleGoBack} />
          )) || <Appbar.Action icon={"perm-media"} />}
          <Appbar.Header style={styles.appbar}>
            <Text style={styles.header}>The Album Application</Text>
          </Appbar.Header>
        </Appbar>
        {(this.props.albums.length && this.props.photos.length && (
          <AlbumContainer />
        )) || <ActivityIndicator size="large" />}
      </View>
    );
  }

  /**
   * Handle action button press
   * Dispatch undefined album or photo to redux so the view will go back
   */
  private handleGoBack = () => {
    if (this.props.album && !this.props.photo) {
      this.props.dispatch(openAlbum(undefined));
    }
    if (this.props.photo) {
      this.props.dispatch(openPhoto(undefined));
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
    paddingBottom: 20
  },
  appbar: {
    backgroundColor: "#050505"
  },
  header: {
    fontFamily: "BebasNeue-Regular",
    color: "white",
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
const mapStateToProps = (state: ActionState) => {
  return {
    albums: state.albums,
    photos: state.photos,
    album: state.album,
    photo: state.photo
  };
};
export default connect<ActionState>(mapStateToProps as any)(
  RootContainer as any
);
