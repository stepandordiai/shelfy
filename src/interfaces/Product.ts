export interface Product {
	id: number;
	name: string;
	img: string;
	priceCents: number;
	sizesQty: [{ size: string; qty: number }];
	type: string;
	sex: string;
}
