/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { withNavigationFocus } from 'react-navigation';
import logo from '../../assets/logo.png';
import Background from '../../components/Background';
import Meetup from '../../components/Meetup'
import api from '../../services/api'

import {
  Container,
  Header,
  ImageLogo,
  ContainerHeader,
  ButtonDate,
  TextDate,
  List,
  NoMeetup,
  NoMeetupText
} from './styles';


function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [refreshing] = useState(false);
  const [noMeetups] = useState([1]);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );
  
  useEffect(() => {
    async function loadMeetapps() {
      const response = await api.get('meetups', { params: { date } });
      
      const data = response.data.map(m => ({
        ...m,
        formattedDate: format(parseISO(m.date), "d 'de' MMMM', às' hh'h'mm", {
          locale: pt,
        }),
      }));
      setMeetups(data);
    }
    loadMeetapps();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handleRefresh() {
    setDate(subDays(date, 0));
  }

   async function handleSubscribe(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);
      handleRefresh();
      Alert.alert("Inscrição confirmada!")
    } catch (e) {
      Alert.alert("Não é possivel se inscrever em dois meetups no mesmo horário")
    }
  }

  return (
    <Background>
      <Container>
        <Header>
          <ImageLogo source={logo} />
        </Header>

        <ContainerHeader>
          <ButtonDate onPress={handlePrevDay}>
            <Icon name="navigate-before" size={36} color="#fff" />
          </ButtonDate>
          <TextDate>{dateFormatted}</TextDate>
          <ButtonDate onPress={handleNextDay}>
            <Icon name="navigate-next" size={36} color="#fff" />
          </ButtonDate>
        </ContainerHeader>

        {meetups.length > 0 ? (
            <List
              data={meetups}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Meetup
                  data={item}
                  handleSubscribe={() => handleSubscribe(item.id)}
                  handleUninscribe={() => handleUninscribe(item.id)}
                />
              )}
              onRefresh={handleRefresh}
              refreshing={refreshing}
            />
          ) : (
            <List
              data={noMeetups}
              keyExtractor={item => String(item)}
              renderItem={() => (
                <NoMeetup>
                  <Icon name="sentiment-dissatisfied" size={40} color="#fff" />
                  <NoMeetupText>
                    Nenhum meetup marcado para hoje!
                  </NoMeetupText>
                </NoMeetup>
              )}
              onRefresh={handleRefresh}
              refreshing={refreshing}
            />
          )}      

      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
