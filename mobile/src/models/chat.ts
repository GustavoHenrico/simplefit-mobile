

export type Chat = {
    id?: string;
    name?: string;
    levelFitness?: number;
    frequencyTreining?: number;
    medicalConditions?: string;
    personalPreferences?: string;
    // createdAt?: Date;
    // updatedAt?: Date;
}

export type CreateChat = {
    name: string;
    levelFitness: number;
    frequencyTreining: number;
    medicalConditions: string;
    personalPreferences: string;
}

export type UpdateChat = {
    name: string;
    levelFitness: number;
    frequencyTreining: number;
    medicalConditions: string;
    personalPreferences: string;
}