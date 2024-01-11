import {IResCard} from "@/shared/api";
import {INewCardState} from "@/widgets/wallet/cards-menu/ui/new-card/newCardContext";
import {isNullOrEmpty} from "@/shared/lib/helpers";

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

export function getAddressPartOrEmpty(value: string): string {
	return value ? `${value},` : '';
}
