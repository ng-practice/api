export enum ChatClientEvent {
  LoadAllMessages = '[Chat:Client] Load messages from history',
  RemoveAllMessages = '[Chat:Client] Remove messages from history',
  PublishSingleMessage = '[Chat:Client] Publish message to the channel'
}
