export interface IPlatformEntity {
  id: string;
  language_id: string;
  location_id: string;
  currency_id: string;
  token_expiration_minutes?: number;
  refresh_token_expiration_minutes?: number;
}