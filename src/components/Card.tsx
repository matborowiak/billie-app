import { parseToGermanFormatString } from '../utils/functions'
import { company } from './CustomerList'

import './Card.scss'

interface CardProps {
  companyData: company
  onClick: (id: number) => void
}

const Card = (props: CardProps) => {
  const { companyData, onClick } = props
  const { id, name, budget, budget_spent, date_of_first_purchase } = companyData
  return (
    <button className={'Card'} onClick={() => onClick(id)}>
      <div className={'grid-container'}>
        <div className={'Card__data-field gc-name'}>
          <p>🏦 Name:</p>
          <p>{name}</p>
        </div>
        <div className={'Card__data-field gc-1'}>
          <p>✨ First purchase:</p>
          <p>{date_of_first_purchase}</p>
        </div>
        <div className={'Card__data-field gc-2'}>
          <p>💰 Budget:</p>
          <p>{parseToGermanFormatString(budget)}</p>
        </div>

        <div className={'Card__data-field gc-3'}>
          <p>💸 Budget spent:</p>
          <p>{parseToGermanFormatString(budget_spent)}</p>
        </div>
        <div className={'Card__data-field gc-4'}>
          <p>💵 Budget left:</p>
          <p>{parseToGermanFormatString(budget - budget_spent)}</p>
        </div>
      </div>
    </button>
  )
}

export default Card
