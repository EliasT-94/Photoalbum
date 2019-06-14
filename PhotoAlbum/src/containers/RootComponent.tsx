import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect, DispatchProp } from "react-redux";
import AlbumContainer from "./AlbumContainer";
import { Album, Photo } from "../types";
import { getAlbums, getPhotos, openAlbum } from "../reducers/actions";
import { ActionState } from "../reducers/actions";
import { Appbar } from "react-native-paper";

interface RootProps extends DispatchProp<any> {
  albums: Album[];
  photos: Photo[];
  album: Album;
  photo: Photo;
}

class RootComponent extends React.Component<RootProps, any> {
  constructor(props: RootProps) {
    super(props);
    this.state = {
      photos: this.props.photos ? this.props.photos : [],
      albums: this.props.albums ? this.props.albums : []
    };
  }

  public componentDidMount() {
    if (!this.props.albums || !this.props.albums.length) {
      console.log("No albums, fetching...");
      fetch("https://jsonplaceholder.typicode.com/albums")
        .then(response => response.json())
        .then((albums: Album[]) => {
          console.log("ALBUMS FOUND!!", albums);
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
        <Appbar>
          {this.props.album && (
            <Appbar.Action
              icon={"arrow-back"}
              onPress={() => this.props.dispatch(openAlbum(undefined))}
            />
          )}
          <Appbar.Header>
            <Text style={styles.welcome}>Mighty Album Application</Text>
          </Appbar.Header>
        </Appbar>

        <AlbumContainer />
      </View>
    );
  }
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
    color: "white",
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
const mapStateToProps = (state: ActionState) => {
  return {
    albums: state.albums,
    photos: state.photos,
    album: state.album,
    photo: state.photo
  };
};
export default connect<ActionState>(mapStateToProps as any)(
  RootComponent as any
);
