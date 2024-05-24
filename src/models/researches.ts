export type scienceDegree = "докт. техн. наук" | "канд. техн. наук" | "без степени"

export interface IResearch {
    id: number, 
    name: string, 
    advisor: string, 
    degree: scienceDegree,
    description: string
}