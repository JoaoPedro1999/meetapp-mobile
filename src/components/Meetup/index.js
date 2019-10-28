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

export default function Meetapp({ data, handleSubscribe }) {

  const userId = useSelector(store => store.user.profile.id);

  // if (!data.past) {
  //   past: false
  // }

  return (
    <Container
      // style={{
      //   opacity: past ? 1 : 0.5,
      // }}
    >
      <Banner
        source={{
          uri: data.file_id && data.File.url,
        }}
      />
      <Content>
        <Title>{data.title}</Title>
        <Info>
          <Icon name="event" size={20} color="#999" />
          <InfoText>{data.formattedDate}</InfoText>
        </Info>
        <Info>
          <Icon name="location-on" size={20} color="#999" />
          <InfoText>{data.location}</InfoText>
        </Info>
        <Info>
          <Icon name="person" size={20} color="#999" />
          <InfoText>{data.User.name}</InfoText>
        </Info>
        {!data.past &&
          (userId !== data.User.id && (
            <ViewButtom>
              {!data.past ? (
                  <SubmitButton icon="check" onPress={handleSubscribe}>
                    Realizar Inscrição
                  </SubmitButton>
                ) : (
                  <View/>
                )}
            </ViewButtom>
          ))}
      </Content>
    </Container>
  );
}

/* PROPS DECLARATION */
Meetapp.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleSubscribe: PropTypes.func,
  handleUninscribe: PropTypes.func,
};

Meetapp.defaultProps = {
  handleSubscribe: null,
  handleUninscribe: null,
};