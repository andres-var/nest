import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const rawHeaders = req.rawHeaders;

    return data ? rawHeaders[data] : rawHeaders;
  },
);
