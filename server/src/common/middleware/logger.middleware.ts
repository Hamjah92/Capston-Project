import { Request, Response, NextFunction } from "express";
import { Injectable, NestMiddleware, Logger } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;
    const startTime = Date.now();

    response.on("finish", () => {
      const { statusCode } = response;
      const resTime = Date.now() - startTime;
      this.logger.log(
        `${method} ${originalUrl} -(Status Code:${statusCode})- ${resTime} ms`,
      );
    });

    next();
  }
}