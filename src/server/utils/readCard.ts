import { ResponseTypeCard } from './responseType.js'
import { FileManager } from '../../cards/fileManager.js';

export function readCard(folderPath :string, id :number, callback :(err :string | undefined, res :ResponseTypeCard | undefined) => void) :void {
  FileManager.Instance().readFile(folderPath, id, true, (_refuse, _card) => {
    if (_refuse) {
      callback("Error on read file", undefined);
    } else {
      const response :ResponseTypeCard = {
        type: 'show',
        refuse: _refuse,
        card: _card
      }
      callback(undefined, response);
    }
  })
}
