import { URLSearchParams } from 'node:url';

interface ICleanPayload {
    searchParams: URLSearchParams;
    validParams;
}
export const cleanPayload = (params: ICleanPayload) => {
    const { searchParams, validParams } = params;
    const filteredValidParams = validParams.filter(item => searchParams.get(item)).map(item => ({ [item]: searchParams.get(item) }));
    return Object.assign({}, ...filteredValidParams);
};
