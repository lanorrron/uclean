import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import ws from "ws";

@Injectable()
export class SupabaseStorageService {
  private supabase;
  constructor(
    private readonly configService: ConfigService,
  ) {

    this.supabase = createClient(
      this.configService.get<string>("SUPABASE_URL")!,
      this.configService.get<string>("SUPABASE_SERVICE_ROLE")!,
      {
        realtime: {
          transport: ws,
        },
      },
    );
  }

  async uploadImage(file: Express.Multer.File) {
    const fileName = `${randomUUID()}-${file.originalname}`;

    const { error } = await this.supabase.storage
      .from("reports")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    const { data } = this.supabase.storage
      .from("reports")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }
}