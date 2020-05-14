export default interface Profile {
    id: number,
    photo: string,
    name: string,
    birth: string,
    rows: Array<{
        key: string,
        type: string,
        title: string,
        value: string,
    }>
}