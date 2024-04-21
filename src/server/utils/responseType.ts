import { CardData } from "../../cards/card.js"

export type ResponseTypeCard = {
  type: 'add' | 'delete' | 'show' | 'update' | 'list',
  refuse: boolean
  cards?: CardData[];
  card?: CardData;
}