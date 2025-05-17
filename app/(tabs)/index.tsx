import { Image } from 'expo-image';
import { ActivityIndicator, Animated, Dimensions, Platform, StyleSheet, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { fetchPhilosophyData } from '../redux/slices/philosophySlice';
import { FlatList } from 'react-native-gesture-handler';
import { RootState, AppDispatch } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import VideoItem from '@/components/VideoItem';
import { VideoView } from 'expo-video';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function HomeScreen() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.philosophy);
  const [videoList, setVideoList] = useState([]);
  const videoRefs = useRef<Array<VideoView | null>>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onPlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const onMuteToggle = () => {
    setIsMuted((prev) => !prev);
  };
  useEffect(() => {
    dispatch(fetchPhilosophyData({
      id: '684ee90a-6498-4c58-a425-bdbe93886eb7',
      pageSize: 20,
    }));
  }, []);

  useEffect(() => {
    if (data) {
      setVideoList(data.data.list);
    }
  }, [data]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const nextIndex = viewableItems[0].index;
      setCurrentIndex(nextIndex);
    }
  }).current;



  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 80 }).current;

  if (loading || !data) return <ActivityIndicator size="large" />;


  return (
    videoList.length > 0 ?
      <FlatList
        data={videoList}
        keyExtractor={(item: any, index) => item.id || index.toString()}
        pagingEnabled
        initialNumToRender={1}
        snapToAlignment='start'
        showsVerticalScrollIndicator={false}
        bounces={false}
        snapToInterval={SCREEN_HEIGHT}
        renderItem={({ item, index }) => (
          <View style={{ height: SCREEN_HEIGHT }}>
            <VideoItem
              item={item}
              isPlaying={index === currentIndex && isPlaying}
              onPlayPause={onPlayPause}
              isMuted={isMuted}
              onMuteToggle={onMuteToggle}
              isCurrent={index === currentIndex}
            />          
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        removeClippedSubviews={Platform.OS === 'android'}  // Enable only for Android to improve performance
        decelerationRate="fast"
        maxToRenderPerBatch={3}
        windowSize={5}
      /> : null
  );
}

