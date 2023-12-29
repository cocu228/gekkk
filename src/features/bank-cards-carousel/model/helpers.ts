import {IResCard} from "@/shared/api";

export function sortCards (cards: IResCard[]) {
	const priority = {
		ACTIVE: 1,
		BLOCKED_BY_CUSTOMER: 2,
		PLASTIC_IN_WAY: 3
	}
	
	return cards.sort((a, b) => {
		const statusA = priority[a.cardStatus] || 4;
		const statusB = priority[b.cardStatus] || 4;
		
		return statusA - statusB;
	});
}
