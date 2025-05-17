import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";
import { MuteIcon } from "../assets/images/MuteIcon";
import { UnmuteIcon } from "../assets/images/UnmuteIcon";
import Video from "react-native-video";
import { IMAGE_URL } from "@/app/utils/constants";

const { height, width } = Dimensions.get("window");

const VideoItem = ({
  item,
  isPlaying,
  onPlayPause,
  isMuted,
  onMuteToggle,
  isCurrent,
}: {
  item: any;
  isPlaying: boolean;
  onPlayPause: () => void;
  isMuted: boolean;
  onMuteToggle: () => void;
  isCurrent: boolean;
}) => {
  const [readMore, setReadMore] = useState(false);
  const shortDesc = item?.description ? item?.description?.slice(0, 100) : "";
  const videoSource = item?.contentUrl;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const toggleMute = () => {
    onMuteToggle();
    animateIcon();
  };

  const animateIcon = () => {
    scaleAnim.setValue(1.5);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity activeOpacity={1} style={styles.container}>
      <Video
        source={{ uri: IMAGE_URL+videoSource }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat={true}
        paused={!isCurrent || !isPlaying} // Only play if this is the current video and should be playing
        muted={isMuted} // Mute or unmute
      />

      <View style={styles.userInfo}>
        <Image source={{ uri: IMAGE_URL+item?.orgImage }} style={styles.avatar} />
        <Text style={styles.username}>{item?.orgName || "Name"}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.descriptionContainer}>
          {item?.description && (
            <Text style={styles.description}>
              {readMore || item.description.length <= 100
                ? item.description
                : `${shortDesc}... `}
              {item.description.length > 100 && !readMore && (
                <Text style={styles.readMore} onPress={() => setReadMore(true)}>
                  Read More
                </Text>
              )}
            </Text>
          )}
        </View>

        <View style={styles.reactionContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleMute}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              {isMuted ? (
                <MuteIcon size={32} />
              ) : (
                <UnmuteIcon size={32} />
              )}
            </Animated.View>
          </TouchableOpacity>
          <View style={styles.likeContainer}>
            <Image style={styles.likeButton} source={require("../assets/images/heart.png")} />
            <Text style={styles.reaction}>{item.totalLikes}</Text>
          </View>
          <View style={styles.likeContainer}>
            <Image style={styles.likeButton} source={require("../assets/images/comment.png")} />
            <Text style={styles.reaction}>{item.totalComments}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.controlsContainer} onPress={onPlayPause}>
        <Image
          source={isPlaying ? require("../assets/images/pause.png") : require("../assets/images/play.png")}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: "center",
    backgroundColor: "black",
  },
  userInfo: {
    position: "absolute",
    top: 40,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#fff",
  },
  username: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  descriptionContainer: {
    flex: 1,
    marginRight: 16,
  },
  description: {
    color: "#fff",
    fontSize: 14,
  },
  readMore: {
    color: "#ccc",
    fontSize: 14,
  },
  reactionContainer: {
    alignItems: "flex-end",
    marginBottom: 50,
  },
  reaction: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  video: {
    width: "100%",
    height: height,
  },
  controlsContainer: {
    position: "absolute",
    alignSelf: "center",
  },
  likeButton: {
    height: 30,
    width: 30,
  },
  likeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    marginBottom:10
  },
});

export default VideoItem;
