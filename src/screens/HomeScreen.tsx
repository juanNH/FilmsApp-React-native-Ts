import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, View, Dimensions, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

//hooks
import {useMovies} from '../hooks/useMovies';
//components
import FilmCard from './../components/FilmCard';
import FilmCardFlatList from '../components/FilmCardFlatList';
import GradientBackground from '../components/GradientBackground';
import {getImageColors} from '../helpers/getColors';
import {GradientContext} from '../context/GradientContext';

const {width: screenWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const {cineFilms, popularsFilms, topRatedFilms, upComingFilms, isLoading} =
    useMovies();
  const {setMainColors} = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = cineFilms[index];
    const url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const [primary, secondary] = await getImageColors(url);
    setMainColors({primary, secondary});
  };

  const {top} = useSafeAreaInsets();

  useEffect(() => {
    if (cineFilms.length > 0) {
      getPosterColors(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cineFilms]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }
  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          <View style={{height: 400}}>
            <Carousel
              data={cineFilms}
              renderItem={({item}: any) => <FilmCard movie={item} />}
              sliderWidth={screenWidth}
              itemWidth={300}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>
          <FilmCardFlatList movies={cineFilms} title="En cine" />
          <FilmCardFlatList movies={popularsFilms} title="Populares" />
          <FilmCardFlatList movies={topRatedFilms} title="Mas valoradas" />
          <FilmCardFlatList movies={upComingFilms} title="Proximos estrenos" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default HomeScreen;
