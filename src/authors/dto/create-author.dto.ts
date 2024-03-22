import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty({ message: "Author's name is required" })
  @IsString({ message: "Author's name must be a string" })
  readonly name: string;
}
