import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ModalChangeBudget from './ModalChangeBudget'

const companyDataMock = {
  id: 1,
  name: 'Martian Firma',
  budget: 1000.0101,
  budget_spent: 500.0011,
  date_of_first_purchase: '2119-07-07',
}

const handleSuccessfulSubmit = jest.fn()
const handleCloseModal = jest.fn()

const setup = () => {
  const utils = render(
    <ModalChangeBudget
      companyData={companyDataMock}
      handleSuccessfulSubmit={handleSuccessfulSubmit}
      handleCloseModal={handleCloseModal}
    />
  )

  const closeButton = utils.getByRole('button', { name: /close/i })
  const submitButton = utils.getByRole('button', { name: /submit/i })
  const inputField = utils.getByRole('textbox', {
    name: /value input/i,
  })

  return {
    closeButton,
    submitButton,
    inputField,
    ...utils,
  }
}

describe('ModalChangeBudget component', () => {
  it('renders correctly', () => {
    const { inputField, closeButton, submitButton, getByText } = setup()

    expect(getByText('🏦 Martian Firma')).toBeInTheDocument()
    expect(inputField).toBeInTheDocument()
    expect(closeButton).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('displays company budget in input in string format', () => {
    const { inputField } = setup()
    expect(inputField).toHaveValue('1.000,0101')
  })

  it('prevents submit and displays error on wrong input', async () => {
    const { submitButton, inputField } = setup()

    fireEvent.change(inputField, { target: { value: 'abc' } })
    fireEvent.click(submitButton)
    const statusSubmit = screen.getByText(
      'Invalid input format. Accepted characters: [0-9.,]'
    )
    expect(statusSubmit).toBeInTheDocument()
    expect(handleSuccessfulSubmit).toHaveBeenCalledTimes(0)
  })

  it('prevents submit and displays error on too small amount', async () => {
    const { submitButton, inputField } = setup()

    fireEvent.change(inputField, { target: { value: '50' } })
    fireEvent.click(submitButton)
    const statusSubmit = screen.getByText(
      'The budget is too small! It must be greater than: 500.0011'
    )
    expect(statusSubmit).toBeInTheDocument()
    expect(handleSuccessfulSubmit).toHaveBeenCalledTimes(0)
  })

  describe('Close button', () => {
    it('handles modal close', async () => {
      const { closeButton } = setup()

      fireEvent.click(closeButton)
      expect(handleCloseModal).toHaveBeenCalled()
    })
  })

  describe('Submit button', () => {
    it('handles submit function on success, displays success message', () => {
      const { submitButton, getByText } = setup()

      fireEvent.click(submitButton)
      expect(handleSuccessfulSubmit).toHaveBeenCalled()

      expect(handleSuccessfulSubmit.mock.calls[0][0]).toEqual(
        companyDataMock.budget
      )

      const statusSubmit = getByText('Save successful!')
      expect(statusSubmit).toBeInTheDocument()
    })
  })

  describe('Submit status', () => {})
})
