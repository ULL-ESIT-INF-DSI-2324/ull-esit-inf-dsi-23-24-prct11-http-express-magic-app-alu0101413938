import { CardData } from "../../cards/card.js";
import { FileManager } from "../../cards/fileManager.js";
import { ResponseTypeCard } from "./responseType.js";

export function updateCard(folderPath :string, card :CardData, callback :(err :string | undefined, res :ResponseTypeCard | undefined) => void) :void {
  FileManager.Instance().updateFile(folderPath, card, true, (_refuse) => {
    if (_refuse) {
      callback("Error on update file", undefined);
    } else {
      const response :ResponseTypeCard = {
        type: 'update',
        refuse: _refuse,
      }
      callback(undefined, response);
    }
  })
}
