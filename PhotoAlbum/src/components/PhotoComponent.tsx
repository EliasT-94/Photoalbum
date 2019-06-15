import React from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import { Photo } from "../types";
import Image from "react-native-scalable-image";

interface PhotoComponentProps {
  photo: Photo;
}
interface PhotoComponentState {
  fadeAnim: Animated.Value;
}
export default class PhotoComponent extends React.Component<
  PhotoComponentProps,
  PhotoComponentState
> {
  constructor(props: PhotoComponentProps) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0)
    };
  }
  /**
   * When component mounts, add some animations
   */
  public componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 500
    }).start();
  }
  public render() {
    const { fadeAnim } = this.state;
    return (
      <Animated.View style={[styles.fullPhoto, { opacity: fadeAnim }]}>
        <Image
          width={Dimensions.get("window").width}
          source={{ uri: this.props.photo.url }}
        />
        <View style={styles.photoTitleContainer}>
          <Text style={styles.photoTitle}>{this.props.photo.title}</Text>
        </View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  photoTitle: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    lineHeight: 50
  },
  photoTitleContainer: {
    width: "100%"
  },
  fullPhoto: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
