export const WebsocketState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

export type WebsocketState = (typeof WebsocketState)[keyof typeof WebsocketState];

export type WebsocketSendData = string | ArrayBuffer | Blob | ArrayBufferView;
