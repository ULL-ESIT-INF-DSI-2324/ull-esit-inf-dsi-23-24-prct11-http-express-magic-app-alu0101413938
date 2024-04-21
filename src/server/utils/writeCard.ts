import { CardData } from "../../cards/card.js";
import { FileManager } from "../../cards/fileManager.js";
import { ResponseTypeCard } from "./responseType.js";

export function writeCard(filePath :string, card :CardData, callback :(err :string | undefined, res :ResponseTypeCard | undefined) => void) {
  FileManager.Instance().writeOnFile(filePath, true, card, (_refuse :boolean) => {
    if (_refuse) {
      callback("Error on write file", undefined);
    } else {
      const response :ResponseTypeCard = {
        type: 'add',
        refuse: _refuse,
      }
      callback(undefined, response);
    }
  })
}