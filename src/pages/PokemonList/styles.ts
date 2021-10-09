import styled from 'styled-components/native';

export const LoadingWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#6890F0',
})`
  margin-bottom: 10px;
`;
