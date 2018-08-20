import { ExecutionContext } from '@nestjs/common';

export class CurrentHttpRequest {
  private _request: any;

  get method(): string {
    return this._request.method;
  }

  get params(): { [key: string]: string } {
    return this._request.params;
  }

  constructor(context: ExecutionContext) {
    this._request = context.switchToHttp().getRequest();
  }
}
