import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Container, ButtonText, Text } from './styles';

export default function Button({ icon, children, loading, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <>
          <ButtonText>
            <Icon name={icon} size={15} color="#fff" />
            <Text>{children}</Text>
          </ButtonText>
        </>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
