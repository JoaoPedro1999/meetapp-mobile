import React from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  Container,
  Content,
  Banner,
  Title,
  Info,
  InfoText,
  ViewButtom,
  SubmitButton,
} from './styles';

export default function Subscription({ data, handleUninscribe }) {

  const userId = useSelector(store => store.user.profile.id);

  const subs = data


  return (
    <Container>
      <Banner
        source={{
          uri: subs.file_id && subs.File.url,
        }}
      />
      <Content>
        <Title>{subs.meetup_id}</Title>
        <Info>
          <Icon name="event" size={20} color="#999" />
          <InfoText>{subs.formattedDate}</InfoText>
        </Info>
        <Info>
          <Icon name="location-on" size={20} color="#999" />
          <InfoText>{subs.userId}</InfoText>
        </Info>
        <Info>
          <Icon name="person" size={20} color="#999" />
          <InfoText>{subs.name}</InfoText>
        </Info>
       
            <ViewButtom>
              {!data.past ? (
                  <SubmitButton icon="close" onPress={handleUninscribe}>
                    Cancelar Inscrição
                  </SubmitButton>
                ) : (
                  <View/>
                )}
            </ViewButtom>
          
      </Content>
    </Container>
  );
}

