import { CreateUserDto, UpdateUserDto, UserResponseDto } from "./dto";

export const UsersSwagger = {
   create: {
      summary:      'Create a new user (Admin only)',
      bearerAuth:   true,
      bodyType:     CreateUserDto,
      roles:        ['admin'],
      responseType: UserResponseDto
   },
   findAll: {
      summary: 'List all users (Paginated)',
      bearerAuth:   true,
      responseType: UserResponseDto,
      queryParams: [
         { name: 'page',      required: false, example: 1       },
         { name: 'limit',     required: false, example: 10      },
         { name: 'page',      required: false, example: 1       },
         { name: 'limit',     required: false, example: 10      },
         { name: 'search',    required: false, example: 'Diego' },
         { name: 'sortBy',    required: false, example: 'id'    },
         { name: 'sortOrder', required: false, example: 'ASC'   }
      ],
   },
   update: {
      summary:      'Update user by ID (Admin only)',
      bearerAuth:   true,
      bodyType:     UpdateUserDto,
      roles:        ['admin'],
      param: { 
         name: 'id', 
         type: Number, 
         example: 1
      },
      responseType: UserResponseDto
  }
};