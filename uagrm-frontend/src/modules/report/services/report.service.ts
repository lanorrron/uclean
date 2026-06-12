import { ClientHttp } from "@/shared/http-client/httpClient";

import {
  HttpResponse,
  PagedData,
} from "@/shared/http-client/kravax-response.interface";

import { GetReportsParams, Report } from "../type/report.type";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;



async function getReports({
  page = 1,
  pageSize = 10,
  status,
  from,
  to,
}: GetReportsParams = {}) {

  const params =
    new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

  if (status) {
    params.append("status", status);
  }

  if (from) {
    params.append("from", from);
  }

  if (to) {
    params.append("to", to);
  }

  const result =
    await ClientHttp.get<
      HttpResponse<PagedData<Report>>
    >(
      `${BASE_URL}/reports?${params.toString()}`
    );

  return result.body.data;
}

async function getReportById(
  id: string
) {

  const result =
    await ClientHttp.get<
      HttpResponse<Report>
    >(
      `${BASE_URL}/reports/${id}`
    );

  return result.body.data;
}
async function assignReport(
  id: string,
  userId: string
) {

  const result =
    await ClientHttp.put<
      HttpResponse<Report>
    >(
      `${BASE_URL}/reports/${id}`,
      { userId }
    );

  return result.body.data;
}


export default {
  getReports,
  getReportById,
  assignReport,
};