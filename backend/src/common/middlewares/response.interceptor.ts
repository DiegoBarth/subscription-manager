import {
   CallHandler,
   ExecutionContext,
   Injectable,
   NestInterceptor,
   Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
   
   constructor(private dto: Type<T>) { }

   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
         map((data) => plainToInstance(this.dto, data, { excludeExtraneousValues: true })),
      );
   }

}