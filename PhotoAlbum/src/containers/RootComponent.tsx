import React from "react";
import { StyleSheet, View } from "react-native";
import { connect, DispatchProp } from "react-redux";
import AlbumContainer from "./AlbumContainer";
import { Album, Photo } from "../types";
import photos from "../data/photos.json";
import albums from "../data/albums.json";
import { NavActionState } from "../reducers/navActions";

interface RootProps extends DispatchProp<any> {
  album: Album | undefined;
  photo: Photo | undefined;
}
interface RootState {
  albums: Album[];
  photos: Photo[];
}

class RootComponent extends React.Component<RootProps, RootState> {
  constructor(props: RootProps) {
    super(props);
    this.state = {
      albums: [],
      photos: []
    };
  }

  public componentDidMount() {
    this.setState({ albums, photos });
  }
  public render() {
    const { album, photo } = this.props;
    console.log(this.props);
    return (
      <View style={styles.container}>
        <AlbumContainer
          album={album}
          albums={this.state.albums}
          photo={photo}
          photos={this.state.photos}
          dispatch={this.props.dispatch}
        />
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
export default connect<NavActionState>(mapStateToProps as any)(RootComponent);
