export interface SourceDto {
    title: string;
    assignment: string;
}

export interface NewClassDto {
    date: string;
    sources: SourceDto[];
}
