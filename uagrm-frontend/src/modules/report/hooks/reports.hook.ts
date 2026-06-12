"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import reportService from "../services/report.service";

import {
  PagedData,
} from "@/shared/http-client/kravax-response.interface";

import {
  Report,
  ReportQuery,
} from "../type/report.type";

interface UseReportsProps
  extends ReportQuery {

  page?: number;
  pageSize?: number;
}

export function useReports({
  page = 1,
  pageSize = 10,
  status,
  from,
  to,
}: UseReportsProps) {

  const [data, setData] =
    useState<PagedData<Report> | null>(null);

  const [loading, setLoading] =
    useState(true);

  const isFetching =
    useRef(false);

  async function fetchReports() {

    // 🔥 evita request duplicada
    if (isFetching.current) return;

    try {

      isFetching.current = true;

      setLoading(true);

      const result =
        await reportService.getReports({
          page,
          pageSize,
          status,
          from,
          to,
        });

      setData(result);

    } catch (error) {

      console.log(error);

    } finally {

      isFetching.current = false;

      setLoading(false);
    }
  }

  useEffect(() => {

    fetchReports();

  }, [
    page,
    pageSize,
    status,
    from,
    to,
  ]);

  return {
    reports: data?.items ?? [],
    meta: data?.meta,
    loading,
    refetch: fetchReports,
  };
}