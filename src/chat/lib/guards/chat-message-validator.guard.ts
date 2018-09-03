import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatMessageValidator implements CanActivate {
  mandatoryFields = ['guid', 'text', 'writtenBy', 'writtenAt'];

  canActivate(context: ExecutionContext) {
    const rawMessage = context.switchToWs().getData();
    const foundErrors = this.check(rawMessage, this.mandatoryFields);

    if (foundErrors.length > 0) {
      throw new WsException(`[WebSocketError]: ${foundErrors}`);
    }

    return true;
  }

  private missingFieldMessage(field: string) {
    return `Please provide the field "${field}".\n`;
  }

  private check(target: object, fields: string[]) {
    return fields.reduce(
      (violations: string[], field) =>
        !target[field]
          ? [...violations, this.missingFieldMessage(field)]
          : violations,
      []
    );
  }
}
