import { ClientHttp } from "@/shared/http-client/httpClient";
import { HttpResponse } from "@/shared/http-client/kravax-response.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function me() {
    const result = await ClientHttp.get<HttpResponse>(
        `${API_URL}/user/me`
    );

    return result.body.data;
}
async function accepInvitation() {
    const result = await ClientHttp.put<HttpResponse>(`${API_URL}/invitations/accept`)
    return result.body.data
}
async function sendInvitation(email: string, roleId: string) {
    const result = await ClientHttp.post<HttpResponse>(`${API_URL}/invitations/invite`, {
        email: email,
        role_id: roleId
    })
    return result.body.data
}

async function updateMemberrole(memberId: string, roleId: string) {
    const result = await ClientHttp.put<HttpResponse>(`${API_URL}/organization-members/${memberId}/role`, {
        roleId
    })
    return result.body.data
}
async function removeMember(memberId: string) {
    const result = await ClientHttp.delete<HttpResponse>(`${API_URL}/organization-members/${memberId}`)
    return result.body.data
}

async function cancelInvitation(invitationId: string) {
    const result = await ClientHttp.put<HttpResponse>(`${API_URL}/invitations/${invitationId}/cancel`)
    return result.body.data
}
async function updateInvitationRole(invitationId: string, roleId: string) {
    const result = await ClientHttp.put<HttpResponse>(`${API_URL}/invitations/${invitationId}/role`, {
        roleId
    },)
    return result.body.data

}


export default {
    me,
    accepInvitation,
    sendInvitation,
    updateMemberrole,
    removeMember,
    cancelInvitation,
    updateInvitationRole
}