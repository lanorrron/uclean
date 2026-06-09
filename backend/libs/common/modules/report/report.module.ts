import { Module } from "@nestjs/common";
import { ReportService } from "./report.service";
import { ReportRepository } from "./report.repository";
import { SupabaseStorageService } from "./supabase/supabase-storage.service";

@Module({
    imports: [],
    providers: [ReportService, ReportRepository, SupabaseStorageService],
    exports: [ReportService]
})
export class ReportModule { }