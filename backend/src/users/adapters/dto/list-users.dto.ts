import { IsOptional, IsNumberString, IsIn, IsString } from 'class-validator';

export class ListUsersDto {

   @IsOptional()
   @IsNumberString()
   page?: string;

   @IsOptional()
   @IsNumberString()
   limit?: string;

   @IsOptional()
   @IsString()
   search?: string;

   @IsOptional()
   @IsString()
   sortBy?: string;

   @IsOptional()
   @IsIn(['ASC', 'DESC'])
   sortOrder?: 'ASC' | 'DESC';

}