export interface Cart {
	cartQty: number;
	id: number;
	img: string;
	name: string;
	priceCents: number;
	productSize: string;
	sex: string;
	sizesQty: {
		size: string;
		qty: number;
	};
	type: string;
}
