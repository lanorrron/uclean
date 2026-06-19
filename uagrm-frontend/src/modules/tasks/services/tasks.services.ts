import { ClientHttp } from "@/shared/http-client/httpClient";
import { GetMyTaskParams } from "../types/task.types";
import { HttpResponse, PagedData } from "@/shared/http-client/kravax-response.interface";

const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL;


async function getReports({
    page = 1,
    pageSize = 10,
    status,
    from,
    to,
    userId,
}: GetMyTaskParams = {}) {

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

    if (userId) {
        params.append("userId", userId);
    }



    const result =
        await ClientHttp.get<
            HttpResponse<PagedData<Report>>
        >(
            `${BASE_URL}/reports?${params.toString()}`
        );

    return result.body.data;
}