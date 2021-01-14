import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'

import Card from './Card'
import Modal from './Modal'
import ModalChangeBudget from './ModalChangeBudget'
import { updateCompanyBudget } from '../utils/functions'
import './CustomerList.scss'

export interface company {
  id: number
  name: string
  budget: number
  budget_spent: number
  date_of_first_purchase: string
}

const CustomerList = () => {
  const [companies, setCompanies] = useState<company[]>([])
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [modalId, setModalId] = useState<number | null>(null)

  const { isLoading, error, data } = useQuery('companyData', () =>
    fetch(`http://${process.env.REACT_APP_NETWORK_IP}:3005`).then((res) =>
      res.json()
    )
  )

  useEffect(() => {
    if (data) {
      setCompanies(data.companies)
    }
  }, [data, setCompanies])

  const handleOpenModal = (id: number) => {
    setModalId(id)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setModalId(null)
  }

  const handleSuccessfulSubmit = (submitValue: number, companyId: number) => {
    setCompanies(updateCompanyBudget(companyId, submitValue, companies))
  }

  return (
    <>
      <div className={'CustomerList'}>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          companies.map((company) => (
            <Card
              key={company.id}
              onClick={handleOpenModal}
              companyData={company}
            />
          ))
        )}
        {error && <h3>{`${error}`}</h3>}
      </div>
      <Modal handleCloseModal={handleCloseModal} isModalOpen={isModalOpen}>
        {companies.map((company) => {
          if (company.id !== modalId) return null
          return (
            <ModalChangeBudget
              key={company.id}
              companyData={company}
              handleCloseModal={handleCloseModal}
              handleSuccessfulSubmit={handleSuccessfulSubmit}
            />
          )
        })}
      </Modal>
    </>
  )
}

export default CustomerList
