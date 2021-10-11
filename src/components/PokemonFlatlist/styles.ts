import styled from 'styled-components/native';

export const LoadingIndicator = styled.ActivityIndicator.attrs(({theme}) => ({
  size: 'large',
  color: theme.colors.black,
}))`
  margin-bottom: 10px;
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: ${({theme}) => theme.colors.white};
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
})`
  flex-grow: 1;
  width: 100%;
  flex: 1;
`;
