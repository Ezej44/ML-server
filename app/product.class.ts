import { Author } from './author.class';
import { Item } from './item.class';
import {Seller} from './seller.class'
export class Product  {
	author: Author;
	item ?: Item;
	items ?: Item[];
	seller ?: Seller;
	picture ?: string;
	condition ?: string;
	free_shipping ? : boolean;
	sold_quantity ?: number;
	description ?: string;
}