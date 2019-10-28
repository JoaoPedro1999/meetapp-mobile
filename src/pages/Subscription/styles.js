import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  background: #000;
  height: 64px;
`;


export const ImageLogo = styled.Image`
  width: 24px;
  height: 24px;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 30,
    showsVerticalScrollIndicator: false,
  },
})``;

export const Meetapp = styled.View``;

export const NoMeetapps = styled.View`
  align-items: center;
  align-content: center;
  margin-top: 40px;
`;

export const NoMeetappsText = styled.Text`
  color: #fff;
  font-size: 18px;
  padding: 10px 0;
  text-align: center;
`;