import {INewCardState} from "@/widgets/cards-menu/ui/new-card/newCardContext";
import {isNullOrEmpty} from "@/shared/lib/helpers";
import {IOrderCardState} from "@/widgets/cards-menu/ui/order-card/newCardContext";

export function ValidateNewCardState(state: INewCardState): boolean {
	const {
		city,
		street,
		postalCode,
		cardType,
		countryCode,
		linkedPhone,
		cardholderName
	} = state;
	
	const requiredFields = [
		linkedPhone,
		cardholderName
	];
	
	if (cardType === "PLASTIC") {
	 	requiredFields.push(
			countryCode,
		    city,
		    postalCode,
		    street,
	    );
	}
	
	return requiredFields.every((f) => !isNullOrEmpty(f));
}

export function ValidateOrderCardState(state: IOrderCardState): boolean {
	const {
		city,
		street,
		postalCode,
		countryCode,
	} = state;
	
	const requiredFields = [];
	
	requiredFields.push(
		countryCode,
		city,
		postalCode,
		street,
	);
	
	return requiredFields.every((f) => !isNullOrEmpty(f));
}

export function getAddressPartOrEmpty(value: string): string {
	return value ? `${value},` : '';
}
