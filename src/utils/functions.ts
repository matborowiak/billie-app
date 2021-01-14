import {company} from '../components/CustomerList'

export const parseToGermanFormatString = (amount: number, minimumFractionDigits = 2, maximumFractionDigits = 2) => {
    return amount.toLocaleString('de-DE', {
        minimumFractionDigits: minimumFractionDigits,
        maximumFractionDigits: maximumFractionDigits
    })
}

export const parseToRawAmount = (germanFormatString: string) => {
    const amount: number = parseFloat(germanFormatString.replace(/\./g, '').replace(/,/g, '.'))
    return parseFloat(amount.toFixed(4))
}

export const isNumericInput = (value: string) => {
    const regex = /^[0-9.,]*$/
    return regex.test(value)
}

export const updateCompanyBudget = (
  companyId: number,
  newBudgetValue: number,
  companies: company[]
) => {
  return companies.map((company) => {
    if (company.id === companyId) {
      company.budget = newBudgetValue
    }
    return company
  })
}