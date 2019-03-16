import { Price } from './price.class';

export class Item  {
	id: string;
	title: string;
	price: Price;
	picture ?: string;
	seller_address ?: string;
	condition ?: string;
	free_shipping ? : boolean;
	sold_quantity ?: number;
	description ?: string;
}