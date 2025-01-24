import { type WebsocketSendData, WebsocketState } from '$/types/websocket';
import { loggerUtils } from '$/utils/logger';
import { GlobalVariable, applicationUtils } from '$web/utils/application';
import { createRoot, createSignal, untrack } from 'solid-js';

export type WebsocketManagerStore = {
  connect: () => void;
  disconnect: () => void;
  send: (data: WebsocketSendData) => void;
};

const createWebsocketManagerStore = (): WebsocketManagerStore => {
  const [connection, setConnection] = createSignal<WebSocket>();

  const handleOpen = () => {
    // @todo(remove) just for testing
    connection()?.send('hello from client');
  };

  const handleMessage = (event: MessageEvent) => {
    // @todo(remove) just for testing
    console.log('message', event.data);
  };

  const handleClose = () => {
    // nothing to do yet
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      loggerUtils.error(`websocket error: ${error}`);

      throw error;
    }

    const errorMessage = 'websocket error: unknown error';

    loggerUtils.error(errorMessage);

    throw new Error(errorMessage);
  };

  const connect = () => {
    untrack(() => {
      const currentConnection = connection();

      // @todo(todo) if connecting we should wait for it to connect and then close

      if (currentConnection?.readyState === WebsocketState.OPEN) {
        currentConnection.close();
      }

      loggerUtils.log('creating websocket connection');

      const newConnection = new WebSocket(
        `${applicationUtils.getGlobalVariable(GlobalVariable.BASE_WEBSOCKET_URL)}/ws`,
      );

      setConnection(newConnection);

      newConnection.onopen = handleOpen;
      newConnection.onmessage = handleMessage;
      newConnection.onclose = handleClose;
      newConnection.onerror = handleError;
    });
  };

  const disconnect = () => {
    connection()?.close();

    setConnection(undefined);
  };

  const send = (data: WebsocketSendData) => {
    const currentConnection = connection();

    if (currentConnection?.readyState !== WebsocketState.OPEN) {
      loggerUtils.warn('attempted to send a message before it was ready');

      return;
    }

    currentConnection.send(data);
  };

  return {
    connect,
    disconnect,
    send,
  };
};

const websocketManagerStore = createRoot(createWebsocketManagerStore);

export { websocketManagerStore };

if (import.meta.hot) {
  // @todo(research) not sure why but this is needed to get hot reload to work properly here and not create a bunch
  // @todo(research) of orphaned connections
  import.meta.hot.accept(() => {});
  import.meta.hot.dispose(() => {});
}
