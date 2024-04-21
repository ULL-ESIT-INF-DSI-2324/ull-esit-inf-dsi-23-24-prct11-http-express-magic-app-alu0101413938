import { FileManager } from "../../cards/fileManager.js";
import { ResponseTypeCard } from "./responseType.js";

export function deleteCard(filePath :string, id :number, callback :(err :string  | undefined, res :ResponseTypeCard | undefined) => void) {
  FileManager.Instance().removeFromFile(filePath, id, true, (_refuse) => {
    if (_refuse) {
      callback("Error on delete file", undefined);
    } else {
      const response :ResponseTypeCard = {
        type: 'delete',
        refuse: _refuse
      }
      callback(undefined, response); 
    }
  })
}