export interface LoginRequest {
    email: string;
    password: string;
  }
  
export interface LoginResponse {
    Id: number;
  }
  
export interface RegisterRequest{
    name: string;
    email: string;
    password: string;
}
  