import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {RootStackParams} from '../navigation/NavigationController';
// import Icon from 'react-native-vector-icons/Ionicons';
import {useMoviesDetails} from '../hooks/useMoviesDetails';
import MovieDetails from '../components/MovieDetails';
import Icon  from 'react-native-vector-icons/Ionicons';

const {height: screenHeight} = Dimensions.get('screen');

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params;
  const url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const {isLoading, cast, movieFull} = useMoviesDetails(movie.id);

  return (
    <ScrollView>
       <View style={styles.backBottom}>
        <TouchableOpacity onPress={ ()=> navigation.pop()}>
          <Icon color="white" name="arrow-back-outline" size={60}/>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{uri: url}} style={styles.posterImage} />
        </View>
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size={35} color="grey" style={{marginTop: 20}} />
      ) : (
        <MovieDetails movieFull={ movieFull!} cast={cast} />
      )}
    

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.27,
    shadowRadius: 7,
    elevation: 10,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },
  imageBorder: {
    flex: 1,
    overFlow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    opacity: 0.8,
  },
  backBottom: {
    position: 'absolute',
    zIndex: 999,
    elevation: 11,
    top: 30,
    left: 5,
  },
});

export default DetailScreen;
