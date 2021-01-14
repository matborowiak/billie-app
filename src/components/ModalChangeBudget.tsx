import { useState, FormEvent, useEffect } from 'react'
import {
  parseToRawAmount,
  isNumericInput,
  parseToGermanFormatString,
} from '../utils/functions'
import { company } from './CustomerList'
import './ModalChangeBudget.scss'

interface ModalChangeBudgetProps {
  companyData: company
  handleSuccessfulSubmit: (submitValue: number, companyId: number) => void
  handleCloseModal: () => void
}

const ModalChangeBudget = ({
  companyData,
  handleSuccessfulSubmit,
  handleCloseModal,
}: ModalChangeBudgetProps) => {
  const { name, budget, id, budget_spent } = companyData
  const [inputValue, setInputValue] = useState(
    parseToGermanFormatString(budget, 4, 4)
  )
  const [status, setStatus] = useState('')

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (inputValue === '') {
      setStatus(`You must input value. Accepted characters: [0-9.,]`)
      return
    }
    if (!isNumericInput(inputValue)) {
      setStatus(`Invalid input format. Accepted characters: [0-9.,]`)
      return
    }

    const rawAmount = parseToRawAmount(inputValue)
    if (rawAmount < budget_spent) {
      setStatus(
        `The budget is too small! It must be greater than: ${budget_spent}`
      )
      return
    }

    handleSuccessfulSubmit(rawAmount, id)
    setStatus('Save successful!')
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus('')
    }, 1500)
    return () => clearTimeout(timeout)
  }, [status])

  return (
    <div className={'ModalChangeBudget'}>
      <h2 className={'ModalChangeBudget__name'}>{`🏦 ${name}`}</h2>
      <form className={'ModalChangeBudget__form'} onSubmit={handleFormSubmit}>
        <label className={'ModalChangeBudget__form__label'}>
          {'Set new budget: '}
          <input
            aria-label="value input"
            className={'ModalChangeBudget__form__input'}
            type="string"
            name="budget"
            step="any"
            lang="de-DE"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {status && (
            <p className={'ModalChangeBudget__form__status'}>{status}</p>
          )}
        </label>
        <div className={'ModalChangeBudget__form__buttons'}>
          <button aria-label="close" type="reset" onClick={handleCloseModal}>
            Close
          </button>
          <button aria-label="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ModalChangeBudget
