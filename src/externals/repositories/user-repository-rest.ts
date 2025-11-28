import type { IHttpClient, IUserRepository } from "@/contracts";
import type {
  UpdateUserRequest,
  UpdateUserResponse,
  GetCurrentUserResponse,
} from "@/entities/user";

export class UserRepositoryRest implements IUserRepository {
  constructor(private httpClient: IHttpClient) {}

  async getMe(): Promise<GetCurrentUserResponse> {
    const response = await this.httpClient.get<GetCurrentUserResponse>(
      "/api/users/me"
    );

    return response;
  }

  async updateMe(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const response = await this.httpClient.post<UpdateUserResponse>(
      "/api/users/me",
      request
    );

    return response;
  }
}
