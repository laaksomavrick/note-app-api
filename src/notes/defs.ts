import { AuthorizedFolderRequest } from "../folders/defs";

/**
 * An incoming request with a userId, folderId and noteId
 */
export interface AuthorizedNoteRequest extends AuthorizedFolderRequest {
  noteId: number;
}
