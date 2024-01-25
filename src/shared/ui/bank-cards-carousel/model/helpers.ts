import {Card as ICardData} from "@/shared/(orval)api/shared/model";

export function sortCards (cards: ICardData[]) {
	const priority = {
		ACTIVE: 1,
		BLOCKED_BY_CUSTOMER: 2,
		PLASTIC_IN_WAY: 3
	}
	
	return cards.sort((a, b) => {
		const statusA = priority[a.cardStatus] || 4;
		const statusB = priority[b.cardStatus] || 4;
		
		return statusA !== statusB
			? statusA - statusB                         // sort by status
			: a.displayPan.localeCompare(b.displayPan); // sort by number
	});
}
