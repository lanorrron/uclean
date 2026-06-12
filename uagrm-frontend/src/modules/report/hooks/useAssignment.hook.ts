"use client";

import { useState } from "react";

import reportService from "../services/report.service";

export function useAssignment() {

  const [loadingAssign, setLoadingAssign] = useState(false);

  const assign = async (
    reportId: string,
    userId: string
  ) => {

    try {
      setLoadingAssign(true);

      return await reportService.assignReport(
        reportId,
        userId
      );

    } finally {
      setLoadingAssign(false);
    }
  };


  return {
    assign,
    loadingAssign,
  };
}