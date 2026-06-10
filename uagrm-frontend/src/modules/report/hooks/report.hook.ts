import { useEffect, useState } from "react";
import reportService from "../services/report.service";
import { PagedData } from "@/shared/http-client/kravax-response.interface";
import { Report } from "../type/report.type";

export function useReports() {
  const [data, setData] = useState<PagedData<Report> | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchReports() {
    try {
      setLoading(true);

      const result = await reportService.getReports();

      setData(result);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports: data?.items ?? [],
    meta: data?.meta,
    loading,
    refetch: fetchReports,
  };
}