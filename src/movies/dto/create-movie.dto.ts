import { IsString, IsNotEmpty, IsUrl, } from "class-validator";

export class CreateMovieDto {
  @IsString()
  name: string;

  @IsString()
  year: string;

  @IsString()
  lenght: string;

  @IsNotEmpty()
  storyline: string;

  @IsUrl()
  image: string;
}
