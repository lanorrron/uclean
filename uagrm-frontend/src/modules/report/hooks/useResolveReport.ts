"use client";

import { useState } from "react";
import reportService from "../services/report.service";

export function useResolveReport() {
  const [loading, setLoading] = useState(false);

  const resolveReport = async (
    reportId: string,
    image: File
  ) => {
    try {
      setLoading(true);

      const result = await reportService.resolveReport(
        reportId,
        image
      );

      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    resolveReport,
    loading,
  };
}