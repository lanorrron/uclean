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
  GetReportsParams,
  Report,
} from "../type/report.type";



export function useReports({
  page = 1,
  pageSize = 10,
  status,
  from,
  to,
  area,
  assignedToId,
  unassignedOnly,
}: GetReportsParams) {

  const [data, setData] =
    useState<PagedData<Report> | null>(null);

  const [loading, setLoading] =
    useState(true);

  const isFetching =
    useRef(false);

  async function fetchReports() {


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
          area, 
          assignedToId,
          unassignedOnly
        });

      setData(result);

    } catch (error) {


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