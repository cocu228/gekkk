import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";


interface IResOrganization {
    id: number,
    name: string,
    title: string,
    tin: string,
    clientName: string,
}

export const apiOrganizations = () => {
    return $axios.get<$AxiosResponse<Array<IResOrganization>>>('/api/v2/organizations')
}

