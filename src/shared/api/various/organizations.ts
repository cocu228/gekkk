import $axios from "@/shared/lib/(cs)axios";


interface IResOrganizations {
    id: number,
    name: string,
    title: string,
    tin: string,
    clientName: string,
}

export const apiOrganizations = () => {
    return $axios.get<IResOrganizations[]>('/api/v2/organizations', {
        transformResponse: [(data) => {
            return JSON.parse(data)
        }],
    })
}

