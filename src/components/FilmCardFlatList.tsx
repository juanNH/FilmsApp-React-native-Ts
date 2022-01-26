import React from 'react';
import {FlatList, Text, View} from 'react-native';
import FilmCard from './FilmCard';
//interface
import {Movie} from './../interfaces/MovieInterface';
interface Props {
  title: string;
  movies: Movie[];
}

const FilmCardFlatList = ({title, movies}: Props) => {
  return (
    <View>
      <View style={{height: 230}}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>{title}</Text>
        <FlatList
          data={movies}
          renderItem={({item}: any) => (
            <FilmCard movie={item} width={140} height={200} />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default FilmCardFlatList;
