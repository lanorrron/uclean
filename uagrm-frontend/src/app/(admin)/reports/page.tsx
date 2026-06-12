"use client";

import { useState } from "react";

import ListReport from "@/modules/report/components/ListReport";
import ReportFilters from "@/modules/report/components/ReportFilter";

import { useReports } from "@/modules/report/hooks/useReports.hook";

import { ReportQuery } from "@/modules/report/type/report.type";
import { getLast7Days } from "@/modules/report/utils/utils.report";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";

const ReportPage = () => {
    const [query, setQuery] = useState<ReportQuery>({
        ...getLast7Days(),
    });

    const [page, setPage] = useState(1);

    const {
        reports,
        meta,
        loading,
    } = useReports({
        ...query,
        page,
        pageSize: 10,
    });

    return (
        <div className="space-y-6">

            <ReportFilters
                value={query}
                onChange={(newQuery) => {
                    setPage(1); // reset al filtrar
                    setQuery(newQuery);
                }}
            />

            <ListReport
                reports={reports}
                loading={loading}
            />

            {meta && (
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

                        {Array.from(
                            { length: meta.totalPages },
                            (_, i) => i + 1
                        ).map((pageNumber) => (
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
                        ))}

                        {meta.totalPages > 5 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (page < meta.totalPages)
                                        setPage(page + 1);
                                }}
                            />
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default ReportPage;