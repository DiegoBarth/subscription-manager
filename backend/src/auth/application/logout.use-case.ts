import { Injectable } from "@nestjs/common";
import { RefreshTokenRepository } from "../infrastructure";

@Injectable()
export class LogoutUseCase {

   constructor(private readonly tokenRepo: RefreshTokenRepository) { }

   async execute(refreshToken: string): Promise<void> {
      await this.tokenRepo.remove(refreshToken);
   }

}