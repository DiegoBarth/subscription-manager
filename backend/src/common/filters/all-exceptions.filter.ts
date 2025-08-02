import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

   private readonly logger = new Logger(AllExceptionsFilter.name);

   catch(exception: unknown, host: ArgumentsHost) {
      const ctx      = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request  = ctx.getRequest<Request>();

      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message: any = 'Internal server error';

      if (exception instanceof HttpException) {
         status = exception.getStatus();
         const responseBody = exception.getResponse();

         if(typeof responseBody === 'string') {
            message = responseBody;
         }
         else if(typeof responseBody === 'object' && responseBody !== null) {
            message = (responseBody as any).message ?? responseBody;
         }
      }
      else if (exception instanceof Error) {
         message = exception.message;
      }

      this.logger.error({
         statusCode: status,
         path: request.url,
         method: request.method,
         message,
         exception,
      });

      response.status(status).json({
         statusCode: status,
         message,
         timestamp: new Date().toISOString(),
         path: request.url,
      });
   }
   
}