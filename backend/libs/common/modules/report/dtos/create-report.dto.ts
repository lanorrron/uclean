import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
} from "class-validator";

import { Type } from "class-transformer";

import {
  Area,
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
  
  @IsEnum(Area)
  area:Area;

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