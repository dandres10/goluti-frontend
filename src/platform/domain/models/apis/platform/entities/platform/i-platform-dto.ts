export interface IPlatformDTO {
  id: string;
  languageId: string;
  locationId: string;
  currencyId: string;
  tokenExpirationMinutes?: number;
  refreshTokenExpirationMinutes?: number;
}