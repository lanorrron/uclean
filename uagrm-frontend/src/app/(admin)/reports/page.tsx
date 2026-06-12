"use client";

import { useState } from "react";

import ListReport from "@/modules/report/components/ListReport";

import { useReports } from "@/modules/report/hooks/reports.hook";
import { ReportQuery } from "@/modules/report/type/report.type";
import ReportFilters from "@/modules/report/components/ReportFilter";
import { getLast7Days } from "@/modules/report/utils/utils.report";


const ReportPage = () => {
    const [query, setQuery] =
        useState<ReportQuery>({
            ...getLast7Days(),
        });
    const {
        reports,
        loading,
    } = useReports({
        ...query,
    });

    return (
        <div className="space-y-6">

            <ReportFilters
                value={query}
                onChange={setQuery}
            />

            <ListReport
                reports={reports}
            />

        </div>
    );
};

export default ReportPage;