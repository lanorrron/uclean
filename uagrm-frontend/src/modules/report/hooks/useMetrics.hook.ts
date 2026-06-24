import { useState, useEffect } from "react";
import { MetricsReportResponse } from "../type/report.type";
import reportService from "../services/report.service";

export function useMetrics(from?: Date, to?: Date) {
  const [data, setData] = useState<MetricsReportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await reportService.metrics(from, to);

        setData(result);
      } catch (err: any) {
        setError(err?.message ?? "Error fetching metrics");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [from, to]);

  return {
    data,
    loading,
    error,
  };
}