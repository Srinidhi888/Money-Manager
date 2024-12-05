import './index.css'

const TransactionItem = props => {
  const {details, onDelete} = props
  const {id, title, amount, type} = details
  const onDeleteHistory = () => {
    onDelete(id)
  }
  return (
    <li className="item">
      <hr className="line" />
      <div className="grp">
        <p className="space">{title}</p>
        <p className="space">Rs {amount}</p>
        <p className="space">{type}</p>
        <button
          className="delete-btn"
          data-testid="delete"
          onClick={onDeleteHistory}
        >
          <img
            className="icon-delete"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
