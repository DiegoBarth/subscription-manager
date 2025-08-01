import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {

   catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
      const ctx      = host.switchToHttp();
      const response = ctx.getResponse();
      let status     =
         exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

      let message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

      if(exception.code === 'P2002') {
         status  = HttpStatus.CONFLICT;
         message = `Unique constraint failed on the field: ${exception.meta?.target}`;
      }

      response.status(status).json({
         statusCode: status,
         message,
         timestamp: new Date().toISOString(),
         path: ctx.getRequest().url
      });
   }

}
