"use client";

import { useMemo, useState } from "react";

import ListReport from "@/modules/report/components/ListReport";
import ReportFilters from "@/modules/report/components/ReportFilter";

import { useReports } from "@/modules/report/hooks/useReports.hook";

import { AreaType, ReportQuery, ReportStatus } from "@/modules/report/type/report.type";
import { getLast7Days } from "@/modules/report/utils/utils.report";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
import { useAuth } from "@/hooks/useAuth";
import ListTasks from "./PublicTable";
import PrivateTasks from "./privateTable";

const MyTasks = () => {

    const {profile} = useAuth()

    const [page, setPage] = useState(1);
        const status = useMemo(
      () => [
        ReportStatus.PENDING,
        ReportStatus.IN_PROGRESS,
      ],
      []
    );

    const {
        reports,
        meta,
        loading,
    } = useReports({
        page,
        pageSize: 10,
        assignedToId:profile?.id,
        status:status

    });
    
    const totalPages = meta?.totalPages ?? 0;

    const showPagination = totalPages > 1;

    return (
        <div className="space-y-6">

            <PrivateTasks
                reports={reports}
                loading={loading}
            />

            {showPagination && (
                <Pagination>
                    <PaginationContent>

                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (page > 1) setPage(page - 1);
                                }}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                            (pageNumber) => (
                                <PaginationItem key={pageNumber}>
                                    <PaginationLink
                                        href="#"
                                        isActive={page === pageNumber}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage(pageNumber);
                                        }}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (page < totalPages) setPage(page + 1);
                                }}
                            />
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default MyTasks;