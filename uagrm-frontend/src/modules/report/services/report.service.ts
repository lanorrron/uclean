import { ClientHttp } from "@/shared/http-client/httpClient"
import { HttpResponse, PagedData } from "@/shared/http-client/kravax-response.interface"
import { Report } from "../type/report.type";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

async function getReports(page: number = 1, pageSize: number = 10, search?: string, status?: string) {
    const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString()
    })

    if (search) params.append("search", search);
    if (status) params.append("status", status)


    const result = await ClientHttp.get<HttpResponse<PagedData<Report>>>(`${BASE_URL}/reports`)
    return result.body.data
}

async function getReportById(id: string) {
    const result = await ClientHttp.get<HttpResponse>(`${BASE_URL}/reports`)
    return result.body.data
}
export default {
    getReports,
    getReportById
}