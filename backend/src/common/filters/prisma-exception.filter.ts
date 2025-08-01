import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {

   catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
      const ctx      = host.switchToHttp();
      const response = ctx.getResponse();

      let status  = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';

      if(exception.code === 'P2002') {
         status  = HttpStatus.CONFLICT;
         message = `Unique constraint failed on the field: ${exception.meta?.target}`;
      }

      response.status(status).json({
         statusCode: status,
         message,
         error: 'Conflict'
      });
   }

}
