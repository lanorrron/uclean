import { ClientHttp } from "@/shared/http-client/httpClient";

import {
  HttpResponse,
  PagedData,
} from "@/shared/http-client/kravax-response.interface";

import { AreaType, GetReportsParams, Report } from "../type/report.type";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;



async function getReports({
  page = 1,
  pageSize = 10,
  status,
  from,
  to,
  area,
  assignedToId,
  unassignedOnly
}: GetReportsParams = {}) {

  const params =
    new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

  if (status?.length) {
    status.forEach((item) => {
      params.append("status", item)
    })
  }

  if (from) {
    params.append("from", from);
  }

  if (to) {
    params.append("to", to);
  }
  if (assignedToId) {
    params.append("assignedToId", assignedToId);
  }
  if (area) {
    params.append("area", area);
  }
  if (unassignedOnly) {
    params.append("unassignedOnly", String(unassignedOnly));
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

async function assignAndStart(id: string) {
  const result =
    await ClientHttp.put<
      HttpResponse<Report>
    >(
      `${BASE_URL}/reports/${id}/assign-and-start`,
    );

  return result.body.data;
}

async function resolveReport(
  reportId: string,
  image: File
) {
  const formData = new FormData();

  formData.append("image", image);

  const result = await ClientHttp.put<
    HttpResponse<any>
  >(
    `${BASE_URL}/reports/${reportId}/resolve`,
    formData,
  );

  return result.body.data;
}


export default {
  getReports,
  getReportById,
  assignReport,
  assignAndStart,
  resolveReport
};