import {TAdvocate} from "@/app/types/advocate";
import {TSpecialty} from "@/app/types/specialty";

const lowerCaseSearch = (key: string, searchPhrase: string):boolean | undefined => key?.toLowerCase().includes(searchPhrase.toLowerCase());
const numericSearch = (key: number, searchPhrase: string):boolean => key.toString().toLowerCase().includes(searchPhrase.toLowerCase());

const applySearchLogic = (currVal: string | number | TSpecialty[], searchTerm: string): boolean | undefined => {
    let match: boolean | undefined;
    switch (typeof currVal) {
    case 'number':
        match = numericSearch(currVal, searchTerm);
        break;
    case 'string':
        match = lowerCaseSearch(currVal, searchTerm);
        break;
    case 'object':
        if (Array.isArray(currVal)) {
            match = lowerCaseSearch(currVal.toString().replace(',', ' ') ?? '', searchTerm);
        }
        break;
    default:
        match = false;
    }
    return match;
};

export const filterAdvocates = (advocates: TAdvocate[], searchTerm: string) => {
    return advocates.filter(advocate => {
        return Object.keys(advocate).find(key => {
            const currVal = advocate[key] ?? '';
            return applySearchLogic(currVal, searchTerm);
        });
    });
};
