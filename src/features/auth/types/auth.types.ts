export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  job_title: string | null;
  years_of_experience: number | null;
  phone: string | null;
  avatar_url: string | null;
  status: string;
  roles: string[];
  permissions: string[];
  google_linked: boolean;
  facebook_linked: boolean;
  linkedin_linked: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthSessionData {
  user: AuthUser;
  token: string;
  token_type: string;
}

export interface ProjectMembershipPivot {
  user_id: number;
  project_id: number;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface CurrentUserProject {
  id: number;
  name: string;
  description: string;
  start_date: string;
  deadline: string;
  priority: string;
  status: string;

  progress_percentage: string;

  created_by: number;
  created_at: string;
  updated_at: string;
  pivot: ProjectMembershipPivot;
}

export interface CurrentUserData {
  user: AuthUser;

  teams: unknown[];

  projects: CurrentUserProject[];
}

export interface ForgotPasswordData {
  expires_in_minutes: number;
}

export interface GoogleRedirectData {
  provider: "google";
  authorization_url: string;
}

export type AuthFieldErrors = Record<string, string[] | undefined>;

export type AuthActionResult<T> =
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      message: string;
      errors?: AuthFieldErrors;
    };
