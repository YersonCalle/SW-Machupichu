"use client"

import { useState, useRef, useEffect } from "react"

const TableItem = ({ tableNumber, status, onStatusChange, onTableClick }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const statusOptions = [
    { value: "available", label: "Disponible", icon: "✓" },
    { value: "occupied", label: "Ocupada", icon: "−" },
    { value: "reserved", label: "Reservada", icon: "R" },
    { value: "cleaning", label: "Limpieza", icon: "🧹" },
  ]

  const getStatusIcon = (status) => {
    const option = statusOptions.find((opt) => opt.value === status)
    return option ? option.icon : "✓"
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "available":
        return "status-available"
      case "occupied":
        return "status-occupied"
      case "reserved":
        return "status-reserved"
      case "cleaning":
        return "status-cleaning"
      default:
        return "status-available"
    }
  }

  const handleDropdownToggle = (e) => {
    e.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  const handleStatusSelect = (newStatus) => {
    onStatusChange(tableNumber, newStatus)
    setShowDropdown(false)
  }

  const handleTableClick = () => {
    onTableClick(tableNumber)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const TableIcon = () => (
    <svg viewBox="0 0 100 80" className="table-icon">
      {/* Table top */}
      <rect x="10" y="25" width="80" height="30" rx="5" fill="#8B4513" stroke="#654321" strokeWidth="2" />

      {/* Table legs */}
      <rect x="15" y="55" width="4" height="20" fill="#654321" />
      <rect x="81" y="55" width="4" height="20" fill="#654321" />
      <rect x="15" y="5" width="4" height="20" fill="#654321" />
      <rect x="81" y="5" width="4" height="20" fill="#654321" />

      {/* Chairs */}
      <rect x="0" y="30" width="8" height="20" rx="2" fill="#4A5568" />
      <rect x="92" y="30" width="8" height="20" rx="2" fill="#4A5568" />

      {/* Chair backs */}
      <rect x="0" y="25" width="8" height="8" rx="2" fill="#4A5568" />
      <rect x="92" y="25" width="8" height="8" rx="2" fill="#4A5568" />
    </svg>
  )

  return (
    <div className="table-item" ref={dropdownRef}>
      <div className="table-content" onClick={handleTableClick}>
        <div className={`status-indicator ${getStatusClass(status)}`}>
          <span className="status-icon">{getStatusIcon(status)}</span>
          <button className="dropdown-toggle" onClick={handleDropdownToggle}>
            ⋮
          </button>
        </div>
        <TableIcon />
        <div className="table-label">Mesa {tableNumber}</div>
      </div>

      {showDropdown && (
        <div className="status-dropdown">
          {statusOptions.map((option) => (
            <div
              key={option.value}
              className={`status-option ${option.value}`}
              onClick={() => handleStatusSelect(option.value)}
            >
              {option.icon} {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TableItem
