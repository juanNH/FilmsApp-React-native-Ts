import React from 'react';
import {ActivityIndicator, View, Dimensions, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
//hooks
import {useMovies} from '../hooks/useMovies';
//components
import FilmCard from './../components/FilmCard';
import FilmCardFlatList from '../components/FilmCardFlatList';

const {width: screenWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const {cineFilms, popularsFilms, topRatedFilms, upComingFilms, isLoading} =
    useMovies();

  const {top} = useSafeAreaInsets();
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={{marginTop: top + 20}}>
        <View style={{height: 400}}>
          <Carousel
            data={cineFilms}
            renderItem={({item}: any) => <FilmCard movie={item} />}
            sliderWidth={screenWidth}
            itemWidth={300}
          />
        </View>
        <FilmCardFlatList movies={cineFilms} title="En cine" />
        <FilmCardFlatList movies={popularsFilms} title="Populares" />
        <FilmCardFlatList movies={topRatedFilms} title="Mas valoradas" />
        <FilmCardFlatList movies={upComingFilms} title="Proximos estrenos" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
