import React, { useEffect, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { withNavigationFocus } from 'react-navigation';
import logo from '../../assets/logo.png';
import Background from '../../components/Background';
import Subscription from '../../components/Subscription'
import api from '../../services/api'

import {
  Container,
  Header,
  ImageLogo,
  List,
  NoMeetapps,
  NoMeetappsText
} from './styles';

function Subscriptions() {
  const [subscription, setSubscription] = useState([]);
  const [date, setDate] = useState(new Date());
  const [refreshing] = useState(false);
  const [noSubscription] = useState([1]);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );
  
  useEffect(() => {
    async function loadSubscription() {
      const response = await api.get('subscriptions');

      const data = response.data.map(m => ({
        ...m,
        formattedDate: format(parseISO(m.Meetup.date), "d 'de' MMMM', às' hh'h'mm", {
          locale: pt,
        }),
      }));

      setSubscription(data);
    }
    loadSubscription();
  }, [date]);

  function handleRefresh() {
    setDate(subDays(date, 0));
  }

  async function handleUninscribe(id) {
    console.log(id)
    try {
      await api.delete(`subscriptions/${1}`);
      handleRefresh();
      
    } catch (e) {
      Alert.alert("Erro")
    }
  }

  return (
    <Background>
      <Container>
        <Header>
          <ImageLogo source={logo} />
        </Header>

        {subscription.length > 0 ? (
            <List
              data={subscription}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Subscription
                  data={subscription}
                  handleUninscribe={() => handleUninscribe(item.id)}
                />
              )}
              onRefresh={handleRefresh}
              refreshing={refreshing}
            />
          ) : (
            <List
              data={noSubscription}
              keyExtractor={item => String(item)}
              renderItem={() => (
                <NoMeetapps>
                  <Icon name="sentiment-dissatisfied" size={40} color="#fff" />
                  <NoMeetappsText>
                    Ops, você não está inscrito em nenhum meetup!
                  </NoMeetappsText>
                </NoMeetapps>
              )}
              onRefresh={handleRefresh}
              refreshing={refreshing}
            />
          )}      

      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};


export default withNavigationFocus(Subscriptions);