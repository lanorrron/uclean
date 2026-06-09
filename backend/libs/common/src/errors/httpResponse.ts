import { PagedResponse, PagedData,Response} from "../model/response.model";


export class HttpResponse {
  statusCode: number;
  body: any;
  headers: any;
  constructor(body: Response<any> | PagedResponse<any>) {
    if (!('success' in body) && !('error' in body)) {
      body.success = true;
    }

    this.body = body;
    this.statusCode = body.statusCode || 200;
    this.headers = body.headers || {};
  }

  static Success(data: any | PagedData<any>, params?: Omit<Response<any>, 'data'> | Omit<PagedResponse<any>, 'data'>) {
    if (params && !params.statusCode) {
      params.statusCode = 200;
    }

    return new HttpResponse({
      data,
      ...params,
    });
  }

  static BadRequest(data: any | PagedData<any>, params?: Omit<Response<any>, 'data'> | Omit<PagedResponse<any>, 'data'>) {
    if (params && !params.statusCode) {
      params.statusCode = 400;
    }

    if (!params) {
      params = {
        success: false,
        statusCode: 400,
      };
    }

    return new HttpResponse({
      data,
      ...params,
      success: false,
    });
  }
}