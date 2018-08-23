export interface SocketAct<T> {
  event: string;
  data?: T;
}
