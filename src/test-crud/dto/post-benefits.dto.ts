interface EmployeeDetails {
    Name: string
    Number: number
    Gender: string
    Age: number
}

interface QuoteDetails {
    name: string
    category: string
    details: string
}
export class PostBenefitsDto {
    benefitsIdArr: number[];
    employeeDetails: EmployeeDetails[];
    quoteDetails: QuoteDetails;
}