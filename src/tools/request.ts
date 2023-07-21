const main_api = "https://simple-chat-api-production.up.railway.app/api";

export enum RequestMethodsEnum {
  POST = "POST",
  GET = "GET",
}

type Props = {
  url: string;
  method?: RequestMethodsEnum;
  body?: any;
  params?: object;
};

export const makeRequest = async ({
  url,
  method,
  body,
  params,
}: Props): Promise<any> => {
  const requestUrl = `${main_api}/${url}`;
  let response = {} as any;
  try {
    const request = await fetch(requestUrl, {
      method: method || RequestMethodsEnum.GET,
      body:
        (method || RequestMethodsEnum.GET) === RequestMethodsEnum.GET
          ? undefined
          : body,
    });

    response = await request.json();

    if (!request.ok) {
      throw new Error(response.errorMessage || "Server Error");
    }

    return response;
  } catch (error: any) {
    const message = response?.errorMessage || error;

    if (response.errorMessage) {
      delete response.errorMessage;
    }

    return Promise.reject({
      message,
      data: response,
    });
  }
};

// /auth/sign-up/check-email
