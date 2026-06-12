import { ClientHttp } from "@/shared/http-client/httpClient";
import { HttpResponse } from "@/shared/http-client/kravax-response.interface";
import { UserPlusInvitations } from "../types/user.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function me() {
    const result = await ClientHttp.get<HttpResponse>(
        `${API_URL}/users/me`
    );

    return result.body.data;
}
 async function  getAll() {
    const result = await ClientHttp.get<HttpResponse<UserPlusInvitations>>(
        `${API_URL}/users`
    );

    return result.body.data;
}

async function remove(id: string) {
    const result = await ClientHttp.delete<HttpResponse>(
        `${API_URL}/users/${id}`
    );

    return result.body.data;
}

export default {
    me,
    getAll,
    remove
}