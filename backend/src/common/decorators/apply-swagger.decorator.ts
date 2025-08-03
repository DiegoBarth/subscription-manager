import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

export function ApplySwagger(metadata: {
   summary: string;
   bearerAuth?: boolean;
   bodyType?: any;
   param?: { name: string; type: any; example?: any; description?: string };
   queryParams?: Array<{ name: string; required?: boolean; example?: any }>;
}) {
   return applyDecorators(
      ApiOperation({ summary: metadata.summary }),
      ...(metadata.bearerAuth ? [ApiBearerAuth()] : []),
      ...(metadata.bodyType ? [ApiBody({ type: metadata.bodyType })] : []),
      ...(metadata.param ? [
         ApiParam({
            name: metadata.param.name,
            type: metadata.param.type,
            example: metadata.param.example,
            description: metadata.param.description
         })
      ] : []),
      ...(metadata.queryParams
         ? metadata.queryParams.map((param) =>
            ApiQuery({
               name: param.name,
               required: param.required,
               example: param.example
            })
         )
         : []),
   );
}