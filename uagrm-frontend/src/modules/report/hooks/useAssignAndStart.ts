"use client";

import { useState } from "react";
import reportService from "../services/report.service";

export function useAssignAndStart() {
  const [loadingAssignAndStart, setLoadingAssignAndStart] = useState(false);

  const assignAndStart = async (
    reportId: string,
  ) => {
    try {
      setLoadingAssignAndStart(true);

      return await reportService.assignAndStart(
        reportId,
      );
    } finally {
      setLoadingAssignAndStart(false);
    }
  };

  return {
    assignAndStart,
    loadingAssignAndStart,
  };
}