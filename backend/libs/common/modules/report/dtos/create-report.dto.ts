import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
} from "class-validator";

import { Type } from "class-transformer";

import {
  IncidentType,
  UserType,
} from "@prisma/client";

export class CreateReportDto {

  @IsEnum(UserType)
  userType: UserType;

  @IsString()
  registerNumber: string;

  @IsEnum(IncidentType)
  incidentType: IncidentType;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Number)
  @IsLatitude()
  latitude: number;

  @Type(() => Number)
  @IsLongitude()
  longitude: number;
}