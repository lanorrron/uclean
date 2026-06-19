"use client";

import { useMemo, useState } from "react";

import { useReports } from "@/modules/report/hooks/useReports.hook";

import { AreaType, ReportStatus, } from "@/modules/report/type/report.type";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
import { useAuth } from "@/hooks/useAuth";
import ListTasks from "./PublicTable";

const PublicTasks = () => {

    const { profile } = useAuth()

    const [page, setPage] = useState(1);

    const status = useMemo(
        () => [
            ReportStatus.PENDING,
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
        area: profile?.role as AreaType,
        status: status,
        unassignedOnly: true

    });

    const totalPages = meta?.totalPages ?? 0;

    const showPagination = totalPages > 1;

    return (
        <div className="space-y-6">

            <ListTasks
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

export default PublicTasks;