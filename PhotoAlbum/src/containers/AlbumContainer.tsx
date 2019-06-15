import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Album, Photo } from "../types";
import { connect, DispatchProp } from "react-redux";
import { ActionState } from "../reducers/actions";
import AlbumList from "../components/AlbumList";
import PhotoList from "../components/PhotoList";
import PhotoComponent from "../components/PhotoComponent";

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
    if (!this.props.album) {
      return (
        <AlbumList albums={this.props.albums} dispatch={this.props.dispatch} />
      );
    } else if (this.props.album && !this.props.photo) {
      return (
        <PhotoList
          photos={this.props.photos}
          album={this.props.album}
          dispatch={this.props.dispatch}
        />
      );
    } else if (this.props.photo) {
      return <PhotoComponent photo={this.props.photo} />;
    }
  }
}

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
