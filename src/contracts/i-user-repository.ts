import type {
  UpdateUserRequest,
  UpdateUserResponse,
  GetCurrentUserResponse,
} from "@/entities/user";

export interface IUserRepository {
  getMe(): Promise<GetCurrentUserResponse>;
  updateMe(request: UpdateUserRequest): Promise<UpdateUserResponse>;
}
