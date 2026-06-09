import { Module } from "@nestjs/common";
import { SupabaseClient } from "./supabase.provider";

@Module({
  providers: [SupabaseClient],
  exports: [SupabaseClient],
})
export class SupabaseModule {}