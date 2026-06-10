import {supabase} from "@/lib/supabase/client";
import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import { ErrorHttp } from "./error.http";




async function getAccessToken(): Promise<string | null> {
  const { data, error } = await supabase.auth.getSession();
  const session = data?.session;
  if (error || !session) {
    console.log("No se pudo obtener el token de sesión", error?.message);
    return null;
  }
  return session.access_token;
}

interface Options {
  useAuth?: boolean;
  [key: string]: any;
}

export class ClientHttp {
  static client: Axios = axios;

  static setClient(client?: Axios) {
    ClientHttp.client = client || axios;
  }

  private static async getDefaultHeaders(
    useAuth: boolean = true
  ): Promise<Record<string, string>> {

    const headers: Record<string, string> = {};

    if (useAuth) {
      const token = await getAccessToken();

      if (!token) {
        throw new ErrorHttp("No se encontró token de autenticación", 401);
      }

      headers["authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  private static async Request<T>(
    method: Method,
    url: string,
    payload: any = {},
    options: Options = { useAuth: true }
  ): Promise<T> {
    try {
      const headers = await ClientHttp.getDefaultHeaders(
        options.useAuth ?? true
      );

      const config: AxiosRequestConfig = {
        url,
        method,
        headers,
        timeout: 1000 * 60,
      };

      if (["post", "put", "patch"].includes(method.toLowerCase())) {
        config.data = payload;
      }

      const response: AxiosResponse<T> = await ClientHttp.client.request(
        config
      );
      return response.data;
    } catch (error: any) {

      if (error instanceof AxiosError) {

        throw error.response?.data as T;
      }

      throw new ErrorHttp(error?.message ?? "Unknown error");
    }
  }

  public static get<T>(
    url: string,
    options: Options = { useAuth: true }
  ): Promise<T> {
    return ClientHttp.Request("get", url, {}, options);
  }

  public static post<T>(
    url: string,
    payload: any = {},
    options: Options = { useAuth: true }
  ): Promise<T> {
    return ClientHttp.Request("post", url, payload, options);
  }

  public static put<T>(
    url: string,
    payload: any = {},
    options: Options = { useAuth: true }
  ): Promise<T> {
    return ClientHttp.Request("put", url, payload, options);
  }

  public static patch<T>(
    url: string,
    payload: any = {},
    options: Options = { useAuth: true }
  ): Promise<T> {
    return ClientHttp.Request("patch", url, payload, options);
  }

  public static delete<T>(
    url: string,
    options: Options = { useAuth: true }
  ): Promise<T> {
    return ClientHttp.Request("delete", url, {}, options);
  }
}
