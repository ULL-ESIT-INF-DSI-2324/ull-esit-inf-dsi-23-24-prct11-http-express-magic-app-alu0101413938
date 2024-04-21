import { ResponseTypeCard } from './responseType.js'
import { FileManager } from '../../cards/fileManager.js';

export function readCards(folderPath :string, callback :(err :string | undefined, res :ResponseTypeCard | undefined) => void) :void {
  FileManager.Instance().readMultipleFiles(folderPath, true, (_refuse, _cards) => {
    if (_refuse) {
      callback("Error on read multiple files", undefined);
    } else {
      const response :ResponseTypeCard = {
        type: 'list',
        refuse: _refuse,
        cards: _cards
      }
      callback(undefined, response);
    }
  })
}
