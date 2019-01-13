import { AuthorizedRequest } from "../api";

/**
 * An incoming request with a userId and a folderId
 */
export interface AuthorizedFolderRequest extends AuthorizedRequest {
  folderId: number;
}
