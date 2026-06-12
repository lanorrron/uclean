import { useState, useEffect } from "react";
import reportService from "../services/report.service";
import { Report } from "../type/report.type";

export function useReport(id: string) {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchReport() {
    try {
      setLoading(true);

      const data = await reportService.getReportById(id);

      setReport(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;

    fetchReport();
  }, [id]);

  return {
    report,
    loading,
    refetch: fetchReport,
  };
}