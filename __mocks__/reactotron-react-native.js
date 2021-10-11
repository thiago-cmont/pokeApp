/* eslint-disable no-undef */
jest.mock('reactotron-react-native', () => {
  return {
    configure: () => ({
      useReactNative: () => ({
        use: () => ({
          use: () => ({
            setAsyncStorageHandler: () => ({
              connect: () => ({
                createEnhancer: jest.fn(),
                clear: jest.fn(),
                createSagaMonitor: jest.fn(),
              }),
            }),
          }),
        }),
      }),
    }),
  };
});
